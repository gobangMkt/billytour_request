# 빌리투어 상품화 — CLAUDE.md

## 프로젝트 개요

U사장님 브랜드의 빌리투어 상품화 이벤트 랜딩페이지 + 신청폼.  
기존 원장님 대상 빌리투어 글로벌 재구매(40만) / 숏츠 단건(10만) 이벤트.

---

## 배포

| 대상 | URL | 방법 |
|------|-----|------|
| 신청 폼 | https://gobangmkt.github.io/billytour_request/ | GitHub Pages (main 브랜치 push 시 자동) |
| 랜딩페이지 | Vercel (배포 후 확정) | `cd landing && npx vercel --prod` |

---

## 주요 파일

```
index.html          신청 폼 (메인 페이지)
colors_and_type.css  디자인 토큰 (U 시그니처 블루 팔레트)
landing/
  index.html        랜딩페이지 진입점 (React CDN + Babel Standalone)
  shared.jsx        공용 컴포넌트 (LandingNav, FaqItem, REQUEST_URL 등)
  variant-a.jsx     현재 사용 중인 랜딩 variant
  shared.css        공용 CSS
  colors_and_type.css  디자인 토큰 (루트 복사본)
  server.js         로컬 개발 서버 (포트 5600)
  vercel.json       Vercel 배포 설정
assets/
  U_ALF.png         U사장님 로고
gas-code/
  Code.gs           Google Apps Script 백엔드 (신청폼 1VeaQ… 시트 바인딩)
gas-crawler/
  Code.js           유튜브 크롤링 GAS (@RoomTour 영상→지점 URL 매핑 시트 생성, 1VVF9… 시트)
  README.md         크롤러 설명
```

> `gas-code`와 `gas-crawler`는 **서로 다른 스프레드시트에 바인딩된 별개 GAS**다. 각 폴더에서 따로 `clasp push`/`clasp deploy` 한다.

---

## 기술 스택

- **신청 폼**: 순수 HTML + Vanilla JS
- **랜딩**: React 18 (CDN) + Babel Standalone
- **백엔드**: Google Apps Script (GAS) + 구글 시트
- **알림톡**: SOLAPI
- **폰트**: Pretendard (Google Fonts CDN)

---

## 디자인 시스템 (U 시그니처 블루)

| 역할 | 색상 |
|------|------|
| Primary Navy | `#1A3A6B` |
| CTA Blue | `#2B85CC` |
| Accent Gold | `#E8B84B` |
| Background | `#F8FAFC` |
| Text | `#1A202C` |

---

## 상품 구조

### 빌리투어 글로벌
- 정가: 50만원
- 이벤트가: **40만원** (기존 원장님 한정)
- 구성: 촬영+편집+유튜브/고방 업로드+영어 자막+자동번역+썸네일+하이라이트

### 숏츠 패키지
- 가격: **10만원**
- 구성: 숏폼 1개 제작 → 유튜브 Shorts·커뮤니티 + 인스타 Reels 동시 업로드

---

## 이벤트 오퍼

| 오퍼 | 내용 | 금액 |
|------|------|------|
| A. 글로벌 재구매 | 빌리투어 글로벌 + 숏츠 무료 | 40만원 |
| B. 숏츠 단건 | 기존 영상으로 숏츠 선구매 | 10만원 |

---

## 토스 결제링크 (라이브)

| 상품 | 결제액(VAT 포함) | 링크 | 실제 URL |
|------|------|------|------|
| 글로벌재구매 | 440,000 | https://s.tosspayments.com/BnpMF3uoUf7 | buy.tosspayments.com/products/tLBnpLpWL0 |
| 숏츠단건 | 110,000 | https://s.tosspayments.com/BnpMF-HA2If | buy.tosspayments.com/products/IaBnpL6B4w |

- GAS `Code.gs`의 `PAY_LINK_GLOBAL` / `PAY_LINK_SHORTS` 상수에 동일하게 박혀있음. 링크 교체 시 양쪽 모두 수정.
- 알림톡 발송 시 신청 내역 J열(상품선택)이 `숏츠단건`이면 숏폼 링크, 그 외 글로벌 링크 자동 매칭 → `#{결제링크}` 변수로 전달.

---

## GAS API

```js
var GAS_URL = 'https://script.google.com/macros/s/AKfycbw8gsvLxZ2QEo4TMfMocWkTTyCD9fPmKT7yP7QZkicP4rUQUfQQdYwGgtYXUVapT-ms/exec';
```

- **스프레드시트 ID**: `1VeaQZPEn9Wnf3Yz_2Empz9Hzg1sg4NvYjB6lz4a48QY`
- **스크립트 ID**: `1AqiRJK99BiupdMnasOcrM4NACeXATN9WdEuflfFuJ05tVOlaGKE-qrMJ`
- **clasp 연동**: `gas-code/` 폴더에서 `clasp push` → `clasp deploy`
- **재배포 시**: 새 `clasp deploy` 후 `index.html`의 `GAS_URL` 업데이트 필요

