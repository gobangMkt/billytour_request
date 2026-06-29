var SPREADSHEET_ID    = '1kF48mlpvfI-2R1spXXNLECLg-wUd_u_YzcHHO-ztBb0';
// 결제요청 알림톡 — 릴스단건 전용 템플릿 (버튼 URL에 토스링크가 직접 박혀있음)
var TEMPLATE_PAYMENT_REELS  = 'KA01TP2606090944184923jC2HDupV2e';  // 빌리투어_결제요청_숏츠 (영업일 5일) — 릴스 재사용
var TEMPLATE_COMPLETE_REELS = 'KA01TP260604101954648epByHA94rV6';  // 빌리투어_작업완료_숏츠 (릴스/인스타 업로드 완료) — 릴스 재사용

// 릴스단건 토스링크 55,000원 (VAT 포함)
var PAY_LINK_REELS = 'https://s.tosspayments.com/BnsyJZlEmkG';

// 유튜브 크롤링 결과 시트 (영상↔지점 URL 매핑) — 영상ID로 lookup
var CRAWL_SHEET_ID = '1VVF9eztv8DwyEgxrf92KhtKmZilXrZSJNFhKRepbUQ4';
var CRAWL_TAB      = '크롤링 결과';
// YouTube Data API 키는 Script Property 'YT_API_KEY' 로 저장 (시트 미스 시 폴백용)

// 상품 라벨 — 릴스 전용 단일화
var PRODUCT_LABEL_REELS = '릴스단건';

/* ───────────────────────────────────────────
   설정 시트 읽기
   A열: 라벨, B열: 값
   1행: active (ON/OFF)
   2행: startDate
   3행: endDate
   4행: 신청접수 알림 이메일 (콤마/공백 구분)
   5행: 결제완료 알림 이메일 (콤마/공백 구분)
─────────────────────────────────────────── */
function getSettings() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var s  = ss.getSheetByName('설정');

  // 1행이 '항목' 등 헤더이면 데이터는 2행부터
  var hasHeader = String(s.getRange(1, 1).getValue()).trim() === '항목';
  var startRow  = hasHeader ? 2 : 1;
  var data      = s.getRange(startRow, 1, 5, 2).getValues();

  function parseEmails(raw) {
    return String(raw || '').split(/[,\s]+/).filter(function(x){ return x; }).join(',');
  }

  // 활성화: 'ON' 문자열 외에 TRUE(불린) / 'TRUE' 문자열도 허용
  var activeRaw = data[0][1];
  var active    = (activeRaw === true ||
                   String(activeRaw).trim().toUpperCase() === 'ON' ||
                   String(activeRaw).trim().toUpperCase() === 'TRUE') ? 'ON' : 'OFF';

  var submitEmails  = parseEmails(data[3][1]) || 'archoit94@neoflat.net';
  var paymentEmails = parseEmails(data[4][1]) || 'phwansik@neoflat.net';

  return {
    active:       active,
    startDate:    data[1][1] ? new Date(data[1][1]) : null,
    endDate:      data[2][1] ? new Date(data[2][1]) : null,
    submitEmails:  submitEmails,
    paymentEmails: paymentEmails,
    notifyEmails:  submitEmails
  };
}

/* ───────────────────────────────────────────
   이벤트 활성 여부 확인
─────────────────────────────────────────── */
function checkAccess() {
  var cfg = getSettings();
  var now = new Date();

  if (cfg.active !== 'ON') return { ok: false, reason: '현재 신청을 받지 않고 있어요.' };

  if (cfg.startDate) {
    cfg.startDate.setHours(0, 0, 0, 0);
    if (now < cfg.startDate) {
      var diff = Math.ceil((cfg.startDate - now) / 86400000);
      return { ok: false, reason: diff + '일 후 신청 가능합니다.' };
    }
  }

  if (cfg.endDate) {
    cfg.endDate.setHours(23, 59, 59, 999);
    if (now > cfg.endDate) return { ok: false, reason: '신청 기간이 마감되었어요.' };
  }

  return { ok: true };
}

/* ───────────────────────────────────────────
   중복 신청 체크 (동일 URL + 동일 상품)
   신청내역: G(7) 빌리투어영상URL, B(2) 상품
─────────────────────────────────────────── */
function checkDuplicate(tourUrl, product) {
  var ss      = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet   = ss.getSheetByName('신청내역');
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var data           = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  var normalizedUrl  = String(tourUrl).trim().toLowerCase();
  var normalizedProd = String(product).trim();

  for (var i = 0; i < data.length; i++) {
    var rowUrl  = String(data[i][6]).trim().toLowerCase();  // G 빌리투어 영상 URL
    var rowProd = String(data[i][1]).trim();                // B 상품
    if (rowUrl === normalizedUrl && rowProd === normalizedProd) return true;
  }
  return false;
}

