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
  Code.gs           Google Apps Script 백엔드
```

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
- 구성: 숏폼 2개+Shorts+커뮤니티+인스타 Reels

---

## 이벤트 오퍼

| 오퍼 | 내용 | 금액 |
|------|------|------|
| A. 글로벌 재구매 | 빌리투어 글로벌 + 숏츠 무료 | 40만원 |
| B. 숏츠 단건 | 기존 영상으로 숏츠 선구매 | 10만원 |

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

---

## 구글 시트 컬럼 구조

### 신청 내역 시트
| 열 | 내용 |
|----|------|
| A | 신청일시 (자동) |
| B | 결제완료일 (수동) |
| C | 이름 (자동) |
| D | 연락처 (자동) |
| E | 지점명 (자동) |
| F | 지점 주소 (자동) |
| G | 빌리투어 URL (자동) |
| H | 영상 제목 (자동, 유튜브 크롤링) |
| I | 채널명 (자동, 유튜브 크롤링) |
| J | 상품 선택 (자동) |
| K | 촬영 전달사항 (자동) |
| L | 결제링크 발송 드롭박스 — `발송대기`/`발송하기`/`발송완료` |
| M | 발송시간 (자동) |

**L열 발송 로직 (절대 규칙):**
- 신청 접수 → `발송대기`
- `발송하기` 선택 → 알림톡 발송 후 `발송완료`
- 발송완료 후 재선택해도 재발송 안 됨

### 작업 내역 시트 (제작 관리)
신청 시 자동으로 행 생성됨. 제작 진행을 추적.

| 열 | 내용 | 입력 |
|----|------|------|
| A | 신청일시 | 자동 |
| B | 이름 | 자동 |
| C | 연락처 | 자동 |
| D | 지점명 | 자동 |
| E | 지점 주소 | 자동 |
| F | 상품 (글로벌재구매/숏츠단건) | 자동 |
| G | 빌리투어 URL | 자동 |
| H | 작업 상태 (대기/촬영/편집/업로드/완료) | 드롭박스 |
| I | 결과물 URL (유튜브/숏츠 링크) | 수동 |
| J | 완료일 | 수동 |
| K | 완료알림 발송 — `발송대기`/`발송하기`/`발송완료` | 드롭박스 |
| L | 발송시간 | 자동 |

**K열 완료알림 로직 (절대 규칙):**
- `발송하기` 선택 → **I(결과물URL) + J(완료일) 둘 다 입력된 경우만** 완료 알림톡 발송 후 `발송완료`
- 미입력 시 → `발송대기`로 자동 복귀
- J열(발송시간) 기록 후 재선택해도 재발송 안 됨

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
