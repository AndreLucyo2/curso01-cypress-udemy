///<reference types = "cypress"/>

describe('Work with iframes', () => {

    //Interagindo com componente externo á pagina
    it('Deve preencher o campo com texto no iframe externo', () => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        //Obtem elementos dentro do escopo do iframe
        cy.get('#frame1').then(iframe => {
            //Guarda o contexto em uma variavel
            const body = iframe.contents().find('body')

            //Faz o acert:
            cy.wrap(body).find('#tfield')
                .type('Funcionou!')
                .should('have.value', 'Funcionou!')
        })

    });

    //Interagindo com componente externo á pagina
    it('Deve iframe diretamente', () => {

        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Click OK!')
        })
        
        cy.get('#otherButton').click()
    });


});