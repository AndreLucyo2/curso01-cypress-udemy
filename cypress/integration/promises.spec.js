it('sem testes ainda', () => { });

//-----------------------------------------------
const getSomething = () => {
    setTimeout(() => {
        console.log('respondendo...');
        return 11;
    }, 1000)
}

const system = () => {
    console.log('Init');
    const something = getSomething();
    console.log(`Somthing is ${something}`)
    console.log('end')
}

system()