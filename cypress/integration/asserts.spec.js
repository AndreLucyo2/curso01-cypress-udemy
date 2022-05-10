///<reference types = "cypress"/>

it('Equality', () => {
    const a = 1;

    //Checagem de igualdade simples:
    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b');
})

it('Truthy', () => {

    const a = true;
    const b = null;
    let c;

    //Checagem de igualdade boleana
    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;
});

it('Objetct Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    //Checagem de igualdade de objetos:
    expect(obj).equal(obj);
    expect(obj).equals(obj);
    expect(obj).eq(obj);
    expect(obj).to.be.equal(obj);

    //Compara as referencias:
    //expect(obj).to.be.equal({a:1,b:2});

    //confere as propriedades
    expect(obj).to.be.deep.equal({
        a: 1,
        b: 2
    });

    //confere as propriedades
    expect(obj).eql({
        a: 1,
        b: 2
    });

    //Verifica se possui a propriedade com o valor informado
    expect(obj).include({
        a: 1
    });

    //Verifica se possui a propriedade 
    expect(obj).to.have.property('b');

    //Verifica se possui a propriedade com o valor informado
    expect(obj).to.have.property('b', 2);

    //Verifica se o objeto esta vazio
    expect(obj).to.not.be.empty;
    expect({}).to.be.empty;

});

it('Arrays', () => {

    const arr = [1, 2, 3]

    //Espera que o array possua os seguintes membros
    expect(arr).to.have.members([1, 2, 3]);

    //Valida se o array inclui os seguintes membros
    expect(arr).to.include.members([1, 3])

    //Valida se o array esta vazio
    expect(arr).to.not.be.empty

    //Espera que um array vazio esteja vazio
    expect([]).to.be.empty

});

it('Types', () => {
    const num = 1
    const str = 'String'
    //Confere se é um numero
    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')

});

it('String', () => {

    const str = 'String de teste'
    expect(str).to.be.equal('String de teste')

    //Testa se o comprimento do texto
    expect(str).to.have.length(15)

    //Se contem um texto
    expect(str).to.contains('de')

    //Utilizando regex ----------------------
    //testa se contem
    expect(str).to.match(/de/);

    //teste deve inicia com ...
    expect(str).to.match(/^String/);

    //Teste deve termina com...
    expect(str).to.match(/teste$/);

    //testa deve contem numero de caracteres
    expect(str).to.match(/.{15}/);

    //se existem apenas letras
    expect(str).to.match(/\w+/);

    //nao contem  numeros 
    expect(str).to.match(/\D+/);

});

it.only('Numbers', () => {

    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(7)
    expect(floatNumber).to.be.equal(5.2123)

    //testa com precisão 
    expect(floatNumber).to.be.closeTo(5.2, 0.1)

    //valida se é acima de 
    expect(floatNumber).to.be.above(5)

});