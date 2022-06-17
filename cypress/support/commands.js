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

//----------------------------------------------------------------------------------
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

//CMD para API ------------------------------------------------------------------------
//Metodo para retornar o tokem da requisição de login
Cypress.Commands.add('cmdGetToken', (user, passwd) => {
    cy.request({
        url: Cypress.config().baseApiUrl + '/signin',
        method: 'POST',
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

//Metodo para retornar o tokem da requisição de login
//Pega os dados de acesso do arquivo interno do cypress ...\cypress.env.json
Cypress.Commands.add('cmdGetTokenOculto', () => {
    cy.request({
        url: Cypress.config().baseApiUrl + '/signin',
        method: 'POST',
        body: {
            email: Cypress.env('User_Email'),
            senha: Cypress.env('User_Password'),
            redirecionar: false
        }
    }).its('body.token').should('not.be.empty') //.then(resp => console.log(resp));
        //Obtem o tokem a partir do login: Faz o POST de uma nova conta
        .then(token => {
            return token;
        })
});

Cypress.Commands.add('cmdResetRest', (token) => {
    cy.request({
        url: Cypress.config().baseApiUrl + '/reset',
        method: 'GET',
        headers: { Authorization: `JWT ${token}` }
    }).its('status').should('be.equal', 200)
        .log('Reset bank ok!')
})

//Adiciona uma nova conta pelo backend:
Cypress.Commands.add('cmdAddAccount', (nomeConta) => {

    cy.cmdGetTokenOculto().then(token => {
        //Cria a conta:
        var obj;
        cy.request({
            url: Cypress.config().baseApiUrl + '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: nomeConta
            }
        }).as('response')
        
        //Valida e retorna o json do obj gerado
        cy.get('@response').then(resp => {
            //console.log(resp.body);
            expect(resp.body.id).not.be.equal(0);            
            return resp.body;
        })  
        cy.log('Conta criada: '+ nomeConta)
        
    })

})
