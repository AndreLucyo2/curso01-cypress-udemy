const ms = require("ms");

describe('Esperas...', () => {

    //Executa uma vez antes de cada test
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    //Executa antes de cada teste
    beforeEach(() => {
        //Recarregar a pagina
        cy.reload()
    });

    it('Alert', () => {

        cy.get('#alert').click()

        //Chegar se o alert apareceu
        // 1 - Obtem a msg do alert
        cy.on('window:alert', msg => {
            console.log(msg)
            //Cria um acert para comparar a mensagem esperada
            expect(msg).to.be.equal('Alert Simples')
        })

    });

    it.only('Alert com mock', () => {

        //Criar um mock do alerta
        const stub = cy.stub().as('Alerta') 
        //Injeta o mock
        cy.on('window:alert', stub)   
        //Faz o acert     
        cy.get('#alert').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })

    });

});