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

    it('Alert com mock', () => {

        //Criar um mock do alerta
        const stub = cy.stub().as('Alerta')
        //Injeta o mock
        cy.on('window:alert', stub)
        //Faz o acert     
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })

    });

    //CxMsg de Confirmação
    it('Confirm', () => {

        //PREPARAR OS EVENTOS:
        // Obtem a msg do confirm
        cy.on('window:confirm', msg => {
            console.log(msg)
            //Cria um acert para comparar a mensagem esperada
            expect(msg).to.be.equal('Confirm Simples')
        })

        //Validar se foi confirmado
        cy.on('window:alert', msg => {
            console.log(msg)
            //Depois que confirmou deve aparecer a msg confirmado
            expect(msg).to.be.equal('Confirmado')
        })
        
        //Clicar para aparecer o confirm
        cy.get('#confirm').click()

    });

    //CxMsg de clicando em cancelar
    it.only('Cancelado', () => {

        //PREPARAR OS EVENTOS:
        // Obtem a msg do confirm
        cy.on('window:confirm', msg => {
            console.log(msg)
            //Cria um acert para comparar a mensagem esperada
            expect(msg).to.be.equal('Confirm Simples')
            //o usuario cancelou
            return false   
        })

        //Validar se foi confirmado
        cy.on('window:alert', msg => {
            console.log(msg)
            //Depois que confirmou deve aparecer a msg negado
            expect(msg).to.be.equal('Negado')
        })
        
        //Clicar para aparecer o confirm
        cy.get('#confirm').click()

    });

});