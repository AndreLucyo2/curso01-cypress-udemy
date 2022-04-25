it('sem testes ainda', () => { });

//-----------------------------------------------
const getSomething = () => 10;
const system = () => {
    console.log('Init');
    const something = getSomething();
    console.log(`Somthing is ${something}`)
    console.log('end')
}

system()