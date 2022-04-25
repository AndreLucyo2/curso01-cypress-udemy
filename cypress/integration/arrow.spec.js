it('nada agora', function () { })

// function soma(a, b) {
//     return a + b
// }

// const soma = function (a, b) {
//     return a + b
// }

// const soma = (a, b) => {
//     return a + b
// }

// const soma = (a, b) => a + b;

// const soma = (a) => a + a;

const soma = () => 10 + 5;

console.log(soma(5, 10))

// it('A function teste...', function () {
//     console.log('funtion', this)
// });

it('an arrow teste...', () => {
    console.log('arrow', this)
});