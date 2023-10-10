# elice_miniProject

해당 프로젝트는 엘리스 로그인 페이지에서
가능한 기능들에 대한 자동화 검사를 cypress를 통해 제작하였습니다.

1. 앱 로드가 정상적으로 되어야 한다.
2. 한영변환이 잘되어야한다.
3. 로그인하지 않았을때 로그인 페이지로 이동되어야한다.
4. 로그인하였을때는 account 설정페이지로 이동되어야 한다.

그 외에

- 아이디 유효성 검사
- 비밀번호 가리기 검사
- 비밀번호 찾기 페이지
- 회원가입 페이지
- 외부 계정 연동 버튼
- 더보기 버튼
- 하단(footer) 버튼

등을 진행하였습니다.

부족한 점으로는
* github에 연동은 하였으나 별다른 기능은 사용하지 않았고 CI 구축을 못하였습니다
* 새 창이 새 탭이 열리는 경우 동작에 대한 검사를 진행하지 못하였습니다.
* 테스트에 사용할 계정 없이 로그인과 로그아웃 상태를 구분하여 테스트를 진행 하도록 하지 못하였습니다.