/* ───────────────────────────────────────────
   신청 폼 저장
   신청내역(16열):
     A=신청일시, B=상품, C=신청자명, D=연락처,
     E=지점명, F=지점주소, G=빌리투어영상URL, H=고방플레이스URL,
     I=메모, J=결제완료일, K=결제발송, L=결제발송시간,
     M=결과물URL, N=원본파일URL, O=완료발송, P=완료발송시간
─────────────────────────────────────────── */
function submitForm(formData) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  if (checkDuplicate(formData.tourUrl, PRODUCT_LABEL_REELS)) {
    return { success: false, reason: 'duplicate' };
  }

  var sheet        = ss.getSheetByName('신청내역');
  var now          = new Date();
  var productLabel = PRODUCT_LABEL_REELS;

  sheet.appendRow([
    now,                       // A: 신청일시
    productLabel,              // B: 상품
    formData.name     || '',   // C: 신청자명
    formData.phone    || '',   // D: 연락처
    formData.branchName || '', // E: 지점명
    formData.branchAddr || '', // F: 지점주소
    formData.tourUrl  || '',   // G: 빌리투어 영상 URL
    formData.placeUrl || '',   // H: 고방 플레이스 URL
    formData.memo     || '',   // I: 메모
    '',                        // J: 결제완료일
    '검수중',                  // K: 결제발송
    '',                        // L: 결제발송시간
    '',                        // M: 결과물URL
    '',                        // N: 원본파일 URL
    '검수중',                  // O: 완료발송
    ''                         // P: 완료발송시간
  ]);

  // 신청 접수 이메일 알림
  try {
    var NOTIFY_EMAIL = getSettings().submitEmails;
    var subject = '[빌리투어] 새 신청 접수 — ' + (formData.name || '') + ' / ' + productLabel;
    var body = [
      '새로운 빌리투어 신청이 접수됐어요.',
      '',
      '신청일시: ' + Utilities.formatDate(now, 'Asia/Seoul', 'yyyy-MM-dd HH:mm'),
      '상품: ' + productLabel,
      '신청자명: ' + (formData.name || ''),
      '전화번호: ' + (formData.phone || ''),
      '지점명: ' + (formData.branchName || ''),
      '지점주소: ' + (formData.branchAddr || ''),
      '빌리투어 영상 URL: ' + (formData.tourUrl || ''),
      '메모: ' + (formData.memo || '없음'),
      '',
      '▶ 신청 내역 확인: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID,
    ].join('\n');
    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
  } catch(mailErr) {
    Logger.log('신청접수 이메일 실패: ' + mailErr);
  }

  return { success: true };
}

/* ───────────────────────────────────────────
   유튜브 영상 기본정보 조회 (oEmbed, 서버 경유 — CORS 우회)
─────────────────────────────────────────── */
function getYoutubeInfo(url) {
  try {
    var api = 'https://www.youtube.com/oembed?url=' + encodeURIComponent(url) + '&format=json';
    var res = UrlFetchApp.fetch(api, { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) return { ok: false };
    var d = JSON.parse(res.getContentText());
    return {
      ok: true,
      title: d.title || '',
      channel: d.author_name || '',
      thumbnail: d.thumbnail_url || ''
    };
  } catch (err) {
    return { ok: false };
  }
}

/* ───────────────────────────────────────────
   유튜브 URL → 영상ID 추출
   youtu.be/ID, watch?v=ID, /shorts/ID, /embed/ID 모두 처리
─────────────────────────────────────────── */
function extractVideoId(url) {
  if (!url) return '';
  var s = String(url).trim();
  var m;
  m = s.match(/[?&]v=([A-Za-z0-9_-]{11})/);    if (m) return m[1];
  m = s.match(/youtu\.be\/([A-Za-z0-9_-]{11})/); if (m) return m[1];
  m = s.match(/\/shorts\/([A-Za-z0-9_-]{11})/);  if (m) return m[1];
  m = s.match(/\/embed\/([A-Za-z0-9_-]{11})/);   if (m) return m[1];
  m = s.match(/([A-Za-z0-9_-]{11})/);            if (m) return m[1];
  return '';
}

/* ───────────────────────────────────────────
   유튜브 URL → 지점 정보 해석 (메인 엔드포인트)
   1) 크롤링 시트에서 영상ID로 place URL lookup
   2) 없으면 YouTube Data API로 설명란 파싱 (폴백)
   3) place URL → 고방 페이지 스크래핑으로 지점명·주소·썸네일
─────────────────────────────────────────── */
function resolvePlace(url) {
  var videoId = extractVideoId(url);
  if (!videoId) return { ok: false, reason: 'invalid_url' };

  var placeUrl = '', ytTitle = '', phone = '', source = '';
  var branchName = '', branchAddr = '', thumbnail = '', walking = '';
  var cs = null, hitRow = -1;

  // 1) 크롤링 시트 lookup
  //    C=영상ID, A=영상제목, E=place URL, F=대표번호, G=지점명, H=주소, I=썸네일, J=도보
  try {
    cs = SpreadsheetApp.openById(CRAWL_SHEET_ID).getSheetByName(CRAWL_TAB);
    if (cs) {
      var found = cs.createTextFinder(videoId).matchEntireCell(true).findNext();
      if (found && found.getColumn() === 3) {  // C열(영상ID)만 정확 일치
        hitRow = found.getRow();
        var v = cs.getRange(hitRow, 1, 1, 10).getValues()[0];
        ytTitle    = String(v[0] || '').trim();
        placeUrl   = String(v[4] || '').trim();
        phone      = String(v[5] || '').trim();
        branchName = String(v[6] || '').trim();  // G
        branchAddr = String(v[7] || '').trim();  // H
        thumbnail  = String(v[8] || '').trim();  // I
        walking    = String(v[9] || '').trim();  // J
        source     = 'sheet';
      }
    }
  } catch (err) {
    Logger.log('크롤링 시트 조회 실패: ' + err);
  }

  // 2) 폴백: YouTube Data API → 설명란에서 place URL 추출
  if (!placeUrl) {
    var api = fetchVideoSnippet(videoId);
    if (api.ok) {
      ytTitle = api.title || ytTitle;
      var pm = String(api.description || '').match(/https?:\/\/gobang\.kr\/place\/\d+/);
      if (pm) { placeUrl = pm[0]; source = 'api'; }
    }
  }

  if (!placeUrl) return { ok: false, reason: 'no_place', ytTitle: ytTitle };

  // 3) 지점 상세 — 시트에 지점명·주소가 이미 있으면 스크래핑 생략(빠른 경로)
  if (!branchName || !branchAddr) {
    var info = fetchPlaceInfo(placeUrl);
    branchName = branchName || info.branchName;
    branchAddr = branchAddr || info.branchAddr;
    thumbnail  = thumbnail  || info.thumbnail;
    walking    = walking    || info.walking;

    // 시트 행이 있으면 G~J에 캐싱(lazy backfill) → 다음 조회부터 즉시
    if (cs && hitRow > 0) {
      try {
        if (String(cs.getRange(1, 7).getValue()).trim() === '') {
          cs.getRange(1, 7, 1, 4).setValues([['지점명', '주소', '썸네일', '도보']]);
        }
        cs.getRange(hitRow, 7, 1, 4).setValues([[branchName, branchAddr, thumbnail, walking]]);
      } catch (e) {
        Logger.log('시트 백필 실패: ' + e);
      }
    }
  }

  return {
    ok:         true,
    source:     source,
    placeUrl:   placeUrl,
    ytTitle:    ytTitle,
    phone:      phone,
    branchName: branchName || '',
    branchAddr: branchAddr || '',
    thumbnail:  thumbnail  || '',
    walking:    walking    || ''
  };
}

/* YouTube Data API videos.list → 제목·설명란 */
function fetchVideoSnippet(videoId) {
  try {
    var key = PropertiesService.getScriptProperties().getProperty('YT_API_KEY');
    if (!key) return { ok: false };
    var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + key;
    var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) return { ok: false };
    var d = JSON.parse(res.getContentText());
    if (!d.items || !d.items.length) return { ok: false };
    var sn = d.items[0].snippet;
    return { ok: true, title: sn.title || '', description: sn.description || '' };
  } catch (err) {
    return { ok: false };
  }
}

