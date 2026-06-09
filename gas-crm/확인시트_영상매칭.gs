/**
 * 빌리투어 원장님 CRM — 영상 매칭
 * 원장 마스터(이 시트) × 영상 매핑 시트(1VVF9…)를 "지점명"으로 조인,
 * 영상 있는 원장님만 [업로드일|영상링크|지점명|휴대폰번호]로 확인시트에 기록.
 *
 * 사용법: 이 시트(14BZWlMB…) → 확장 프로그램 → Apps Script → 붙여넣기 →
 *        확인시트_영상매칭 실행 (최초 1회 권한 승인). 메뉴 버튼으로 재실행 가능.
 */

var OWNERS_GID  = 1992036756;  // 원장 마스터 탭 (지점번호|지점명|휴대폰 번호|TEL_NO)
var CONFIRM_GID = 1109004439;  // 확인시트 (출력 대상)
var VIDEO_SS_ID = '1VVF9eztv8DwyEgxrf92KhtKmZilXrZSJNFhKRepbUQ4';
var VIDEO_GID   = 894289923;   // 영상 매핑 탭 (…|업로드일|…|영상 링크|…|지점명|…)

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CRM')
    .addItem('확인시트 영상매칭 갱신', '확인시트_영상매칭')
    .addToUi();
}

function 확인시트_영상매칭() {
  var ss      = SpreadsheetApp.getActive();
  var owners  = sheetByGid_(ss, OWNERS_GID);
  var confirm = sheetByGid_(ss, CONFIRM_GID);
  var videos  = sheetByGid_(SpreadsheetApp.openById(VIDEO_SS_ID), VIDEO_GID);

  // 원장 마스터: 정규화 지점명 → 휴대폰번호 (B=지점명, C=휴대폰)
  var ov = owners.getDataRange().getValues();
  var map = {};
  for (var i = 1; i < ov.length; i++) {
    var n = norm_(ov[i][1]);
    if (n && !(n in map)) map[n] = ov[i][2];
  }

  // 영상 매핑: 업로드일(1) · 영상링크(3) · 지점명(6)
  var vv = videos.getDataRange().getValues();
  var out = [];
  for (var j = 1; j < vv.length; j++) {
    var place = vv[j][6];
    var n = norm_(place);
    if (!n) continue;          // 지점명 없는 영상 제외(크롤러 미채움)
    if (!(n in map)) continue; // 원장 마스터에 없는 지점 제외
    out.push([vv[j][1], vv[j][3], place, map[n]]);
  }

  out.sort(function (a, b) {
    var x = dkey_(a[0]), y = dkey_(b[0]);
    return x < y ? -1 : (x > y ? 1 : 0);
  });

  confirm.clearContents();
  confirm.getRange(1, 1, 1, 4).setValues([['업로드일', '영상링크', '지점명', '휴대폰번호']]);
  if (out.length) confirm.getRange(2, 1, out.length, 4).setValues(out);
  confirm.setFrozenRows(1);
  try { SpreadsheetApp.getUi().alert('완료: ' + out.length + '건 기록했습니다.'); } catch (e) {}
  return out.length;  // clasp run 등 헤드리스 실행 시 반환값으로 확인
}

function sheetByGid_(ss, gid) {
  var sh = ss.getSheets();
  for (var i = 0; i < sh.length; i++) if (sh[i].getSheetId() === gid) return sh[i];
  throw new Error('gid ' + gid + ' 시트를 찾을 수 없습니다.');
}

// 지점명 정규화: 소문자 → 선행[] 제거 → 괄호류 공백 → 특수문자/공백 제거
function norm_(s) {
  if (s === null || s === undefined) return '';
  s = String(s).trim().toLowerCase();
  s = s.replace(/^\[\s*\]\s*/, '');
  s = s.replace(/[()\[\]（）]/g, ' ');
  s = s.replace(/[^0-9a-z가-힣]/g, '');
  return s;
}

// 업로드일 정렬 키 (Date/문자 혼재 대응)
function dkey_(v) {
  return (v instanceof Date)
    ? Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy-MM-dd')
    : String(v);
}
