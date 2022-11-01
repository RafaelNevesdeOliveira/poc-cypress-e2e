describe('Login e registro de usuarios alura pic', ()=>{
    beforeEach(()=>{
    cy.visit("https://alura-fotos.herokuapp.com")
    })

    //.only para realizar apenas os testes com essa tag
    it('Fazer login de usuario valido', () =>{
        cy.login('flavio', '123')
        cy.contains('a', '(Logout)').should('be.visible');
    })
    //.only para realizar apenas os testes com essa tag
    it('Fazer login de usuario invalido', () =>{
        cy.login('rafaek', '123123')
        cy.on('window:alert', (str =>{
            expect(str).to.equal('Invalid user name or password')
        }))
    })


    it('Veriricar mensagens de validacao', () =>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
    })
    it('Veriricar mensagens de email invalido', () =>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"').type('rafael')
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it('Veriricar mensagens de password invalido', () =>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"').type('1234')
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
    })

    it('Veriricar mensagem de que o n ome do usuario deve ser minusculo', () =>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"').type('RAFAEL')
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
    })

    it('Registrar usuario', ()=>{
        cy.registrarUsuario('teste@teste.com.br', 'Rafaelm', 'rafaelm', '12345678')
        cy.contains('a', 'Please, login!').click();
   
    })
} )