# gas-code-reels — 빌리투어 릴스단건 전용 GAS

빌리투어 **릴스단건**(인스타 Reels) 신청 처리 전용 Google Apps Script 백엔드.
기존 `gas-code/`(글로벌+숏츠)를 복제해 **릴스 전용**으로 정리한 별개 GAS다.

- 새 스프레드시트(`1dwLBuPaKjlQ5dle2-fAPPdPkVf3PPQrwdNP0D_KYhas`)에 바인딩.
- 상품은 항상 `릴스단건` 단일. product 코드 `'R'`로 들어와도 분기 없이 라벨 고정.
- `gas-code/`와 별개로 자체 `clasp push`/`clasp deploy` 한다.

---

## 기존 gas-code/ 대비 변경점

| 항목 | 변경 |
|------|------|
| 스프레드시트 ID | `1dwLBuPaKjlQ5dle2-fAPPdPkVf3PPQrwdNP0D_KYhas` (기존 1VeaQ… 제거) |
| 상품 라벨 | 글로벌/숏츠 2진 분기 제거 → 항상 `릴스단건` 고정 (`PRODUCT_LABEL_REELS`) |
| 결제링크 상수 | `PAY_LINK_GLOBAL`/`PAY_LINK_SHORTS` 제거 → `PAY_LINK_REELS = ''` (발급 후 입력) |
| 결제요청 템플릿 | `TEMPLATE_PAYMENT_REELS` 단일 (기존 숏츠 결제 템플릿 ID 재사용) |
| 완료 알림 템플릿 | `TEMPLATE_COMPLETE_REELS = 'KA01TP260604101954648epByHA94rV6'` (숏츠 완료=릴스/인스타 업로드 완료 템플릿 그대로 재사용) |
| 상품 색상(조건부 서식) | 글로벌(네이비)/숏츠(골드) 2규칙 → `릴스단건` 골드 `#B8860B` 단일 |
| 그 외 | resolvePlace·checkAccess·ytInfo·작업내역·J열 발송 절대규칙·K열 발송시간·onEdit 트리거·CS인박스(listRequests 등) 100% 유지 |

> ⚠️ 결제링크는 알림톡 **템플릿 버튼 URL에 직접 박혀있다.** `PAY_LINK_REELS` 상수는 참고용이며,
> 실제 발송 링크는 SOLAPI 템플릿(`TEMPLATE_PAYMENT_REELS`) 자체에서 55,000원 토스링크로 교체해야 한다.

---

## 배포 절차 (clasp)

### 1. clasp 로그인 (최초 1회)
```bash
clasp login
```

### 2. 스크립트 생성 후 scriptId 입력
`.clasp.json`의 `scriptId`는 **빈 문자열**이다 (JSON에 주석 불가). 배포 전 채워야 한다.

방법 A — 새 컨테이너 바인딩 스크립트 생성:
```bash
cd gas-code-reels
clasp create --type sheets --parentId 1dwLBuPaKjlQ5dle2-fAPPdPkVf3PPQrwdNP0D_KYhas --title "빌리투어 릴스 GAS"
```
→ 생성된 scriptId가 `.clasp.json`에 자동 기록됨.

방법 B — 시트에서 직접 Apps Script 프로젝트 생성 후 scriptId 수동 입력:
1. 새 시트 → 확장 프로그램 → Apps Script
2. 프로젝트 설정에서 스크립트 ID 복사
3. `.clasp.json`의 `"scriptId": ""` 에 붙여넣기

### 3. push & deploy
```bash
cd gas-code-reels
clasp push          # Code.gs + appsscript.json 업로드
clasp deploy        # 웹앱 배포 → 배포 URL(/exec) 발급
```
- 배포 후 발급된 `GAS_URL`을 릴스용 신청폼(`index.html`)의 `GAS_URL`에 반영.

---

## 배포 후 GAS 편집기에서 실행할 함수 (순서)

1. `setupSheets()` — 설정/신청 내역/작업 내역 시트 + 헤더 + 드롭박스 생성 (최초 1회)
2. `setupTrigger()` — `handleSheetEdit` 설치형 onEdit 트리거 등록 (알림톡 발송에 필요)
3. (선택) `testAuth()` — 스프레드시트 연결 확인
4. (선택) `testSend()` — `MY_PHONE` 교체 후 알림톡 발송 테스트

---

## Script Properties (GAS 편집기 → 프로젝트 설정 → 스크립트 속성)

| 키 | 용도 |
|----|------|
| `SOLAPI_API_KEY` | SOLAPI API 키 |
| `SOLAPI_API_SECRET` | SOLAPI 시크릿 |
| `SOLAPI_PF_ID` | 카카오 채널 pfId |
| `INBOX_TOKEN` | CS 인박스 중계 공유 토큰 |
| `YT_API_KEY` | (선택) 크롤링 시트 미스 시 YouTube Data API 폴백 |

> SOLAPI 발송 계정·크롤링 시트(`1VVF9…`) 접근 권한은 기존과 동일하게 필요.

---

## 토스 결제링크 교체 위치

릴스단건 55,000원 토스링크 발급 후:
1. `Code.gs`의 `PAY_LINK_REELS = ''` 에 입력 (참고용 상수).
2. **실제 발송 링크**는 SOLAPI 콘솔에서 `TEMPLATE_PAYMENT_REELS`(`KA01TP2606090944184923jC2HDupV2e`)
   템플릿 버튼 URL을 릴스 토스링크로 교체. (코드 상수만 바꿔도 발송엔 반영 안 됨)

---

## 시트 구조 (기존과 동일)

- 시트 이름 절대 변경 금지: `설정` / `신청 내역` / `작업 내역`
- 신청 내역(11열): A신청일시 B이름 C연락처 D빌리투어URL E지점명 F지점주소 G상품선택 H추가요청 I결제완료일 J결제링크발송 K발송시간
- 작업 내역(11열): A~F 동일, G상품 H결과물URL I완료일 J완료알림발송 K발송시간
- J열 발송 절대규칙: `발송대기`→`발송하기`(발송)→`발송완료`. K열 발송시간 기록 후 재발송 차단.
  작업 내역 완료알림은 H(결과물URL)+I(완료일) 둘 다 있을 때만 발송.
