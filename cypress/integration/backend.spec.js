
///<reference types = "cypress"/>

describe('Sholud test at a functional level', () => {

    const fakeNomeConta = 'Conta criada - rest_011'

    it('Create an account', () => {

        cy.getToken("andre.lucyo2@gmail.com", "123456").then(token => {
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: fakeNomeConta
                }
            }).as('response');//Adicionado um nome para o retorno para usar mais para frente nos testes
        })

        cy.get('@response').then(resp => {
            //cy.log(resp);

            //Testa se retornou sucesso:
            expect(resp.status).to.be.equals(201);
            //Testa se no body contem a propriedade chamada id
            expect(resp.body).to.have.property('id');
            //Testa se no body contem a propriedade chamada nome com o nome da conta criada
            expect(resp.body).to.have.property('nome', fakeNomeConta);


        })

    });



})