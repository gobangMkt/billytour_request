var SPREADSHEET_ID    = '1VeaQZPEn9Wnf3Yz_2Empz9Hzg1sg4NvYjB6lz4a48QY';
var TEMPLATE_PAYMENT  = '';  // SOLAPI 결제링크 알림톡 템플릿 ID
var TEMPLATE_COMPLETE = '';  // 완료 알림 템플릿 ID (예비)

/* ───────────────────────────────────────────
   설정 시트 읽기
   A열: 키, B열: 값
   1행: active (ON/OFF)
   2행: startDate
   3행: endDate
─────────────────────────────────────────── */
function getSettings() {
  var ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
  var s    = ss.getSheetByName('설정');
  var data = s.getRange(1, 1, 3, 2).getValues();
  return {
    active:    String(data[0][1]).trim(),
    startDate: data[1][1] ? new Date(data[1][1]) : null,
    endDate:   data[2][1] ? new Date(data[2][1]) : null
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
   신청 내역: G(7) 빌리투어URL, J(10) 상품선택
─────────────────────────────────────────── */
function checkDuplicate(tourUrl, product) {
  var ss      = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet   = ss.getSheetByName('신청 내역');
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var data           = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
  var normalizedUrl  = String(tourUrl).trim().toLowerCase();
  var normalizedProd = String(product).trim();

  for (var i = 0; i < data.length; i++) {
    var rowUrl  = String(data[i][6]).trim().toLowerCase();  // G 빌리투어URL
    var rowProd = String(data[i][9]).trim();                // J 상품선택
    if (rowUrl === normalizedUrl && rowProd === normalizedProd) return true;
  }
  return false;
}

/* ───────────────────────────────────────────
   신청 폼 저장
   신청 내역(13열):
     A=신청일시, B=결제완료일, C=이름, D=연락처,
     E=지점명, F=지점주소, G=빌리투어URL, H=영상제목, I=채널명,
     J=상품선택, K=추가요청사항,
     L=결제링크발송(발송대기/발송하기/발송완료), M=발송시간
─────────────────────────────────────────── */
function submitForm(formData) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // 중복 체크
  if (checkDuplicate(formData.tourUrl, formData.product)) {
    return { success: false, reason: 'duplicate' };
  }

  var sheet = ss.getSheetByName('신청 내역');

  // 헤더가 없으면 생성
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['신청일시', '결제완료일', '이름', '연락처', '지점명', '지점주소',
                     '빌리투어 URL', '영상 제목', '채널명', '상품 선택', '추가 요청사항',
                     '결제링크 발송', '발송시간']);
    sheet.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#f0f0f0');
  }

  var now          = new Date();
  var productLabel = formData.product === 'A' ? '글로벌재구매' : '숏츠단건';

  sheet.appendRow([
    now,
    '',
    formData.name       || '',
    formData.phone      || '',
    formData.branchName || '',
    formData.branchAddr || '',
    formData.tourUrl    || '',
    formData.ytTitle    || '',
    formData.ytChannel  || '',
    productLabel,
    formData.memo       || '',
    '발송대기',
    ''
  ]);

  // L열(결제링크 발송) "발송대기" 명시 (체크박스 서식 잔재 방지)
  var newRow = sheet.getLastRow();
  sheet.getRange(newRow, 12).setValue('발송대기');

  // ── 작업 내역 시트에도 기록 (제작 관리용) ──
  // 작업 내역(12열):
  // A=신청일시, B=이름, C=연락처, D=지점명, E=지점주소, F=상품,
  // G=빌리투어URL, H=작업상태, I=결과물URL, J=완료일, K=완료알림발송, L=발송시간
  var workSheet = ss.getSheetByName('작업 내역');
  if (workSheet) {
    if (workSheet.getLastRow() === 0) {
      workSheet.appendRow(['신청일시', '이름', '연락처', '지점명', '지점주소', '상품',
                           '빌리투어 URL', '작업 상태', '결과물 URL', '완료일',
                           '완료알림 발송', '발송시간']);
      workSheet.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#f0f0f0');
    }
    workSheet.appendRow([
      now, formData.name || '', formData.phone || '',
      formData.branchName || '', formData.branchAddr || '', productLabel,
      formData.tourUrl || '', '대기', '', '', '발송대기', ''
    ]);
    workSheet.getRange(workSheet.getLastRow(), 11).setValue('발송대기');
  }

  return { success: true };
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
   onEdit 트리거 — 발송 드롭박스 "발송하기" 선택 시 알림톡 발송
   · 신청 내역 L열(12) → 결제링크 알림톡
   · 작업 내역 K열(11) → 완료 알림톡
