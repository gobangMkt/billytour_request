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
| `TEMPLATE_PAYMENT_REELS` | `KA01TP260624072928482nzaAw7UG6yY` (결제요청 **릴스단건 55k**, 버튼 URL에 토스링크 직접 박힘) |
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
2. **`setupDropdowns()`** 실행 → K/O 상태 드롭다운 재설정 + **L/P(타임스탬프 열) 검증 강제 제거**.
   - ⚠️ L/P에 드롭다운 검증이 남아 있으면 발송시간 `setValue`가 거부돼 스탬프가 안 찍힘 (아래 트러블슈팅 참조).
3. (시트 헤더가 없을 때만) `setupSheets()` — 이미 16열 헤더·데이터가 있으면 건너뜀.
4. (선택) `diagnose()` — 시트·트리거·헤더·SOLAPI 자격증명 상태 점검 로그 출력.

> **스코프를 바꾼 뒤(예: 매니페스트 oauthScopes 변경)에는 반드시 재승인**해야 한다.
> 편집기에서 아무 함수(예: `testAuth`)를 실행해 새 권한 동의창을 한 번 통과시키면 트리거·웹앱 모두 갱신된 권한을 사용한다.

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

---

## 배포 식별자 / 폼 연결

- **form.html → /exec**: 라이브 폼(`https://billytour-shortform.vercel.app/form.html`)은 `AKfycbyI_0OO…/exec`(= 스크립트 1wx8의 **@1 배포**)를 호출.
  `clasp deploy -i AKfycbyI_0OO…` 로 **같은 배포 ID를 새 버전으로 갱신**하면 URL 유지한 채 코드가 반영됨 (form.html 수정 불필요).
- **트리거·편집기 실행 함수는 항상 HEAD(마지막 `clasp push`) 코드**를 사용. 웹폼만 배포 버전을 탐.
  → 트리거/`setupDropdowns` 류 수정은 `clasp push`만으로 즉시 반영, **웹폼 동작 수정만 `clasp deploy -i` 필요**.

---

## 트러블슈팅 (실전 수정 이력)

| 증상 | 원인 | 수정 |
|------|------|------|
| 결제 알림톡이 **10만원** 링크로 발송 | `TEMPLATE_PAYMENT_REELS`가 숏츠(10만) 템플릿으로 잘못 박힘 | 릴스단건 55k 템플릿 `KA01TP260624072928482nzaAw7UG6yY`로 교체 |
| K열 드롭다운에 **`발송완료` 없음** | 검증 목록이 `[검수중,발송하기]`뿐 + `showDropdown=false` | 목록에 `발송완료` 추가 + `showDropdown=true` + `setAllowInvalid(true)` |
| 알림톡은 가는데 **발송시간 스탬프 안 찍힘 / K가 발송완료로 안 바뀜 / 메모도 없음** | **L(결제발송시간) 열에 외부 드롭다운 검증(`발송대기/발송하기/발송완료/건너뜀`, 거부모드)**이 박혀 시간 `setValue`가 거부→예외, catch의 `검수중` 쓰기도 그 목록에 없어 재예외 | `setupDropdowns()`에서 **L(12)·P(16) 타임스탬프 열 `clearDataValidations()` 강제 제거** |
| 폼에서 "이미 동일한 상품으로 신청된 URL이에요" | `submitForm`이 `checkDuplicate`로 중복 차단(요청 안 한 기능) | `submitForm`의 `checkDuplicate` 호출 제거 (동일 URL/상품도 접수) |
| **신청접수·결제완료 이메일 미발송** | 코드는 `MailApp.sendEmail` 사용인데 매니페스트 스코프가 `gmail.send`만 선언 → MailApp이 요구하는 `script.send_mail` 누락 → 권한오류를 try/catch가 삼킴 | `appsscript.json` oauthScopes `gmail.send` → **`script.send_mail`** 교체 후 **재승인** |

> **타임스탬프 열(L/P)엔 데이터 검증을 절대 걸지 말 것.** 시트에서 K/O 드롭다운을 드래그·복사하다 L/P까지 검증이 번지면 위 스탬프 버그가 재발한다. 의심되면 `setupDropdowns()` 재실행.
