# 빌리투어 릴스단건 — 신청 시스템

기존 원장님 대상 **릴스단건(55,000원)** 신청·결제·제작 관리 시스템.
신청폼(웹) → 구글시트 적재 → 결제요청/작업완료 알림톡 → 제작 관리까지 한 시트에서 처리.

- **상품**: 릴스단건 1건 (인스타 Reels + 유튜브 Shorts 업로드), **55,000원(VAT 포함)**
- **결제링크**: https://s.tosspayments.com/BnsyJZlEmkG (알림톡 템플릿 버튼에 직접 박힘)
- **repo**: https://github.com/gobangMkt/billytour_request (루트 = `빌리투어-상품화`, 본 시스템은 `릴스-단건/` 하위)

---

## 구성 / 데이터 흐름

```
form.html (신청폼)  ──POST /exec──▶  GAS(1wx8)  ──▶  구글시트 1kF4 「신청내역」 적재
                                         │                    │
                                         │              (운영자가 K열 발송하기 선택)
                                         ▼                    ▼
                                  신청접수 메일 알림      결제요청 알림톡(SOLAPI) + L열 발송시간
                                                              │
                                          (J열 결제완료일 입력)│  (M·N 입력 후 O열 발송하기)
                                                              ▼
                                                  결제완료 메일 / 작업완료 알림톡
```

| 구성요소 | 파일/위치 |
|----------|-----------|
| 신청폼 | `form.html` (Vanilla JS) |
| 랜딩/진입 | `index.html`, `landing/index.html` |
| 백엔드(GAS) | `gas-code-reels/` — 상세는 **[gas-code-reels/README.md](gas-code-reels/README.md)** |
| 디자인 토큰/에셋 | `assets/`, `landing/` |

---

## 배포

| 대상 | URL / 식별자 | 방법 |
|------|--------------|------|
| 신청폼 | https://billytour-shortform.vercel.app/form.html | Vercel (gobangmkt) |
| GAS 웹앱 /exec | `AKfycbyI_0OO…/exec` (스크립트 `1wx8…`의 **@1 배포**) | `cd gas-code-reels && clasp push -f && clasp deploy -i AKfycbyI_0OO… -d "…"` |
| 구글시트 | `1kF48mlpvfI-2R1spXXNLECLg-wUd_u_YzcHHO-ztBb0` | 스크립트가 컨테이너 바인딩 |

- **폼 동작 수정** → `clasp push` 후 **`clasp deploy -i`(기존 배포 ID 갱신)** 필요 (URL 유지, form.html 안 건드림).
- **트리거/시트 셋업 함수 수정**(`setupDropdowns`, `handleSheetEdit` 등) → `clasp push`만으로 즉시 반영(HEAD 사용).
- 시크릿(SOLAPI 키 등)은 GAS **스크립트 속성**에 저장 — 값은 repo에 두지 않음. 목록은 백엔드 README 참조.

---

## 운영 절대규칙 (요약)

- 시트 이름 변경 금지: `설정` / `신청내역`.
- **신청내역 16열**: A신청일시 B상품 C신청자명 D연락처 E지점명 F지점주소 G빌리투어영상URL H고방플레이스URL I메모 J결제완료일 **K결제발송 L결제발송시간** M결과물URL N완료파일URL **O완료발송 P완료발송시간**.
- **K(결제발송)**: `검수중`→`발송하기`(결제요청 알림톡)→`발송완료`(L에 시간기록, 재발송 차단).
- **O(완료발송)**: `발송하기` 시 M·N 둘 다 있어야 작업완료 알림톡(P에 시간기록). 알림톡 `#{결과물}` 변수에 **M(결과물URL)+N(완료파일URL)을 합쳐** 전달 — 템플릿 고정 문구 `■ 릴스링크 :` 아래에 `▶ 결과물 : …` / `▶ 완료파일 : …` 두 줄로 떨어지도록 변수값 앞에 줄바꿈 포함.
- **J(결제완료일)** 입력 → 결제완료 메일 발송 + 행 노랑.
- ⚠️ **타임스탬프 열(L·P)에 데이터 검증 금지** — 걸리면 스탬프 `setValue`가 거부돼 발송 처리 전체가 깨짐. 재발 시 `setupDropdowns()` 재실행.

> 자세한 상수·스크립트 속성·트러블슈팅 이력은 **[gas-code-reels/README.md](gas-code-reels/README.md)**.