/* 고방 place 페이지 → 지점명·주소·썸네일·도보정보 (Mozilla UA 스크래핑) */
function fetchPlaceInfo(placeUrl) {
  var out = { branchName: '', branchAddr: '', thumbnail: '', walking: '' };
  try {
    var res = UrlFetchApp.fetch(placeUrl, {
      muteHttpExceptions: true,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    if (res.getResponseCode() !== 200) return out;
    var html = res.getContentText('UTF-8');

    // 주소: Next.js 데이터의 addrFullBunji (가장 안정적)
    var am = html.match(/"addrFullBunji"\s*:\s*"([^"]+)"/);
    if (am) out.branchAddr = am[1];

    // 지점명: JSON title의 첫 " - " 앞 → 폴백 og:title 마지막 " - " 뒤
    var tm = html.match(/"title"\s*:\s*"([^"]+?)\s*-\s*[^"]*"/);
    if (tm) {
      out.branchName = tm[1].trim();
    } else {
      var ogt = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
      if (ogt) {
        var parts = ogt[1].split(' - ');
        out.branchName = parts[parts.length - 1].trim();
      }
    }

    // 썸네일
    var im = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    if (im) out.thumbnail = im[1];

    // 도보정보 (og:description, 예: "갈산역 도보 1분 (갈산동)")
    var dm = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
    if (dm) out.walking = dm[1];

    return out;
  } catch (err) {
    return out;
  }
}

/* ───────────────────────────────────────────
   SOLAPI HMAC-SHA256 인증 헤더
─────────────────────────────────────────── */
function getSolapiAuthHeader() {
  var props     = PropertiesService.getScriptProperties();
  var apiKey    = props.getProperty('SOLAPI_API_KEY');
  var apiSecret = props.getProperty('SOLAPI_API_SECRET');
  var date      = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
  var salt      = Utilities.getUuid();
  var signature = Utilities.computeHmacSha256Signature(date + salt, apiSecret)
    .map(function(b) { return ('0' + (b & 0xFF).toString(16)).slice(-2); })
    .join('');
  return 'HMAC-SHA256 apiKey=' + apiKey + ', date=' + date + ', salt=' + salt + ', signature=' + signature;
}

/* ───────────────────────────────────────────
   알림톡 발송
─────────────────────────────────────────── */
function sendAlimtalk(to, templateId, variables) {
  var pfId    = PropertiesService.getScriptProperties().getProperty('SOLAPI_PF_ID');
  var payload = {
    message: {
      to: String(to).replace(/[^0-9]/g, ''),
      kakaoOptions: { pfId: pfId, templateId: templateId, variables: variables }
    }
  };
  var res = UrlFetchApp.fetch('https://api.solapi.com/messages/v4/send', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: getSolapiAuthHeader() },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  Logger.log('알림톡 응답: ' + res.getContentText());
  return res;
}

/* ───────────────────────────────────────────
   편집 트리거 — 발송 드롭박스 "발송하기" 선택 시 알림톡 발송
   · 신청 내역 K열(11) 결제발송 → 결제링크 알림톡
   · 신청 내역 J열(10) 결제완료일 → 결제완료 이메일
   · 신청 내역 O열(15) 완료발송 → 완료 알림톡
   ⚠️ 함수명을 'onEdit'으로 두면 권한없는 단순 트리거로도 자동 실행돼
      UrlFetch(SOLAPI)가 막힌다. 설치형 전용 이름(handleSheetEdit) 사용.
─────────────────────────────────────────── */
function handleSheetEdit(e) {
  var sheet     = e.range.getSheet();
  var sheetName = sheet.getName();
  var col       = e.range.getColumn();
  var row       = e.range.getRow();

  if (row < 2 || sheetName !== '신청내역') return;

  // 컬럼 번호 대신 헤더명으로 판단 — 시트 구조 변경에 안전
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var colName = String(headers[col - 1] || '').trim();

  if (colName === '결제발송') {
    handlePaymentSend(e, sheet, row);
  } else if (colName === '결제완료일') {
    handlePaymentComplete(e, sheet, row);
  } else if (colName === '완료발송') {
    handleCompleteSend(e, sheet, row);
  }
}

