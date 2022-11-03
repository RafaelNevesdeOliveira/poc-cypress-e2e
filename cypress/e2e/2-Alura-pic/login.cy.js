describe("Login de usuarios alura pic", () => {
    beforeEach(() => {
      cy.visit("https://alura-fotos.herokuapp.com");

      cy.intercept('POST', 'https://apialurapic.herokuapp.com/user/login', {
        statusCode: 400,
      }).as('stubPost')
    });
  
      //.only para realizar apenas os testes com essa tag
  it("Fazer login de usuario valido", () => {
    cy.login(Cypress.env("userName"), Cypress.env("password"));
    // interceptou a requisicao para verificar a resposta e etc
    cy.wait('@stubPost')
    cy.contains("a", "(Logout)").should("be.visible");
  });
  //.only para realizar apenas os testes com essa tag
  it("Fazer login de usuario invalido", () => {
    cy.login("rafaek", "123123");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });

  
  });
  