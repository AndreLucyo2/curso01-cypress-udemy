///<reference types = "cypress"/>

describe('Work with popup', () => {

    //Interagindo com popup externo á pagina
    it('Deve popup diretamente', () => {

        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.get('#otherButton').click()

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })

    });

    it('Deve verificar se o popup foi envocado', () => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')

        //Mocar o evento da window
        cy.window().then(win => {
            //Criar o evento e dar um alias
            cy.stub(win, 'open').as('winOpen')
        })

        cy.get('#buttonPopUp').click()

        //Obtem o evendo alias, e faz o acerto para ver se o evento foi chamado
        cy.get('@winOpen').should('be.called')

    });

    //Teste com pagina sendo carregada em outra aba
    describe.only('With links', () => {

        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        //Validar se esta apontando para a url correta
        it('Check popup url', () => {

            //Validar se possui a url:
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')

        });

        //Acessar a popup dinamicamente, valida a pagina
        it('Should access popup dinamically', () => {

            //Obtem uma url dinamicamente
            //Este metodo é util quando o link não é fixo, e nao se sabe o link no momento
            //Encontra o elemento que redireciona para a outra pagina e obtem o link
            cy.contains('Popup2').then($a => {

                //Obtem a propriedade href que possui o link
                const href = $a.prop('href')

                //printa o link para conferir
                cy.log(href)

                //manda visitar a pagina
                cy.visit(href)
                cy.get('#tfield').type('Funcionou!')
            })
        });

        //força abrir popup na mesma pagina, remove o atributo target
        //facilita o teste com cypress
        it('Should force link on same page', () => {

            //Remove o atributo target forçando a abrir na mesma pagina
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()

            //manda o texto
            cy.get('#tfield').type('Funcionou!')
        });

    });



});