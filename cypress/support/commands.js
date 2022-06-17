// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//----------------------------------------------------------------------------
//Comandos personalizados: Seção8 aula commands
Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

//----------------------------------------------------------------------------
//impor page objects:
import elements from './locators.js'

//Comando para fazer login: Seção 09
Cypress.Commands.add('login', (email, senha) => {
    cy.get(elements.LOGIN.USER).type(email)
    cy.get(elements.LOGIN.PASSWORD).type(senha);
    cy.get(elements.LOGIN.BTN_LOGIN).click();
    cy.get(elements.MESSAGE).should('contain', 'Bem vindo');
});

Cypress.Commands.add('resetApp', () => {
    cy.get(elements.MENU.SETTINGS).click();
    cy.get(elements.MENU.RESET).click();
});

//Metodo para retornar o tokem da requisição de login
Cypress.Commands.add('getToken', (user, passwd) => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            email: user,
            senha: passwd,
            redirecionar: false
        }
    }).its('body.token').should('not.be.empty') //.then(resp => console.log(resp));
        //Obtem o tokem a partir do login: Faz o POST de uma nova conta
        .then(token => {
            return token;
        })
});

Cypress.Commands.add('resetRest', (token) => {
    cy.request({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/reset',
        headers: { Authorization: `JWT ${token}` }
    }).its('status').should('be.equal', 200)
        .log('Reset bank ok!')
})