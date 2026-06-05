// ============================================================
// @RoomTour(빌리투어) 채널 영상 설명란 추출기
// 방식: 매일 채널 전체 영상을 훑어 시트에 없는 영상만 추가 (전체 동기화)
//       → 누락이 생겨도 다음 실행 때 자동 복구, 중복 없음
// 추출: 가격정보 URL, 대표번호
// ============================================================

// API 키는 코드에 두지 않고 스크립트 속성(YOUTUBE_API_KEY)에서 읽는다.
// 최초 1회 'API키_설정' 함수를 실행해 키를 등록할 것.
const API_KEY = PropertiesService.getScriptProperties().getProperty('YOUTUBE_API_KEY');
const CHANNEL_HANDLE = '@RoomTour.';
const SHEET_NAME = '크롤링 결과';

const PHONE_PATTERN = /(?:0507|0508|050\d|02|0[3-9]\d)-?\d{3,4}-?\d{4}/g;
const URL_PATTERN = /https?:\/\/gobang\.kr\/place\/\d+/g;


// ★ 최초 1회 실행: YouTube API 키를 스크립트 속성에 저장
function API키_설정() {
  const key = Browser.inputBox(
    'YouTube API 키 등록',
    'AIza... 형식의 키를 입력하세요',
    Browser.Buttons.OK_CANCEL
  );
  if (key && key !== 'cancel') {
    PropertiesService.getScriptProperties().setProperty('YOUTUBE_API_KEY', key.trim());
    Browser.msgBox('API 키 저장 완료. 이제 설치_및_즉시실행 또는 run 을 실행하세요.');
  }
}


// ★ 최초 1회만 실행: 매일 오전 6시 자동 동기화 트리거 등록 + 즉시 1회 실행
function 설치_및_즉시실행() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'run')
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('run')
    .timeBased()
    .everyDays(1)
    .atHour(6)
    .create();

  run();
}


// 기존 데이터 싹 지우고 채널 전체를 처음부터 다시 적재
function 전체_초기화후_재수집() {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);
  run();
}


// ---- 메인: 채널 전체와 시트를 동기화 (없는 영상만 추가) ----
function run() {
  if (!API_KEY) {
    Browser.msgBox('API 키가 없습니다. 먼저 API키_설정 함수를 실행해 키를 등록하세요.');
    return;
  }
  const sheet = getOrCreateSheet(SHEET_NAME);
  if (sheet.getLastRow() < 1 || sheet.getRange(1, 1).getValue() !== '영상 제목') {
    setupHeader(sheet);
  }

  const uploadsId = getUploadsPlaylistId(CHANNEL_HANDLE);
  if (!uploadsId) {
    Browser.msgBox('채널을 찾을 수 없습니다: ' + CHANNEL_HANDLE);
    return;
  }

  // 1) 채널 전체 영상 ID 수집 (업로드 플레이리스트 전체 순회)
  const allVideoIds = fetchAllVideoIds(uploadsId);
  Logger.log(`채널 전체 영상: ${allVideoIds.length}개`);

  // 2) 시트에 이미 있는 영상 ID (C열)
  const existing = getExistingVideoIds(sheet);

  // 3) 시트에 없는 신규 영상만
  const newIds = allVideoIds.filter(id => !existing.has(id));
  Logger.log(`신규 영상: ${newIds.length}개`);

  // 4) 신규 영상 상세 조회 → 설명란에서 URL/전화 추출
  const newRows = [];
  for (let i = 0; i < newIds.length; i += 50) {
    const batch = newIds.slice(i, i + 50);
    const details = fetchVideoDetails(batch.join(','));
    for (const v of details) {
      const { priceUrls, phones } = extractFromDescription(v.snippet.description);
      if (priceUrls.length === 0 && phones.length === 0) continue;

      const maxRows = Math.max(priceUrls.length, phones.length, 1);
      for (let j = 0; j < maxRows; j++) {
        newRows.push([
          v.snippet.title,
          v.snippet.publishedAt.slice(0, 10),
          v.id,
          `https://youtu.be/${v.id}`,
          priceUrls[j] || '',
          phones[j] || '',
        ]);
      }
    }
    Utilities.sleep(150);
  }

  // 5) 시트 맨 아래에 추가
  if (newRows.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, 6).setValues(newRows);
  }

  const msg = `채널 ${allVideoIds.length}개 점검 / 신규 ${newRows.length}행 추가`;
  Logger.log(msg);
  SpreadsheetApp.getActiveSpreadsheet().toast(msg, '동기화 완료', 6);
}


// ---- 채널의 '업로드' 플레이리스트 ID 조회 ----
function getUploadsPlaylistId(handle) {
  const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
  const base = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails';

  const tries = [
    `${base}&forHandle=${encodeURIComponent(handle)}&key=${API_KEY}`,
    `${base}&forHandle=${encodeURIComponent(cleanHandle)}&key=${API_KEY}`,
    `${base}&forUsername=${encodeURIComponent(cleanHandle)}&key=${API_KEY}`,
  ];

  for (const url of tries) {
    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const data = JSON.parse(res.getContentText());
    if (data.items && data.items.length > 0) {
      return data.items[0].contentDetails.relatedPlaylists.uploads;
    }
  }
  return null;
}


// ---- 업로드 플레이리스트 전체 순회하여 영상 ID 전부 수집 ----
function fetchAllVideoIds(playlistId) {
  const ids = [];
  let pageToken = '';

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems`
      + `?part=contentDetails`
      + `&playlistId=${playlistId}`
      + `&maxResults=50`
      + (pageToken ? `&pageToken=${pageToken}` : '')
      + `&key=${API_KEY}`;
    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const data = JSON.parse(res.getContentText());
    if (!data.items) break;

    data.items.forEach(it => ids.push(it.contentDetails.videoId));
    pageToken = data.nextPageToken || '';
    Utilities.sleep(120);
  } while (pageToken);

  return ids;
}


// ---- 시트 C열(영상 ID)에서 기존 영상 ID 집합 읽기 ----
function getExistingVideoIds(sheet) {
  const lastRow = sheet.getLastRow();
  const set = new Set();
  if (lastRow < 2) return set;

  const vals = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
  vals.forEach(r => { if (r[0]) set.add(String(r[0])); });
  return set;
}


// ---- 영상 상세(설명란) 조회 ----
function fetchVideoDetails(videoIds) {
  if (!videoIds) return [];
  const url = `https://www.googleapis.com/youtube/v3/videos`
    + `?part=snippet`
    + `&id=${videoIds}`
    + `&maxResults=50`
    + `&key=${API_KEY}`;
  const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  const data = JSON.parse(res.getContentText());
  return data.items || [];
}


// ---- 설명란에서 데이터 추출 ----
function extractFromDescription(description) {
  const priceUrls = [...(description.match(URL_PATTERN) || [])];
  const phones = [...(description.match(PHONE_PATTERN) || [])];
  return { priceUrls, phones };
}


// ---- 시트 유틸 ----
function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function setupHeader(sheet) {
  const headers = ['영상 제목', '업로드일', '영상 ID', '영상 링크', '가격정보 URL', '대표번호'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4a86e8')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}
