///<reference types = "cypress"/>

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

    it.only('Alert', () => {

        // cy.get('#alert').click()

        // //Chegar se o alert apareceu
        // // 1 - Obtem a msg do alert
        // cy.on('window:alert', msg => {
        //     console.log(msg)
        //     //Cria um acert para comparar a mensagem esperada
        //     expect(msg).to.be.equal('Alert Simples')
        // })

        //Comando personalisado: ver /suport/commands.js
        cy.clickAlert('#alert','Alert Simples')

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
    it('Cancelado', () => {

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

    //CxMsg de que recebe um valor
    it('Prompt', () => {

        //PREPARAR OS EVENTOS:
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })

        //Validar se apareceu o confirm com o valor informado
        cy.on('window:confirm', msg => {
            //Depois que confirmou deve aparecer a msg confirmado
            expect(msg).to.be.equal('Era 42?')
        })

        //Validar se apareceu o alert
        cy.on('window:alert', msg => {
            //Depois que confirmou deve aparecer a msg
            expect(msg).to.be.equal(':D')
        })

        //Clicar para disparar o evento do prompt
        cy.get('#prompt').click()

    });

    //----------------------------------------------------------
    //Desafio:
    //----------------------------------------------------------
    //TODO - Acessar a pagina com o form vazio
    //TODO - Clicar em cadastrar
    //TODO - Validar a msg do alert 
    //TODO - Preencher o campo nome
    //TODO - Clicar em cadastrar
    //TODO - Validar a msg do alert
    //TODO - Preencher o campo sobrenome
    //TODO - Clicar em cadastrar
    //TODO - Validar a msg do alert
    //TODO - Informar o sexo: Masculino
    //TODO - Clicar em cadastrar
    //TODO - Validar a msg do alert
    //TODO - Validar se foi cadastrada com sucesso!

    //----------------------------------------------------------
    //Resolvendo:
    //----------------------------------------------------------
    it('Validando mensagens Desafio', () => {


        //Criar stub do alerta
        const stub = cy.stub().as('Alerta')

        //Quando ocorrer o evento alert, chama o stub
        cy.on('window:alert', stub)

        //Clicar em cadastrar, faz o acert para ver se o alert veio com a msg esperada:
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            })

        //Preenche o campo nome:
        cy.get('#formNome').type('Andre')

        //Clicar em cadastrar, faz o acert para ver se o alert veio com a msg esperada:
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
            })

        //Preenche o campo sobrenome:
        cy.get('[data-cy="dataSobrenome"]').type('Lucio')

        //Clicar em cadastrar, faz o acert para ver se o alert veio com a msg esperada:
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
            })

        //Seleciona o sexo: masculino
        cy.get('#formSexoMasc').click()

        //Clicar em cadastrar
        cy.get('#formCadastrar').click()

        //Valida se apareceu a informação de cadastrado
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')

    });



});