| action | 설명 |
|--------|------|
| `checkAccess` | 이벤트 활성 여부 확인 |
| `submitForm` | 신청 데이터 구글 시트 저장 (신청 내역 + 작업 내역 동시 기록) |
| `ytInfo` | 유튜브 oEmbed 영상 정보 (예비) |
| `resolvePlace` | **빌리투어 URL → 지점 자동 검증** (아래 흐름 참조) |

### 지점 자동 검증 (`resolvePlace`)

신청폼에서 빌리투어 영상 링크를 입력하면 지점 URL·지점명·주소를 자동으로 찾아 검증한다.

```
유튜브 URL → extractVideoId
  ① 크롤링 시트(1VVF9…, gas-crawler가 생성) 에서 영상ID로 지점 URL lookup  ← 1순위
  ② 시트에 없으면 YouTube Data API(videos.list)로 설명란에서 place URL 추출  ← 폴백
  → fetchPlaceInfo(고방 페이지 스크래핑): 지점명·주소·썸네일·도보
  → 프론트 지점 카드 표시 + 지점명·주소 자동채움(수정 가능)
```

- **지점명**: 고방 페이지 JSON `"title"` 첫 ` - ` 앞 (폴백 og:title)
- **주소**: `"addrFullBunji"` / **썸네일**: og:image / **도보**: og:description
- **폴백 키**: 시트에 없는 최신 영상까지 처리하려면 GAS Script Property `YT_API_KEY` 등록 필요. 미설정 시 시트에 있는 영상만 동작.
- **크롤링 시트 권한**: GAS 실행 계정이 `1VVF9…` 시트에 접근 가능해야 함(공유/소유).

---

## 구글 시트 컬럼 구조

> 두 시트 모두 **신청폼 입력 순서**(이름·연락처·빌리투어URL·지점명·지점주소·상품)로 컬럼을 통일했다. 상품 컬럼(G)은 조건부 서식으로 글로벌재구매=블루(`#E3F0FB`)/숏츠단건=골드(`#FFF4D6`) 색 구분.

### 신청 내역 시트 (11열)
| 열 | 내용 |
|----|------|
| A | 신청일시 (자동) |
| B | 이름 (자동) |
| C | 연락처 (자동) |
| D | 빌리투어 URL (자동) |
| E | 지점명 (자동) |
| F | 지점 주소 (자동) |
| G | 상품 선택 (자동, 색상 구분) |
| H | 추가 요청사항 (자동) |
| I | 결제완료일 (수동) |
| J | 결제링크 발송 드롭박스 — `발송대기`/`발송하기`/`발송완료` |
| K | 발송시간 (자동) |

**J열 발송 로직 (절대 규칙):**
- 신청 접수 → `발송대기`
- `발송하기` 선택 → 알림톡 발송 후 `발송완료` (K열에 발송시간 기록)
- 발송완료 후 재선택해도 재발송 안 됨
- I열(결제완료일) 입력 시 → 결제완료 알림메일 발송

### 작업 내역 시트 (제작 관리, 11열)
신청 시 자동으로 행 생성됨. 제작 진행을 추적.

| 열 | 내용 | 입력 |
|----|------|------|
| A | 신청일시 | 자동 |
| B | 이름 | 자동 |
| C | 연락처 | 자동 |
| D | 빌리투어 URL | 자동 |
| E | 지점명 | 자동 |
| F | 지점 주소 | 자동 |
| G | 상품 (글로벌재구매/숏츠단건) | 자동, 색상 구분 |
| H | 결과물 URL (유튜브/숏츠 링크) | 수동 |
| I | 완료일 | 수동 |
| J | 완료알림 발송 — `발송대기`/`발송하기`/`발송완료` | 드롭박스 |
| K | 발송시간 | 자동 |

**J열 완료알림 로직 (절대 규칙):**
- `발송하기` 선택 → **H(결과물URL) + I(완료일) 둘 다 입력된 경우만** 완료 알림톡 발송 후 `발송완료`
- 미입력 시 → `발송대기`로 자동 복귀
- K열(발송시간) 기록 후 재선택해도 재발송 안 됨

### ⚠️ 시트 이름 절대 변경 금지
`설정` / `신청 내역` / `작업 내역` — 코드가 이름으로 시트를 찾으므로 탭 이름 변경 시 동작 깨짐. (문서 제목·시트 순서·시트1 삭제는 무관)

### GAS 유지보수 함수 (편집기에서 직접 실행)
- `setupSheets()` — 시트 3개 + 헤더 + 드롭박스 초기 생성 (배포 후 1회)
- `setupDropdowns()` — 드롭박스/색상 재설정
- `setupTrigger()` — onEdit 설치형 트리거 등록 (알림톡 발송 시 필요)

---

## 커스텀 토글 체크박스

```html
<div class="toggle-wrap">
  <input type="checkbox" id="someToggle" class="toggle-input">
  <span class="toggle-slider"></span>
</div>
```

---

## 로컬 개발

```bash
# 랜딩
cd landing && node server.js   # 또는 "시작 5600.bat"

# 신청 폼 (index.html)
# 브라우저에서 직접 열기 또는 Live Server
```
