describe("Cadastro de usuarios alura pic", () => {
  beforeEach(() => {
    cy.visit("https://alura-fotos.herokuapp.com");
  });

  it("Veriricar mensagens de validacao", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Email is required").should("be.visible");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "User name is required!").should("be.visible");
    cy.contains("ap-vmessage", "Password is required!").should("be.visible");
    cy.contains("ap-vmessage", "Full name is required!").should("be.visible");
  });

  it("Veriricar mensagens de email invalido", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="email"').type("rafael");
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("Veriricar mensagens de password invalido", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="password"').type("1234");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
  });

  it("Veriricar mensagem de que o nome do usuario deve ser minusculo", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="userName"').type("RAFAEL");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Must be lower case").should("be.visible");
  });

  const usuarios = require("../../fixtures/usuarios.json");

  usuarios.forEach((usuario) => {
    it(`Registra novo usuário: ${usuario.userName}`, () => {
      cy.registrarUsuario(
        usuario.email,
        usuario.fullName,
        usuario.userName,
        usuario.password
      );
      cy.contains("a", "Please, login!").click();
    });
  });
});
