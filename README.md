# MEDI-HELP 프로젝트 개발 계획

## 📌 프로젝트 소개
복용 중인 약을 효과적으로 관리하고 사용자 간 경험을 공유할 수 있는 종합 디지털 헬스케어 플랫폼

## 🎯 프로젝트 목표
사용자 중심의 정확한 약물 정보 제공과 맞춤형 복용 관리 시스템을 구축하여, 개인의 건강 관리를 돕고 사용자 간 경험 공유를 촉진하는 종합적인 디지털 헬스케어 플랫폼을 구현한다.

## 🛠 개발 환경
- React + Vite
- Redux (상태관리)
- Firebase (백엔드/데이터베이스)
- Tailwind CSS (스타일링)


## 📋 단계별 개발 계획

### 1단계: 초기 설정 & 환경 구성 (1주)
- 프로젝트 구조 셋업
- Redux 설정
 - store 구성
 - reducer 설계
 - action 타입 정의
- Firebase 초기 설정
- 공통 컴포넌트 개발
- 기본 레이아웃 구성

### 2단계: 인증 시스템 구현 (2주)
- Firebase Authentication 설정
- 일반 로그인/회원가입
- 소셜 로그인 구현
  - Google 로그인
  - 기타 소셜 로그인 (카카오/네이버)
- Redux로 로그인 상태 관리
- 보호된 라우트 설정

### 3단계: 약 검색 기능 (2주)
- 공공 API 연동 설정
- 검색 기능 구현
- 검색 결과 표시
- 약품 상세 정보 페이지
- 최근 검색어 저장 (Redux)
- 즐겨찾기 기능 (Firebase)

### 4단계: 캘린더 & 알람 구현 (2주)
- 캘린더 UI 개발
- 일정 CRUD
- Firebase로 일정 데이터 관리
- 알람 설정 기능
- Redux로 알람 상태 관리

### 5단계: 커뮤니티 기능 (2주)
- Firebase Firestore로 게시판 구현
- 게시글 CRUD
- 댓글 시스템
- 이미지 업로드 (Firebase Storage)
- 좋아요/북마크 기능

### 6단계: 부가 기능 개발 (1.5주)

- 뉴스 페이지
  - 뉴스 API 연동
  - 북마크 기능
- 마이페이지
  - 사용자 정보 관리
  - 활동 내역 조회
- 설정 페이지

### 7단계: 테스트 및 최적화 (1주)
- 전체 기능 테스트
- 성능 최적화
- 코드 리팩토링
- 배포 준비

## 📚 주요 라이브러리

- redux (상태관리)
- react-redux
- firebase
- axios (API 통신)
- react-calendar / @fullcalendar/react
- tailwindcss

## 📱 주요 페이지
- 홈(메인)
- 약 검색
- 커뮤니티
- 뉴스
- 캘린더 (알람 기능 포함)
- 마이페이지
- 로그인/회원가입

## ⏰ 예상 개발 기간
총 11.5주 (약 3개월)

## 🔍 참고사항
- 공공 API를 활용한 약품 정보 데이터베이스 구축
- Firebase를 활용한 서버리스 아키텍처 구현
- 반응형 웹 디자인 적용

## 폴더 구조
MEDI-HELP/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.js
│   │   │   └── SignUpForm.js
│   │   ├── calendar/
│   │   ├── common/
│   │   ├── drugSearch/
│   │   ├── community/
│   │   ├── home/
│   │   └── mypage/
│   ├── news/
│   ├── firebase/
│   │   └── firebase.js
│   ├── hooks/
│   ├── pages/
│   │   ├── Calendar.jsx
│   │   ├── Community.jsx
│   │   ├── DrugSearch.jsx
│   │   ├── Home.jsx
│   │   ├── MyPage.jsx
│   │   └── News.jsx
│   ├── redux/
│   │   ├── actions/
│   │   │   └── authActions.js
│   │   ├── reducer/
│   │   │   ├── communityReducer.js
│   │   │   ├── drugSearchReducer.js
│   │   │   └── rootReducer.js
│   │   ├── actions.js
│   │   └── store.js
│   └── utils/
├── App.css
├── App.js
├── index.css
├── main.js
├── eslintrc.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