─────────────────────────────────────────── */
function onEdit(e) {
  var sheet     = e.range.getSheet();
  var sheetName = sheet.getName();
  var col       = e.range.getColumn();
  var row       = e.range.getRow();

  if (row < 2) return;

  if (sheetName === '신청 내역' && col === 12) {
    handlePaymentSend(e, sheet, row);
  } else if (sheetName === '작업 내역' && col === 11) {
    handleCompleteSend(e, sheet, row);
  }
}

/* 신청 내역 L열(12): 결제링크 알림톡 발송 / M열(13) 발송시간 */
function handlePaymentSend(e, sheet, row) {
  if (String(e.range.getValue()).trim() !== '발송하기') return;

  // M열(발송시간)이 이미 기록돼 있으면 재발송 안 함
  if (sheet.getRange(row, 13).getValue()) {
    e.range.setValue('발송완료');
    return;
  }

  var rowData = sheet.getRange(row, 1, 1, 13).getValues()[0];
  var phone   = String(rowData[3]).replace(/[^0-9]/g, '');  // D 연락처
  var name    = String(rowData[2] || '').trim();            // C 이름

  try {
    sendAlimtalk(phone, TEMPLATE_PAYMENT, { '#{신청자}': name });
    sheet.getRange(row, 13).setValue(
      Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss')
    );
    sheet.getRange(row, 12).setValue('발송완료');
  } catch (err) {
    Logger.log('결제링크 알림톡 실패: ' + err);
    e.range.setValue('발송대기');
  }
}

/* 작업 내역 K열(11): 완료 알림톡 발송 (결과물 URL + 완료일 입력 시에만) / L열(12) 발송시간 */
function handleCompleteSend(e, sheet, row) {
  if (String(e.range.getValue()).trim() !== '발송하기') return;

  // L열(발송시간)이 이미 기록돼 있으면 재발송 안 함
  if (sheet.getRange(row, 12).getValue()) {
    e.range.setValue('발송완료');
    return;
  }

  var rowData   = sheet.getRange(row, 1, 1, 12).getValues()[0];
  var resultUrl = String(rowData[8] || '').trim();   // I 결과물 URL
  var doneDate  = rowData[9];                          // J 완료일

  // 결과물 URL + 완료일 둘 다 채워져야 발송
  if (!resultUrl || !doneDate) {
    e.range.setValue('발송대기');
    return;
  }

  var phone = String(rowData[2]).replace(/[^0-9]/g, ''); // C 연락처
  var name  = String(rowData[1] || '').trim();           // B 이름

  try {
    sendAlimtalk(phone, TEMPLATE_COMPLETE, { '#{신청자}': name, '#{결과물}': resultUrl });
    sheet.getRange(row, 12).setValue(
      Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss')
    );
    sheet.getRange(row, 11).setValue('발송완료');
  } catch (err) {
    Logger.log('완료 알림톡 실패: ' + err);
    e.range.setValue('발송대기');
  }
}

/* ───────────────────────────────────────────
   발송 드롭박스 + 조건부 색상 설정 (수동 실행)
   · 신청 내역 L열(12)  · 작업 내역 K열(11)  · 작업 내역 작업상태 H열(8)
─────────────────────────────────────────── */
function setupDropdowns() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  var apply = ss.getSheetByName('신청 내역');
  if (apply) applyStatusDropdown(apply, 12);

  var work = ss.getSheetByName('작업 내역');
  if (work) {
    applyStatusDropdown(work, 11);
    applyWorkStatusDropdown(work, 8); // H열 작업 상태
  }
  Logger.log('드롭박스 + 색상 설정 완료');
}