/* 신청내역 결제완료일(J) 열: 입력 시 행 노랑 + 결제완료 알림메일 발송 */
function handlePaymentComplete(e, sheet, row) {
  var paid = e.range.getValue();
  // 행 배경: 결제완료일 있으면 노랑, 비우면 흰색 복귀
  sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground(paid ? ROW_BG_PAID : ROW_BG_NONE);
  if (!paid) return;  // J열 비우면 메일 안 보냄
  notifyBillitourPaymentComplete_(sheet, row, e.range.getDisplayValue());
}

/* 결제완료 알림메일 — handleSheetEdit / CS앱 setPaymentDate 공용(e 비의존) */
function notifyBillitourPaymentComplete_(sheet, row, displayDate) {
  try {
    var rowData    = sheet.getRange(row, 1, 1, 16).getValues()[0];
    var applyDate  = rowData[0];                          // A: 신청일시
    var product    = String(rowData[1] || '');            // B: 상품
    var name       = String(rowData[2] || '');            // C: 신청자명
    var phone      = String(rowData[3] || '');            // D: 연락처
    var branchName = String(rowData[4] || '');            // E: 지점명
    var branchAddr = String(rowData[5] || '');            // F: 지점주소
    var tourUrl    = String(rowData[6] || '');            // G: 빌리투어 영상 URL
    var memo       = String(rowData[8] || '없음');        // I: 메모
    var applyDateFmt = applyDate instanceof Date
      ? Utilities.formatDate(applyDate, 'Asia/Seoul', 'yyyy-MM-dd HH:mm')
      : String(applyDate || '');

    var NOTIFY_EMAIL = getSettings().paymentEmails;
    var subject = '[빌리투어] 결제 완료 — ' + name + ' / ' + product;
    var body = [
      '결제가 완료 처리됐어요.',
      '',
      '━━ 신청 정보 ━━━━━━━━━━━━━━━',
      '신청일시: ' + applyDateFmt,
      '상품: ' + product,
      '',
      '━━ 고객 정보 ━━━━━━━━━━━━━━━',
      '신청자명: ' + name,
      '전화번호: ' + phone,
      '',
      '━━ 지점 정보 ━━━━━━━━━━━━━━━',
      '지점명: ' + branchName,
      '지점주소: ' + branchAddr,
      '빌리투어 영상 URL: ' + tourUrl,
      '',
      '━━ 기타 ━━━━━━━━━━━━━━━━━━━',
      '결제완료일: ' + displayDate,
      '메모: ' + memo,
      '',
      '▶ 신청 내역 확인: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID,
    ].join('\n');
    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
  } catch(mailErr) {
    Logger.log('결제완료 알림메일 실패: ' + mailErr);
  }
}

/* K열(11) 결제발송 = '발송하기' → 결제링크 알림톡 발송 + L열(12) 발송시간 기록 */
function handlePaymentSend(e, sheet, row) {
  if (String(e.range.getValue()).trim() !== '발송하기') return;

  // L열(12) 발송시간이 이미 있으면 재발송 안 함
  if (sheet.getRange(row, 12).getValue()) {
    e.range.setValue('발송완료');
    return;
  }

  var rowData = sheet.getRange(row, 1, 1, 17).getValues()[0];
  var phone   = String(rowData[3]).replace(/[^0-9]/g, '');  // D: 연락처
  var name    = String(rowData[2] || '').trim();            // C: 신청자명

  try {
    var res  = sendAlimtalk(phone, TEMPLATE_PAYMENT_REELS, { '#{신청자}': name });
    var code = res.getResponseCode();
    var body = JSON.parse(res.getContentText() || '{}');
    if (code !== 200 || (body.statusCode && body.statusCode !== '2000')) {
      throw new Error('HTTP ' + code + ' / ' + (body.statusMessage || res.getContentText()));
    }
    sheet.getRange(row, 12).setValue(
      Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss')
    );  // L: 결제발송시간
    e.range.setValue('발송완료');  // K
    e.range.clearNote();
  } catch (err) {
    Logger.log('결제링크 알림톡 실패: ' + err);
    e.range.setValue('검수중');
    e.range.setNote('발송오류: ' + err + ' (' + Utilities.formatDate(new Date(), 'Asia/Seoul', 'HH:mm:ss') + ')');
  }
}

/* O열(15) 완료발송 = '발송하기' → 완료 알림톡 발송 + P열(16) 발송시간 기록
   M열(13) 결과물URL + N열(14) 원본파일URL 둘 다 입력 + P열 비어있을 때만 발송 */
