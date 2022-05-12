///<reference types = "cypress"/>

describe('Work with popup', () => {

    //Interagindo com popup externo á pagina
    it('Deve popup diretamente', () => {

        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.get('#otherButton').click()

        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Click OK!')
        })
        
    });

    it.only('Deve verificar se o popup foi envocado', () => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        //Mocar o evento da window
        cy.window().then(win=>{
            //Criar o evento e dar um alias
            cy.stub(win, 'open').as('winOpen') 
        })

        cy.get('#buttonPopUp').click()

        //Obtem o evendo alias, e faz o acerto para ver se o evento foi chamado
        cy.get('@winOpen').should('be.called')


    });



});