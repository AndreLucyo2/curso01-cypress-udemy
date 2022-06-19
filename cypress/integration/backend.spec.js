
///<reference types = "cypress"/>
import { random } from "lodash";

describe('Sholud test at a functional level', () => {

    //Guardar o token para usar em mais testes
    let token;

    //Antes de executar o teste, ele recupera o token
    before(() => {

        //Guarda o tokem de forma assincrona, pois é uma promisses
        // cy.cmdGetToken("andre.lucyo2@gmail.com", "123456").then(tkn => {
        //     token = tkn;
        // })

        //Recupera o token utilizando dados de acesso oculto no cypress.env.json
        cy.cmdGetTokenOculto().then(tkn => {
            token = tkn;
        })

    });

    beforeEach(() => {
        //Reseta dados do usuario:
        cy.cmdResetRest(token);
    });

    it('Create an account', () => {

        //Arrange:
        const fakeNomeConta = 'Conta criada pela api REST_01'

        //Act:
        //Adiciona uma nova conta pelo backend:
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: fakeNomeConta
            }
        }).as('response');//Adicionado um nome para o retorno para usar mais para frente nos testes

        //Asserts:
        cy.get('@response').then(resp => {
            cy.log(resp);

            //Testa se retornou sucesso:
            expect(resp.status).to.be.equals(201);
            //Testa se no body contem a propriedade chamada id
            expect(resp.body).to.have.property('id');
            //Testa se no body contem a propriedade chamada nome com o nome da conta criada
            expect(resp.body).to.have.property('nome', fakeNomeConta);

        })

    });

    it('Update a account', () => {

        //Arrange:
        const fakeNomeConta = 'Conta criada pela api REST - ' + random(0, 100);
        const fakeNomeContaEditada = 'Conta alterada via api REST - ' + random(0, 100);

        //Cria uma nova conta:
        cy.cmdAddAccount(fakeNomeConta).then(obj => {

            //Act 
            //Faz o update:
            cy.request({
                url: Cypress.config().baseApiUrl + '/contas/' + obj.id,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: fakeNomeContaEditada
                }
            }).as('response');

        });

        //Asserts:
        cy.get('@response').its('status').should('be.equal', 200);

        //fazer uma consulta pelo nome da conta altera: 
        cy.request({

            method: 'GET',
            url: Cypress.config().baseApiUrl + '/contas',
            headers: { Authorization: `JWT ${token}` },
            //refinamento da consulta na api: queryString
            qs: {
                nome: fakeNomeContaEditada
            }

        }).then(resp => {
            expect(resp.body[0].nome).to.be.equals(fakeNomeContaEditada);
        })
    });

    it('Should not create an account with same name', () => {
        //Arrange:
        const fakeNomeConta1 = 'Conta criada pela api RESTxxxx - ' + random(0, 100000);
        //Cria uma nova conta:
        cy.cmdAddAccount(fakeNomeConta1);

        //Act:
        //Tentar criar uma conta com o mesmo nome
        cy.request({
            url: Cypress.config().baseApiUrl + '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: fakeNomeConta1
            },
            failOnStatusCode: false
        }).as('response')

        //Asserts:        
        cy.get('@response').then(resp => {
            //console.log(resp);
            expect(resp.status).to.be.equal(400);
            expect(resp.body.error).to.be.equal('Já existe uma conta com esse nome!');
        });

    });

    //foramtar datas em js: https://blog.betrybe.com/javascript/javascript-date-format/
    //ref: https://www.devmedia.com.br/javascript-date-trabalhando-com-data-e-hora/40649
    it('Should create a transaction', () => {
        //Arrange:
        //Cria uma data formatada:
        let data = new Date();
        let dataPagtoTransact = (adicionaZero(data.getDate())) + "/" + (adicionaZero(data.getMonth() + 1)) + "/" + data.getFullYear();
        let dataPagtoFormatada = (adicionaZero(data.getDate() + 1)) + "/" + (adicionaZero(data.getMonth() + 1)) + "/" + data.getFullYear();

        //Cria uma conta:
        const fakeNomeConta = 'Conta criada para transações - ' + random(0, 100000);
        cy.cmdAddAccount(fakeNomeConta);

        //Act:
        //Adiciona a transação
        cy.getContaByName(fakeNomeConta).then(obj => {
            //console.log(obj);
            cy.request({
                url: Cypress.config().baseApiUrl + '/transacoes',
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    conta_id: obj.id,
                    data_pagamento: dataPagtoFormatada,
                    data_transacao: dataPagtoTransact,
                    descricao: "Aluguel do mes de maio",
                    envolvido: "Seu Barriga",
                    status: true,
                    tipo: "REC",
                    valor: "1560"
                }
            }).as('response');
        })


        //Asserts:
        cy.get('@response').its('status').should('be.equal', 201);
        //Valida se recebeu o id:
        cy.get('@response').its('body.id').should('exist');

    });

    it.only('Should get balance', () => {
        //Arrange:
        cy.request({
            url: Cypress.config().baseApiUrl + '/saldo',
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },

        }).then(resp => {
            console.log(resp)

            let saldoConta = null;
            //Percorre o array do body e pega o salda conta de saldo:
            resp.body.forEach(element => {
                if (element.conta === 'Conta para saldo') {
                    saldoConta = element.saldo;
                }
            });
            
            //checa o valor:
            expect(saldoConta).to.be.equal('534.00')

        });

        //Act:

        //Asserts: 
    });

    it('Should remove a transaction', () => {
        //Arrange:

        //Act:

        //Asserts:
    });

})

//Adiciona zero em data: recebe 1 retornar 01
//ref: https://blog.betrybe.com/javascript/javascript-date-format/
function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return numero;
}