function handleCompleteSend(e, sheet, row) {
  if (String(e.range.getValue()).trim() !== '발송하기') return;

  // P열(16) 발송시간이 이미 있으면 재발송 안 함
  if (sheet.getRange(row, 16).getValue()) {
    e.range.setValue('발송완료');
    return;
  }

  var rowData    = sheet.getRange(row, 1, 1, 16).getValues()[0];
  var resultUrl  = String(rowData[12] || '').trim();  // M(13): 결과물URL
  var rawFileUrl = String(rowData[13] || '').trim();  // N(14): 원본파일 URL

  if (!resultUrl || !rawFileUrl) {
    e.range.setValue('검수중');
    e.range.setNote('반려: 결과물URL=' + (resultUrl ? 'O' : '비었음') +
                    ' / 원본파일URL=' + (rawFileUrl ? 'O' : '비었음') +
                    ' (' + Utilities.formatDate(new Date(), 'Asia/Seoul', 'HH:mm:ss') + ')');
    return;
  }

  var phone = String(rowData[3]).replace(/[^0-9]/g, '');  // D: 연락처
  var name  = String(rowData[2] || '').trim();            // C: 신청자명

  try {
    var res  = sendAlimtalk(phone, TEMPLATE_COMPLETE_REELS, { '#{신청자}': name, '#{결과물}': resultUrl });
    var code = res.getResponseCode();
    var body = JSON.parse(res.getContentText() || '{}');
    if (code !== 200 || (body.statusCode && body.statusCode !== '2000')) {
      throw new Error('HTTP ' + code + ' / ' + (body.statusMessage || res.getContentText()));
    }
    sheet.getRange(row, 16).setValue(
      Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss')
    );  // P: 완료발송시간
    e.range.setValue('발송완료');  // O
    e.range.clearNote();
    // 완료 시 행 주황으로 표시
    sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground(ROW_BG_DONE);
  } catch (err) {
    Logger.log('완료 알림톡 실패: ' + err);
    e.range.setValue('검수중');
    e.range.setNote('발송오류: ' + err + ' (' + Utilities.formatDate(new Date(), 'Asia/Seoul', 'HH:mm:ss') + ')');
  }
}

/* ───────────────────────────────────────────
   발송 드롭박스 + 조건부 색상 설정 (수동 실행)
   · K열(11) 결제발송 / O열(15) 완료발송
─────────────────────────────────────────── */
function setupDropdowns() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  var apply = ss.getSheetByName('신청내역');
  if (apply) {
    applyStatusDropdown(apply, 11);  // K: 결제발송
    applyStatusDropdown(apply, 15);  // O: 완료발송
    applyProductColors(apply, 2);    // B: 상품
  }

  Logger.log('드롭박스 + 색상 설정 완료');
}

/* 상품 글자색 구분 — 릴스단건 단일 (골드). G열.
   배경은 비워서 행 상태색(흰/노랑/주황)이 G열 배경도 함께 덮도록 함 */
function applyProductColors(sheet, col) {
  var range = sheet.getRange(2, col, 1000, 1);

  var existing = sheet.getConditionalFormatRules().filter(function(r) {
    return r.getRanges().every(function(rng) { return rng.getColumn() !== col; });
  });
  var rules = [
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(PRODUCT_LABEL_REELS)
      .setFontColor('#B8860B').setBold(true).setRanges([range]).build()
  ];
  sheet.setConditionalFormatRules(existing.concat(rules));
}

/* ───────────────────────────────────────────
   행 상태 배경색 (신청 내역만)
   · 흰(#FFFFFF)   = 신청완료(기본)
   · 노랑(#FFF2CC) = 결제완료 (결제완료일 I열 입력)
   · 주황(#FCE5CD) = 발행완료 (작업내역 완료알림 발송완료 → 매칭 행)
─────────────────────────────────────────── */
var ROW_BG_PAID = '#FFE599';   // 연한 노랑 2 (결제완료)
var ROW_BG_DONE = '#E69318';   // 진한 주황색 1 (발행완료)
var ROW_BG_NONE = '#FFFFFF';   // 흰 (신청완료)


/* 신청내역 기존 행 색 일괄 정리 (수동 실행 — 과거 데이터 소급 적용)
   O열(15) 완료발송=발송완료 → 주황 / J열(10) 결제완료일 있음 → 노랑 */
function recolorApplySheet() {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var apply = ss.getSheetByName('신청내역');
  var last  = apply.getLastRow();
  if (last < 2) return;

  var totalCol = apply.getLastColumn();
  var a = apply.getRange(2, 1, last - 1, totalCol).getValues();
  for (var i = 0; i < a.length; i++) {
    var bg = ROW_BG_NONE;
    if (String(a[i][14] || '').trim() === '발송완료') bg = ROW_BG_DONE;  // O(15, idx 14): 완료발송 → 주황
    else if (a[i][9])                                 bg = ROW_BG_PAID;  // J(10, idx  9): 결제완료일 → 노랑
    apply.getRange(i + 2, 1, 1, totalCol).setBackground(bg);
  }
  Logger.log('신청내역 행 색 일괄 정리 완료');
}

