
///<reference types = "cypress"/>

describe('Sholud test at a functional level', () => {

    const fakeNomeConta = 'Conta criada - rest_089'

    it('Create an account', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "andre.lucyo2@gmail.com",
                senha: "123456",
                redirecionar: false
            }
        }).its('body.token').should('not.be.empty') //.then(resp => console.log(resp));
            //Obtem o tokem a partir do login: Faz o POST de uma nova conta
            .then(token => {
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