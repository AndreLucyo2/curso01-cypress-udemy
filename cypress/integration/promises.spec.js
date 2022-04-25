it('sem testes ainda', () => { });

//-----------------------------------------------
// const getSomething = () => {
//     setTimeout(() => {
//         console.log('respondendo...');
//         return 11;
//     }, 1000)
// }

// const system = () => {
//     console.log('Init');
//     const something = getSomething();
//     console.log(`Somthing is ${something}`)
//     console.log('end')
// }

// system()

// const getSomething = (callback) => {
//     setTimeout(() => {
//         callback(12);
//     }, 1000)
// }

// const system = () => {
//     console.log('init');
//     //executa de forma assincrona:
//     getSomething(some => console.log(`Something is ${some}`));
//     console.log('end')
// }

// system();

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
}

const system = () => {
    console.log('init');
    const prom = getSomething();
    prom.then(some => {
        console.log(`Something is ${some}`)
        console.log('end');
    })
}

system();




