var elice = 'https://accounts.elice.io'

describe('inportant', () => {
  // 1. 앱 로드가 정상적으로 되어야 한다.
  // 단순 사이트 접속으로만 테스트 하였습니다.
  it('connect', () => {
    cy.visit(elice);
  });

  // 2. 한영변환이 잘되어야한다.
  // 하단에 있는 언어 버튼을 눌렀을 때 링크에 포함 되어있는 lang을 이용해서 판단하였습니다.
  it('change language', () => {
    cy.visit(elice);
    
    // 영어
    cy.get(`[aria-label="Change Languages"]`).select('English');
    cy.url().should('include', 'lang=en');
    
    // 한글
    cy.get(`[aria-label="Change Languages"]`).select('한국어');
    cy.url().should('include', 'lang=ko');
  });

  // 3. 로그인하지 않았을때 로그인 페이지로 이동되어야한다.
  // 4. 로그인하였을때는 account 설정페이지로 이동되어야 한다.
  // 사이트 접속시에 나오는 로그에서 로그인 유무에 따라 401 응답 상태 코드를 확인할 수 있었습니다.
  // 이를 이용해 조건문으로 구분해 로그인 페이지와 account 설정페이지로 이동하는지 판단하였습니다.
  // #이 들어간 부분에는 실제 아이디를 입력하여 사용하였습니다.
  it('login check', () => {
    cy.intercept('POST', 'https://api-account.elice.io/logout').as('logStatus');

    cy.visit(elice);

    // 로그인 테스트 용
    cy.get('input[name="loginId"]').type('# 아이디');
    cy.get('input[name="password"]').type('# 비밀번호');
    cy.contains('로그인').click();

    cy.wait('@logStatus').then((answerCode) => {

    const response = answerCode.response;
      // 401 응답 상태 코드가 떴을 때(로그아웃 상태일 때)
      if (response.statusCode === 401) {
        cy.url().should('include', 'https://accounts.elice.io/accounts/signin/me');
      }

      // 401 응답 상태 코드가 안 떴을 때(로그인 상태일 때)
      else {
        cy.url().should('include', 'https://accounts.elice.io/members/account');
      }
    });
  });

  // 이 이후부터는 제가 추가적으로 실행한 테스트입니다.

  // 아이디 유효성 검사
  // #이 들어간 부분에는 실제 아이디를 입력하여 사용하였습니다.
  it('account check', () => {
    cy.visit(elice);

    cy.get('input[name="loginId"]').type('# 잘못된 아이디');

    cy.get('input[name="loginId"]').should('have.attr', 'aria-describedby', 'mui-1-helper-text');

    cy.get('input[name="loginId"]').clear();

    cy.get('input[name="loginId"]').type('# 올바른 아이디');

    cy.get('input[name="loginId"]').should('not.have.attr', 'aria-describedby');
  });

  // 비밀번호 모자이크 검사
  it('secret check', () => {
    cy.visit(elice);

    cy.get('input[name="password"]').type('qwerasdf');

    cy.get('input[name="password"]').should('have.attr', 'type', 'password');

    cy.get('[aria-label="비밀번호 보기"]').click();

    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
  });

  // 더보기 검사
  it('more check', () => {
    cy.visit(elice);

    cy.contains('더보기').click();

    cy.get('.css-1g0968k.ew0ch971.account--shared--social-button-enter-done').should('exist');

    cy.contains('접기').click();

    cy.get('.css-1g0968k.ew0ch971.account--shared--social-button-enter-done').should('not.exist');
  });
});
  