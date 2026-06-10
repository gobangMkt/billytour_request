# 빌리투어 상품화

## 개요

U사장님 브랜드 **빌리투어 상품화 이벤트**의 랜딩페이지 + 신청폼. 고방(고시원·원룸 임대) 기존 사장님 대상 글로벌 재구매(40만) / 숏츠 단건(10만) 이벤트 신청을 받고, 신청→제작→완료까지 구글 시트로 운영한다.

## 코어

### 핵심 기능

- **신청 폼**(`index.html`): 빌리투어 영상 링크 입력 → 지점 자동 검증(`resolvePlace`) → 상품 선택 → 제출
- **랜딩페이지**(`landing/`): 상품·오퍼 소개 + 신청 폼 유입
- **백엔드**(`gas-code/Code.gs`): 신청 내역 + 작업 내역 동시 기록, 토스 결제링크/완료 알림톡 발송
- **크롤러**(`gas-crawler/`): @RoomTour 유튜브 영상 → 지점 URL 매핑 시트 자동 생성 (지점 검증 1순위 소스)
- **CRM 워크플로우**(`gas-crm/`, `채널톡_워크플로우/`): 원장 마스터 × 영상 매칭 확인 시트, 업로드일 2년 기준 세그먼트 분리 + 휴대폰 중복색 표기, 채널톡 캠페인 자료

### 기술 스택

- **신청 폼**: 순수 HTML + Vanilla JS
- **랜딩**: React 18 (CDN) + Babel Standalone (빌드 없음)
- **백엔드**: Google Apps Script (GAS) + 구글 시트, **SOLAPI** 알림톡
- **결제**: 토스페이먼츠 결제링크
- **폰트**: Pretendard (Google Fonts CDN)

### 주요 데이터 흐름

```
신청 폼 → resolvePlace (유튜브 URL → 크롤링 시트 lookup → YouTube API 폴백 → 고방 페이지 스크래핑)
       → 지점명·주소 자동채움
       → submitForm → 구글 시트(신청 내역 + 작업 내역) 동시 기록
신청 내역 J열: 발송대기/발송하기/발송완료 → 토스 결제링크 알림톡 (상품별 자동 매칭)
작업 내역 J열: 결과물 URL + 완료일 입력 시에만 완료 알림톡 발송
```

> `gas-code`·`gas-crawler`·`gas-crm`은 **서로 다른 스프레드시트에 바인딩된 별개 GAS**(gas-crm은 원장 마스터 `14BZWlMB…`). 각 폴더에서 따로 `clasp push`/`clasp deploy`.
> 시트 이름(`설정`/`신청 내역`/`작업 내역`)·발송 로직은 절대 규칙 — 상세는 `CLAUDE.md` 참조.

## 실행 / 배포 방법

### 로컬 개발

```bash
# 랜딩
cd landing && node server.js    # 또는 "랜딩페이지 열기.bat"
# → http://localhost:5600

# 신청 폼: index.html을 브라우저에서 직접 열기 또는 Live Server
```

### 배포

| 대상 | 방법 |
|------|------|
| 신청 폼 | `git push origin main` → GitHub Pages 자동 반영 |
| 랜딩페이지 | `cd landing && npx vercel --prod` |
| GAS (신청폼/크롤러/CRM) | 각 폴더에서 `clasp push` → `clasp deploy` (CRM은 시트 `CRM` 메뉴로 실행) |

### 시크릿 / 설정

- **GAS_URL**: `index.html` 내 변수. GAS 재배포 시 갱신 필요.
- **YT_API_KEY**: GAS Script Property에 등록(미설정 시 크롤링 시트에 있는 영상만 검증 가능). 값은 본 문서에 기재하지 않음.
- **토스 결제링크**: GAS `Code.gs`의 `PAY_LINK_GLOBAL`/`PAY_LINK_SHORTS` 상수. 교체 시 양쪽 동기화.
- 스프레드시트 ID·스크립트 ID·SOLAPI 키는 GAS 프로젝트/Script Property에 귀속. 값 미기재.

## 배포링크

| 대상 | URL |
|------|-----|
| 신청 폼 | https://gobangmkt.github.io/billytour_request/ |
| 랜딩페이지 | https://landing-nf1.vercel.app (Vercel, `cd landing && npx vercel --prod`) |
| GitHub repo | https://github.com/gobangMkt/billytour_request |
