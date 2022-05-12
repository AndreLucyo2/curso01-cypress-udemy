///<reference types = "cypress"/>

describe('Work with iframes', () => {

    //Executa uma vez antes de cada test
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    //Executa antes de cada teste
    beforeEach(() => {
        //Recarregar a pagina
        cy.reload()
    });

    //Interagindo com componente externo á pagina
    it.only('Deve preencher o campo com texto iframe externo', () => {

        //Obtem o frame que contem o elemento externo
        cy.get('#frame1').then(iframe => {
            //Guarda o contexto em uma variavel
            const body = iframe.contents().find('body')

            //Faz o acert:
            cy.wrap(body).find('#tfield')
                .type('Funcionou!')
                .should('have.value', 'Funcionou!')
        })

    });


});