/* 발송 상태(발송대기/발송하기/발송완료) 드롭박스 + 색상 */
function applyStatusDropdown(sheet, col) {
  var range = sheet.getRange(2, col, 1000, 1);
  range.clearDataValidations();
  range.setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['발송대기', '발송하기'], false).build()
  );

  // 해당 열 외 기존 조건부 서식 유지
  var existing = sheet.getConditionalFormatRules().filter(function(r) {
    return r.getRanges().every(function(rng) { return rng.getColumn() !== col; });
  });
  var newRules = [
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('발송대기')
      .setBackground('#F5F5F5').setFontColor('#9E9E9E').setRanges([range]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('발송하기')
      .setBackground('#FFF8E1').setFontColor('#F57F17').setRanges([range]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('발송완료')
      .setBackground('#E8F5E9').setFontColor('#388E3C').setRanges([range]).build()
  ];
  sheet.setConditionalFormatRules(existing.concat(newRules));
}

/* 작업 상태(대기/촬영/편집/업로드/완료) 드롭박스 */
function applyWorkStatusDropdown(sheet, col) {
  var range = sheet.getRange(2, col, 1000, 1);
  range.clearDataValidations();
  range.setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['대기', '촬영', '편집', '업로드', '완료'], false).build()
  );
}

/* ───────────────────────────────────────────
   시트 초기 생성 — 배포 후 최초 1회 수동 실행
   설정 / 신청 내역 / 작업 내역 시트 + 헤더 + 드롭박스
─────────────────────────────────────────── */
function setupSheets() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  ensureSheet(ss, '설정');
  ensureSheet(ss, '신청 내역');
  ensureSheet(ss, '작업 내역');

  // 설정 시트 기본값 (비어있을 때만)
  var s = ss.getSheetByName('설정');
  if (String(s.getRange(1, 1).getValue()).trim() === '') {
    s.getRange(1, 1, 3, 2).setValues([
      ['active', 'ON'],
      ['startDate', ''],
      ['endDate', '']
    ]);
  }

  // 신청 내역 헤더
  var apply = ss.getSheetByName('신청 내역');
  if (apply.getLastRow() === 0) {
    apply.appendRow(['신청일시', '결제완료일', '이름', '연락처', '지점명', '지점주소',
                     '빌리투어 URL', '영상 제목', '채널명', '상품 선택', '추가 요청사항',
                     '결제링크 발송', '발송시간']);
    apply.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#f0f0f0');
  }

  // 작업 내역 헤더
  var work = ss.getSheetByName('작업 내역');
  if (work.getLastRow() === 0) {
    work.appendRow(['신청일시', '이름', '연락처', '지점명', '지점주소', '상품',
                    '빌리투어 URL', '작업 상태', '결과물 URL', '완료일',
                    '완료알림 발송', '발송시간']);
    work.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#f0f0f0');
  }

  setupDropdowns();
  Logger.log('시트 초기화 완료');
}

function ensureSheet(ss, name) {
  if (!ss.getSheetByName(name)) ss.insertSheet(name);
}

/* ───────────────────────────────────────────
   컬럼 구조 변경 시 — 데이터 시트 초기화 후 재생성 (수동 실행)
   ⚠️ '신청 내역' / '작업 내역'의 모든 행·서식을 지웁니다. (설정 시트는 보존)
   기존 신청 데이터가 없을 때만 사용하세요.
─────────────────────────────────────────── */
function resetDataSheets() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  ['신청 내역', '작업 내역'].forEach(function(name) {
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
─────────────────────────────────────────── */
function setupTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'onEdit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onEdit')
    .forSpreadsheet(SpreadsheetApp.openById(SPREADSHEET_ID))
    .onEdit()
    .create();
}

/* ───────────────────────────────────────────
   스프레드시트 연결 테스트
─────────────────────────────────────────── */
function testAuth() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log(ss.getName());
}