/* 발송 상태(검수중/발송하기/발송완료) 드롭박스 + 색상 */
function applyStatusDropdown(sheet, col) {
  var range = sheet.getRange(2, col, 1000, 1);
  range.clearDataValidations();
  range.setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['검수중', '발송하기'], false).build()
  );

  // 해당 열 외 기존 조건부 서식 유지
  var existing = sheet.getConditionalFormatRules().filter(function(r) {
    return r.getRanges().every(function(rng) { return rng.getColumn() !== col; });
  });
  var newRules = [
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('검수중')
      .setBackground('#E3F2FD').setFontColor('#1565C0').setRanges([range]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('발송하기')
      .setBackground('#FFF8E1').setFontColor('#F57F17').setRanges([range]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('발송완료')
      .setBackground('#E8F5E9').setFontColor('#388E3C').setRanges([range]).build()
  ];
  sheet.setConditionalFormatRules(existing.concat(newRules));
}

/* ───────────────────────────────────────────
   시트 초기 생성 — 배포 후 최초 1회 수동 실행
   설정 / 신청 내역 / 작업 내역 시트 + 헤더 + 드롭박스
─────────────────────────────────────────── */
function setupSheets() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  ensureSheet(ss, '설정');
  ensureSheet(ss, '신청내역');

  // 설정 시트 이메일 행 보장
  // 헤더가 있으면(1행='항목') 이메일은 5·6행, 없으면 4·5행
  var s = ss.getSheetByName('설정');
  var hasHeader = String(s.getRange(1, 1).getValue()).trim() === '항목';
  var emailRow  = hasHeader ? 5 : 4;

  if (!s.getRange(emailRow, 2).getValue()) {
    s.getRange(emailRow, 1, 2, 2).setValues([
      ['신청접수 알림 이메일', 'archoit94@neoflat.net'],
      ['결제완료 알림 이메일', 'phwansik@neoflat.net']
    ]);
    s.getRange(emailRow, 1, 2, 1).setFontWeight('bold');
  }

  // 설정 시트가 완전히 비어있으면 기본값 생성
  if (String(s.getRange(hasHeader ? 2 : 1, 1).getValue()).trim() === '') {
    var initRow = hasHeader ? 2 : 1;
    s.getRange(initRow, 1, 3, 2).setValues([
      ['활성화(ON/OFF)', 'ON'],
      ['시작일', ''],
      ['종료일', '']
    ]);
  }

  // 신청 내역 헤더 — 16열
  var apply = ss.getSheetByName('신청내역');
  if (apply.getLastRow() === 0) {
    apply.appendRow([
      '신청일시', '상품', '신청자명', '연락처', '지점명', '지점주소',
      '빌리투어 영상 URL', '고방 플레이스 URL', '메모', '결제완료일',
      '결제발송', '결제발송시간', '결과물URL', '완료파일URL',
      '완료발송', '완료발송시간'
    ]);
    apply.getRange(1, 1, 1, 16).setFontWeight('bold').setBackground('#f0f0f0');
  }

  setupDropdowns();
  Logger.log('시트 초기화 완료');
}

function ensureSheet(ss, name) {
  if (!ss.getSheetByName(name)) ss.insertSheet(name);
}

/* ───────────────────────────────────────────
   컬럼 구조 변경 시 — 데이터 시트 초기화 후 재생성 (수동 실행)
   ⚠️ '신청내역'의 모든 행·서식을 지웁니다. (설정 시트는 보존)
   기존 신청 데이터가 없을 때만 사용하세요.
─────────────────────────────────────────── */
function resetDataSheets() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  ['신청내역'].forEach(function(name) {
    var sh = ss.getSheetByName(name);
    if (sh) {
      sh.clear();
      sh.clearConditionalFormatRules();
      sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).clearDataValidations();
    }
  });
  setupSheets();   // 새 헤더 + 드롭박스 재생성
  Logger.log('데이터 시트 초기화 + 재생성 완료');
}

/* ───────────────────────────────────────────
   GAS 웹앱 엔드포인트
─────────────────────────────────────────── */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var action  = payload.action;
    var result;

    if (action === 'checkAccess') {
      var access = checkAccess();
      var cfg    = getSettings();
      result = {
        ok:        access.ok,
        reason:    access.reason || '',
        startDate: cfg.startDate ? Utilities.formatDate(cfg.startDate, 'Asia/Seoul', 'yyyy.MM.dd') : '',
        endDate:   cfg.endDate   ? Utilities.formatDate(cfg.endDate,   'Asia/Seoul', 'yyyy.MM.dd') : ''
      };
    } else if (action === 'submitForm') {
      result = submitForm(payload);
    } else if (action === 'ytInfo') {
      result = getYoutubeInfo(payload.url);
    } else if (action === 'resolvePlace') {
      result = resolvePlace(payload.url);
    } else if (action === 'listRequests') {
      result = listRequests(payload.token);
    } else if (action === 'sendPaymentLink') {
      result = sendPaymentLink(payload.token, payload.row);
    } else if (action === 'setPaymentDate') {
      result = setPaymentDate(payload.token, payload.row, payload.date);
    } else {
      result = { error: 'Unknown action: ' + action };
    }
  } catch (err) {
    result = { error: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ───────────────────────────────────────────
   설치형 트리거 등록 — 최초 1회 수동 실행
   (기존 onEdit 트리거가 있으면 함께 제거 후 handleSheetEdit로 재등록)
─────────────────────────────────────────── */
function setupTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    var fn = t.getHandlerFunction();
    if (fn === 'onEdit' || fn === 'handleSheetEdit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('handleSheetEdit')
    .forSpreadsheet(SpreadsheetApp.openById(SPREADSHEET_ID))
    .onEdit()
    .create();
}

/* ───────────────────────────────────────────
   외부 시트 배경색 적용 — 수동 1회 실행
   대상: 1kF48mlpvfI-2R1spXXNLECLg-wUd_u_YzcHHO-ztBb0
   "결제발송" 열 + "완료발송" 열 → 검수중/발송하기/발송완료 배경색 구분
─────────────────────────────────────────── */
function applyStatusColors() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  var COLOR_RULES = [
    { text: '검수중',  bg: '#E3F2FD', font: '#1565C0' },
    { text: '발송하기', bg: '#FFF8E1', font: '#F57F17' },
    { text: '발송완료', bg: '#E8F5E9', font: '#388E3C' }
  ];
  var TARGET_HEADERS = ['결제발송', '완료발송'];

  ss.getSheets().forEach(function(sheet) {
    var lastCol = sheet.getLastColumn();
    if (lastCol < 1) return;

    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    headers.forEach(function(header, idx) {
      if (TARGET_HEADERS.indexOf(String(header).trim()) === -1) return;

      var col   = idx + 1;
      var range = sheet.getRange(2, col, 1000, 1);

      // 해당 열 기존 조건부 서식만 제거, 나머지 유지
      var kept = sheet.getConditionalFormatRules().filter(function(r) {
        return r.getRanges().every(function(rng) { return rng.getColumn() !== col; });
      });

      var newRules = COLOR_RULES.map(function(rule) {
        return SpreadsheetApp.newConditionalFormatRule()
          .whenTextEqualTo(rule.text)
          .setBackground(rule.bg)
          .setFontColor(rule.font)
          .setRanges([range])
          .build();
      });

      sheet.setConditionalFormatRules(kept.concat(newRules));
      Logger.log('[' + sheet.getName() + '] ' + String(header).trim() + '열(' + col + ') 적용');
    });
  });

  Logger.log('applyStatusColors 완료');
}

/* ───────────────────────────────────────────
   스프레드시트 연결 테스트
─────────────────────────────────────────── */
function testAuth() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log(ss.getName());
}

