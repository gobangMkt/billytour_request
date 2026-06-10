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
    .addItem('2년 기준 분리 + 중복색표기', '세그먼트_2년분리')
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

/**
 * 확인시트(314건)를 업로드일 기준 "지금-2년"으로 분리:
 *   2년전 = 업로드일 <= (오늘-2년)  (오래된 영상 → 글로벌 재구매 타겟)
 *   2년후 = 업로드일 >  (오늘-2년)  (최근 영상 → 숏츠 타겟)
 * 각 시트에서 휴대폰번호(D열) 중복 그룹은 그룹별 배경색으로 묶어 표시.
 */
function 세그먼트_2년분리() {
  var ss = SpreadsheetApp.getActive();
  var src = sheetByGid_(ss, CONFIRM_GID);
  var data = src.getDataRange().getValues();
  if (data.length < 2) throw new Error('확인시트에 데이터가 없습니다. 먼저 영상매칭을 실행하세요.');

  var header = data[0];
  var cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - 2);

  var older = [], newer = [];
  for (var i = 1; i < data.length; i++) {
    var d = toDate_(data[i][0]);
    // 날짜 파싱 실패분은 안전하게 '2년후(최근)'로 보내 누락 방지
    if (d && d <= cutoff) older.push(data[i]);
    else newer.push(data[i]);
  }

  writeSegment_(ss, '2년전', header, older);
  writeSegment_(ss, '2년후', header, newer);

  var msg = '완료\n2년전(오래됨): ' + older.length + '건\n2년후(최근): ' + newer.length + '건\n기준일: ' +
            Utilities.formatDate(cutoff, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) {}
  return { older: older.length, newer: newer.length };
}

function writeSegment_(ss, name, header, rows) {
  var sh = ss.getSheetByName(name);
  if (sh) sh.clear(); else sh = ss.insertSheet(name);

  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold').setBackground('#1A3A6B').setFontColor('#FFFFFF');
  sh.setFrozenRows(1);
  if (!rows.length) return;
  sh.getRange(2, 1, rows.length, header.length).setValues(rows);

  // 휴대폰번호(D열, index 3) 중복 그룹 → 그룹별 색상
  var palette = ['#FFF2CC', '#D9EAD3', '#CFE2F3', '#FCE5CD', '#EAD1DC', '#D9D2E9', '#FFE599', '#B6D7A8', '#A4C2F4', '#F9CB9C'];
  var groups = {};
  for (var i = 0; i < rows.length; i++) {
    var key = normPhone_(rows[i][3]);
    if (!key) continue;
    (groups[key] = groups[key] || []).push(i);
  }
  var ci = 0;
  Object.keys(groups).forEach(function (k) {
    var idx = groups[k];
    if (idx.length < 2) return;              // 중복(2건 이상)만 색칠
    var color = palette[ci % palette.length]; ci++;
    idx.forEach(function (r) {
      sh.getRange(r + 2, 1, 1, header.length).setBackground(color);
    });
  });
  sh.autoResizeColumns(1, header.length);
}

// 휴대폰번호 정규화(숫자만) — 중복 판정용
function normPhone_(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/[^0-9]/g, '');
}

// 업로드일 → Date (Date/문자 혼재 대응, '2024.03.01' '2024/3/1' '2024-03-01' 허용)
function toDate_(v) {
  if (v instanceof Date) return v;
  if (v === null || v === undefined || v === '') return null;
  var s = String(v).trim().replace(/[.\/]/g, '-').replace(/-+$/, '');
  var d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
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
