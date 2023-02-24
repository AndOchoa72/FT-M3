const colors = require('colors');

const levelOne = (a, b) => {
    return (a + b);
};

const levelTwo = (letras) => {
    let miLet = '';
    for (i=0; i < letras.length; i += 2) {
        miLet += letras[i];
    };
    return miLet;
};
    
const levelThree = (a, b) => {
    return([...a, ...b].sort())
};

const levelFour = (num) => {
    const string = num.toString().split('');
    const suma = string.reduce((acum, m) => Number(acum) + Number(m), 0);
    const sumaConvert = suma.toString().split('').reverse().join('');
    return suma * Number(sumaConvert) === num;
};

module.exports = { levelOne, levelTwo, levelThree, levelFour };