/* ───────────────────────────────────────────
   ★ 진단 — 편집기에서 한 번 실행 후 [실행 로그] 전체 복사
   "알림톡은 가는데 시트가 안 바뀜" 원인을 한 방에 특정한다.
   1) 코드가 보는 시트(SPREADSHEET_ID)
   2) 스크립트가 바인딩된 컨테이너 시트(parentId)
   3) 설치된 트리거 목록 + 각 트리거가 감시하는 시트 ID
   4) 신청내역 헤더가 정확히 16열인지 (K=결제발송, L=결제발송시간)
   5) SOLAPI 자격증명 유무
─────────────────────────────────────────── */
function diagnose() {
  var L = [];
  L.push('======== 빌리투어 릴스 진단 ========');

  // 1) 코드가 보는 시트
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    L.push('[코드 SPREADSHEET_ID] ' + SPREADSHEET_ID);
    L.push('  └ 시트문서명: "' + ss.getName() + '"');
  } catch (e) {
    L.push('[코드 SPREADSHEET_ID] ' + SPREADSHEET_ID + ' → ❌ 열기 실패: ' + e);
  }

  // 2) 바인딩된 컨테이너 시트
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) {
      L.push('[바인딩 컨테이너] ' + active.getId());
      L.push('  └ 시트문서명: "' + active.getName() + '"');
      L.push('  └ 코드 시트와 동일? ' + (active.getId() === SPREADSHEET_ID ? '✅ 같음' : '❌ 다름 — 이게 버그 원인일 수 있음'));
    } else {
      L.push('[바인딩 컨테이너] (standalone — 컨테이너 없음)');
    }
  } catch (e) {
    L.push('[바인딩 컨테이너] 확인 불가: ' + e);
  }

  // 3) 트리거 목록
  var trs = ScriptApp.getProjectTriggers();
  L.push('[트리거 개수] ' + trs.length);
  trs.forEach(function (t, i) {
    var srcId = '';
    try { srcId = t.getTriggerSourceId(); } catch (e) { srcId = '(없음)'; }
    L.push('  #' + (i + 1) + ' 함수=' + t.getHandlerFunction()
      + ' / 이벤트=' + t.getEventType()
      + ' / 감시시트=' + srcId
      + (srcId === SPREADSHEET_ID ? ' ✅코드시트와일치'
        : srcId ? ' ⚠️코드시트와다름' : ''));
  });
  if (!trs.length) L.push('  ❌ 트리거 0개 — 발송 후 시트가 절대 안 바뀜! setupTrigger() 실행 필요.');

  // 4) 신청내역 헤더
  try {
    var sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('신청내역');
    if (!sh) {
      L.push('[신청내역] ❌ 시트 없음');
    } else {
      var hd = sh.getRange(1, 1, 1, Math.max(16, sh.getLastColumn())).getValues()[0];
      L.push('[신청내역 헤더] (' + sh.getLastColumn() + '열)');
      L.push('  K(11)="' + (hd[10] || '') + '"  ' + (String(hd[10]).trim() === '결제발송' ? '✅' : '❌ 결제발송 아님!'));
      L.push('  L(12)="' + (hd[11] || '') + '"  ' + (String(hd[11]).trim() === '결제발송시간' ? '✅' : '❌'));
      L.push('  O(15)="' + (hd[14] || '') + '"  P(16)="' + (hd[15] || '') + '"');
      L.push('  마지막 데이터 행: ' + sh.getLastRow());
    }
  } catch (e) {
    L.push('[신청내역 헤더] 확인 실패: ' + e);
  }

  // 5) SOLAPI 자격증명
  var p = PropertiesService.getScriptProperties();
  L.push('[SOLAPI] KEY=' + (p.getProperty('SOLAPI_API_KEY') ? 'O' : '❌')
    + ' SECRET=' + (p.getProperty('SOLAPI_API_SECRET') ? 'O' : '❌')
    + ' PF_ID=' + (p.getProperty('SOLAPI_PF_ID') ? 'O' : '❌'));
  L.push('====================================');

  var out = L.join('\n');
  Logger.log(out);
  return out;
}

/* ───────────────────────────────────────────
   발송 진단 — 편집기에서 직접 실행
   사용법: 아래 MY_PHONE 를 본인(테스트) 번호로 바꾼 뒤 testSend 실행 → 로그 확인
─────────────────────────────────────────── */
function testSend() {
  var MY_PHONE = '01000000000';  // ← 테스트 받을 번호로 교체

  var p = PropertiesService.getScriptProperties();
  Logger.log('SOLAPI_API_KEY: '    + (p.getProperty('SOLAPI_API_KEY')    ? '설정됨' : '❌ 없음'));
  Logger.log('SOLAPI_API_SECRET: ' + (p.getProperty('SOLAPI_API_SECRET') ? '설정됨' : '❌ 없음'));
  Logger.log('SOLAPI_PF_ID: '      + (p.getProperty('SOLAPI_PF_ID')      ? '설정됨' : '❌ 없음'));

  if (MY_PHONE === '01000000000') {
    Logger.log('⚠️ MY_PHONE 을 본인 번호로 바꾼 뒤 다시 실행하세요.');
    return;
  }
  var res = sendAlimtalk(MY_PHONE, TEMPLATE_PAYMENT_REELS, { '#{신청자}': '테스트' });
  Logger.log('HTTP ' + res.getResponseCode());
  Logger.log('SOLAPI 응답: ' + res.getContentText());
}

/* ═══════════════════════════════════════════════════════════
   CS 도움앱 — 신규 요청 인박스 중계 (listRequests / sendPaymentLink / setPaymentDate)
   신청 내역(16열): A신청일시 B상품 C신청자명 D연락처 E지점명 F지점주소
                    G빌리투어영상URL H고방플레이스URL I메모 J결제완료일
                    K결제발송 L결제발송시간 M결과물URL N원본파일URL O완료발송 P완료발송시간
   공유 토큰(Script Property INBOX_TOKEN) 검증. 연락처(D)는 응답에서 제외.
═══════════════════════════════════════════════════════════ */

function checkInboxToken_(token) {
  var t = PropertiesService.getScriptProperties().getProperty('INBOX_TOKEN');
  return !!t && token === t;
}

function fmtDateTime_(v) {
  if (!v) return '';
  if (v instanceof Date) return Utilities.formatDate(v, 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
  return String(v);
}
function fmtDate_(v) {
  if (!v) return '';
  if (v instanceof Date) return Utilities.formatDate(v, 'Asia/Seoul', 'yyyy-MM-dd');
  return String(v);
}

// 신청 내역(16열) → 연락처(D,4번째) 제외 목록. 결제완료일(J,10번째,idx9)로 paid 판정.
function listRequests(token) {
  if (!checkInboxToken_(token)) return { error: 'unauthorized' };
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName('신청내역');
  var lastRow = sheet.getLastRow();
  var items = [];
  if (lastRow >= 2) {
    var data = sheet.getRange(2, 1, lastRow - 1, 17).getValues();
    for (var i = 0; i < data.length; i++) {
      var r = data[i];
      if (!String(r[3] || '').trim()) continue; // D: 연락처 빈 행 제외
      var paidVal = r[9]; // J: 결제완료일
      items.push({
        row: i + 2,
        신청일시: fmtDateTime_(r[0]),
        paid: !!paidVal,
        paidDate: fmtDate_(paidVal),
        paidDateISO: fmtDate_(paidVal),
        상품: String(r[1] || ''),           // B: 상품
        이름: String(r[2] || ''),           // C: 신청자명
        // D: 연락처 r[3] 제외(PII)
        빌리투어URL: String(r[6] || ''),    // G: 빌리투어 영상 URL
        지점명: String(r[4] || ''),          // E: 지점명
        지점주소: String(r[5] || ''),        // F: 지점주소
        메모: String(r[8] || ''),            // I: 메모
        결제발송: String(r[10] || ''),       // K(11): 결제발송
        완료발송: String(r[14] || '')        // O(15): 완료발송
      });
    }
  }
  return { sheetUrl: 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID, items: items };
}

// 결제요청 알림톡 발송 + K(11)='발송완료'·L(12)=발송시간. L열 있으면 재발송 가드.
function sendPaymentLink(token, row) {
  if (!checkInboxToken_(token)) return { error: 'unauthorized' };
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName('신청내역');
  if (row < 2 || row > sheet.getLastRow()) return { error: 'invalid_row' };

  // L열(12) 발송시간이 이미 있으면 재발송 안 함
  if (sheet.getRange(row, 12).getValue()) return { ok: true, already: true };

  var rowData = sheet.getRange(row, 1, 1, 17).getValues()[0];
  var phone   = String(rowData[3] || '');         // D: 연락처
  var name    = String(rowData[2] || '').trim();  // C: 신청자명
  if (!phone) return { error: 'no_phone' };

  try {
    var res = sendAlimtalk(phone, TEMPLATE_PAYMENT_REELS, { '#{신청자}': name });
    var code = res.getResponseCode();
    var body = JSON.parse(res.getContentText() || '{}');
    if (code !== 200 || (body.statusCode && body.statusCode !== '2000')) {
      throw new Error('HTTP ' + code + ' / ' + (body.statusMessage || res.getContentText()));
    }
    sheet.getRange(row, 12).setValue(Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss')); // L
    sheet.getRange(row, 11).setValue('발송완료');  // K
    return { ok: true };
  } catch (e) {
    return { error: String(e) };
  }
}

// 결제완료일(J) 기입/취소. 프로그래밍 setValue는 트리거 미발동 → 행색·메일 직접 처리.
function setPaymentDate(token, row, date) {
  if (!checkInboxToken_(token)) return { error: 'unauthorized' };
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName('신청내역');
  if (row < 2 || row > sheet.getLastRow()) return { error: 'invalid_row' };

  if (!date) {
    sheet.getRange(row, 10).clearContent(); // J열 취소
    sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground(ROW_BG_NONE);
    return { ok: true };
  }
  var d = new Date(date); // 'yyyy-MM-dd'
  sheet.getRange(row, 10).setValue(d);
  sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground(ROW_BG_PAID); // handlePaymentComplete와 동일 노랑
  try {
    notifyBillitourPaymentComplete_(sheet, row, Utilities.formatDate(d, 'Asia/Seoul', 'yyyy-MM-dd'));
  } catch (e) {
    Logger.log('결제완료 후속작업 실패: ' + e);
  }
  return { ok: true };
}
