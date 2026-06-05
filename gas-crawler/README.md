# YouTube 크롤링 - 설명란 정보 추출

## 목표

@RoomTour YouTube 채널의 **모든 영상**(기간 제한 없음) 설명란에 있는
가격정보 URL과 대표번호를 추출해 스프레드시트에 저장한다.

## 추출 대상 데이터

| 항목 | 예시 |
|------|------|
| 💰 가격정보 URL | `https://gobang.kr/place/22591` |
| 📞 대표번호 | `0507-879-3113` |

## 구현 방식

**Google Apps Script + Google Sheets**

- 별도 프로그램 설치 없음
- 구글 스프레드시트 안에서 직접 실행
- 결과가 시트에 바로 저장됨

## 진행 상황

- [x] 방향 결정: Google Apps Script + Google Sheets
- [ ] YouTube Data API v3 키 발급
- [x] Apps Script 코드 작성 (`apps-script.gs`)
- [ ] 실행 및 결과 확인

## API 키 발급 방법

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성
3. API 및 서비스 → 라이브러리 → "YouTube Data API v3" 사용 설정
4. 사용자 인증 정보 → API 키 만들기
5. 생성된 키 복사 (`AIza...` 형식)

> 어떤 구글 계정으로 발급받아도 무관 (채널 소유 계정일 필요 없음)

## 실행 방법

1. 새 Google Sheets 열기
2. 상단 메뉴 → 확장 프로그램 → Apps Script
3. `apps-script.gs` 내용 붙여넣기
4. 상단 `API_KEY = 'YOUR_API_KEY_HERE'` 부분에 발급받은 키 입력
5. `run` 함수 선택 후 실행 버튼 클릭
6. 첫 실행 시 권한 승인 팝업 → 허용

## 출력 시트 컬럼

| 컬럼 | 내용 |
|------|------|
| A | 영상 제목 |
| B | 업로드일 |
| C | 영상 ID |
| D | 영상 링크 |
| E | 가격정보 URL |
| F | 대표번호 |

## 주의사항

- YouTube Data API v3 무료 할당량: **10,000 유닛/일**
  - 검색(search) 1회 = 100 유닛
  - 영상 상세(videos) 1회 = ~1 유닛
  - 영상 500개 기준 약 1,500 유닛 소모 (여유 있음)
- 영상이 매우 많은 경우 할당량 초과 가능 → 하루 나눠 실행
