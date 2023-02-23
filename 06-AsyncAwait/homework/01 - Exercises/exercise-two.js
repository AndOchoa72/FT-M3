"use strict";
//const colors = require("colors");

let exerciseUtils = require("./utils");
let eU = exerciseUtils;

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC,
  problemDx: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

// async function problemA() {
//   // callback version
//   exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
//     exerciseUtils.blue(stanza);
//   });
//   exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza) {
//     exerciseUtils.blue(stanza);
//   });
// }

  // async await version
  // Tu código acá:

async function problemA() {
  stas = await Promise.allSettled([
      eU.promisifiedReadFile("poem-two/stanza-01.txt"),
      eU.promisifiedReadFile("poem-two/stanza-02.txt")
    ]);
  stas.forEach((sta) => blue(sta));
  blue('done');
}

async function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
//   filenames.forEach((filename) => {
//     exerciseUtils.readFile(filename, function (err, stanza) {
//       exerciseUtils.blue(stanza);
//     });
//   });
// }

  // async await version
  // Tu código acá:
//  let promArr = [];
//  console.log(4);
//  console.log(JSON.stringify(filenames));
//  console.log("filenames.length: " + filenames.length);
//  console.log(promArr);

//  const pA = await Promise.allSettled(filenames.map(
  const pA = await Promise.all(filenames.map(
    sta => eU.promisifiedReadFile(sta)));
  pA.forEach(p => {blue(p)});      // Falla mostrando objeto
//  pA.forEach(p => {blue(p.value)});// Falla espera undefined recibe 'done'
//  for (p of pA) {blue(p)};         // Ok.
//  for (p of pA) {blue(p.value)};     // Ok.

  console.log('done');
}

async function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

//  console.log('Entramos en ProblemC'.bgMagenta);
//  for (file of filenames) {console.log(file)};
  // callback version
//  filenames.forEach((filename) => {
//    exerciseUtils.readFile(filename, function (err, stanza) {
//      exerciseUtils.blue(stanza);
//    });
//  });
  for (const file of filenames) {
    const stanza = await exerciseUtils.promisifiedReadFile(file)
    exerciseUtils.blue(stanza)
  };
  console.log("done");
//  console.log('Salimos de ProblemC'.bgMagenta);
}

  // async await version
  // Tu código acá:

async function problemD() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  // filenames.forEach((filename) => {
  //   exerciseUtils.readFile(filename, function (err, stanza) {
  //     exerciseUtils.blue(stanza);
  //     if (err) exerciseUtils.magenta(new Error(err));
  //   });
  // });

//  console.log('Entramos en ProblemD'.bgGreen);
  // async await version
  try {
    for (const file of filenames) {
      const stanza = await exerciseUtils.promisifiedReadFile(file)
      exerciseUtils.blue(stanza);
    }
  } catch (err) {
    exerciseUtils.magenta(err);
  } finally {
    console.log("done");
  };

}

  // async await version
  // Tu código acá:

