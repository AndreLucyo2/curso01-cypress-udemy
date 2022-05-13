/// <reference types="cypress" />
describe('Dinamic tests', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const food = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    it('Cadastro com comida variada', function() {
        
               //Obtem os dados mokados: busca direto na pasta de fixtures
               cy.fixture('userData').as('usuario').then(() => {

                cy.get('#formNome').type(this.usuario.nome)
                cy.get('#formSobrenome').type(this.usuario.sobrenome)
                cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()

                //cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
                
                //locator com xpatch -- instalar plugin : seção 7 Xpath
                // https://docs.cypress.io/plugins/directory
                // https://github.com/cypress-io/cypress-xpath                
                cy.xpath(`//label[contains(., 'Carne')]/preceding-sibling::input`).click()

                cy.get('#formEscolaridade').select(this.usuario.escolaridade)
                cy.get('#formEsportes').select(this.usuario.esportes)
    
                //Clicar em cadastrar
                cy.get('#formCadastrar').click()
        
                //Valida se apareceu a informação de cadastrado
                cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
    
            })   

    });

})