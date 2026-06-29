# gas-code-reels — 빌리투어 릴스단건 전용 GAS

빌리투어 **릴스단건**(인스타 Reels + 유튜브 Shorts) 신청 처리 전용 Google Apps Script 백엔드.

- **시트**: `1kF48mlpvfI-2R1spXXNLECLg-wUd_u_YzcHHO-ztBb0` — "[릴리즈] 빌리투어 숏폼 제작 안내 (기존 원장님 전용)"
  - 신청 폼 데이터가 들어오는 시트이자, 알림톡 발송·작업 관리를 하는 **단일 시트**.
- **스크립트**: `1wx8poOclV2TNKDbAvzTfknXhdOaIJTP58JNnWBSTvz4E-qMrGxrWn-74` — 위 시트에 **컨테이너 바인딩**.
- **웹앱 /exec 배포**: `AKfycbyI_0OO_zlmI_hnago0E7YJqFGUFzORT4at2iANiWyPq2JHwshGzbl0OY8PSiEi0WjxUg`
- 상품은 항상 `릴스단건` 단일. product 코드 `'R'`로 들어와도 분기 없이 라벨 고정.

> ⚠️ 과거엔 시트가 `1dwL`(릴스단건상품, 빈 껍데기)에 바인딩돼 폼·트리거가 어긋나 있었음.
> → 데이터·트리거가 실제로 도는 `1kF4` 시트에 바인딩된 스크립트로 일원화함. 옛 스크립트/시트는 폐기.

---

## 핵심 상수 (Code.gs 상단)

| 상수 | 값 |
|------|------|
| `SPREADSHEET_ID` | `1kF48mlpvfI…` (위 시트) |
| `PAY_LINK_REELS` | `https://s.tosspayments.com/BnsyJZlEmkG` (55,000원 VAT 포함) |
| `TEMPLATE_PAYMENT_REELS` | `KA01TP2606090944184923jC2HDupV2e` (결제요청, 버튼 URL에 토스링크 직접 박힘) |
| `TEMPLATE_COMPLETE_REELS` | `KA01TP260604101954648epByHA94rV6` (작업완료) |
| `CRAWL_SHEET_ID` | `1VVF9…` (영상↔지점 URL 매핑 크롤링 시트) |

> 결제링크는 알림톡 **템플릿 버튼 URL에 직접 박혀있다.** `PAY_LINK_REELS` 상수는 참고용 —
> 실제 발송 링크는 SOLAPI 콘솔에서 `TEMPLATE_PAYMENT_REELS` 템플릿 버튼 URL로 관리.

---

## 배포 절차 (clasp)

```bash
cd gas-code-reels
clasp push -f                                   # Code.gs + appsscript.json 업로드 (1wx8로)
clasp deploy --deploymentId AKfycbyI_0OO…       # 기존 배포 갱신(= /exec URL 유지)
```

- `.clasp.json`은 이미 `scriptId=1wx8…`, `parentId=1kF4…`로 설정됨.
- **/exec URL을 유지하려면** 새 `clasp deploy`(인자 없음) 대신 위처럼 `--deploymentId`로 **기존 배포를 갱신**할 것. (새로 deploy하면 URL이 바뀌어 `form.html`도 같이 고쳐야 함)

### 배포 후 GAS 편집기에서 1회 실행 (OAuth 권한 승인 포함)
1. 새 스크립트 편집기에서 **`setupTrigger()`** 실행 → 권한 승인 → `handleSheetEdit` 설치형 onEdit 트리거 등록
   - 이 1회 실행으로 시트·메일·UrlFetch 스코프가 승인되어 웹앱(/exec)도 동작하게 됨.
2. (시트 헤더/드롭박스가 없을 때만) `setupSheets()` — 이미 16열 헤더·데이터가 있으면 건너뜀.
3. (선택) `diagnose()` — 시트·트리거·헤더·SOLAPI 자격증명 상태 점검 로그 출력.

---

## Script Properties (GAS 편집기 → 프로젝트 설정 → 스크립트 속성)

| 키 | 용도 |
|----|------|
| `SOLAPI_API_KEY` | SOLAPI API 키 |
| `SOLAPI_API_SECRET` | SOLAPI 시크릿 |
| `SOLAPI_PF_ID` | 카카오 채널 pfId |
| `INBOX_TOKEN` | CS 인박스 중계 공유 토큰 |
| `YT_API_KEY` | (선택) 크롤링 시트 미스 시 YouTube Data API 폴백 |

---

## 시트 구조

- 시트 이름 절대 변경 금지: `설정` / `신청내역`
- **신청내역(16열)**: A신청일시 B상품 C신청자명 D연락처 E지점명 F지점주소
  G빌리투어영상URL H고방플레이스URL I메모 J결제완료일
  **K결제발송 L결제발송시간** M결과물URL N완료파일URL **O완료발송 P완료발송시간**
- **K열(결제발송) 절대규칙**: `검수중`→`발송하기`(결제링크 알림톡 발송)→`발송완료`. L열 발송시간 기록 후 재발송 차단.
- **O열(완료발송) 절대규칙**: `발송하기` 선택 시 M(결과물URL)+N(완료파일URL) 둘 다 있어야 완료 알림톡 발송. P열 발송시간 기록 후 재발송 차단.
- **J열(결제완료일)** 입력 시 결제완료 알림메일 발송 + 행 노랑 배경.
