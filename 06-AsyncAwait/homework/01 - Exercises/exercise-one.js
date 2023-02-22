/*********** Yo explico `exerciseUtils` ********
 *
 * excersiceUtils es una variable que viene de un archivo en este repo
 * El archivo `./utils` esta en este nivel y se llama `utils.js`
 *
 * Este archivo crea un `promisifiedReadFile` - FIJATE EN ÉL!!!
 *
 * Las funciones `blue` y `magenta` para mantener tu código DRY
 *
 ***********************************************/

"use strict";
const colors = require("colors");

let exerciseUtils = require("./utils");
let eU = exerciseUtils;

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  var problem = module.exports["problem" + arg];
  if (problem) problem();
});

//function problemA() {
//  callback version
//  exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
//    console.log("-- A. callback version --");
//    exerciseUtils.blue(stanza);
//  });

//  asyncawait version
//  Tu código acá:
async function problemA() {
  const sta1 = await eU.promisifiedReadFile("poem-one/stanza-01.txt");
  eU.blue(sta1);
};

// function problemB() {
//   // callback version
//   exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza2) {
//     console.log("-- B. callback version (stanza two) --");
//     exerciseUtils.blue(stanza2);
//   });
//   exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
//     console.log("-- B. callback version (stanza three) --");
//     exerciseUtils.blue(stanza3);
//   });

  // asyncawait version
  // Tu código acá:
function problemB() {
  async function myAsyncFunc(myFile) {
    eU.blue(await eU.promisifiedReadFile(myFile));
  };
  myAsyncFunc("poem-one/stanza-02.txt");
  myAsyncFunc("poem-one/stanza-03.txt");
}

// function problemC() {
//   // callback version
//   exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza2) {
//     console.log("-- C. callback version (stanza two) --");
//     exerciseUtils.blue(stanza2);
//     exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
//       console.log("-- C. callback version (stanza three) --");
//       exerciseUtils.blue(stanza3);
//       console.log("-- C. callback version done --");
//     });
//   });
// }

  // asyncawait version
  // Tu código acá:
async function problemC() {
  eU.blue(await eU.promisifiedReadFile("poem-one/stanza-02.txt"));
  eU.blue(await eU.promisifiedReadFile("poem-one/stanza-03.txt"));
  console.log('done');
}

// function problemD() {
//   // callback version
//   exerciseUtils.readFile(
//     "poem-one/wrong-file-name.txt",
//     function (err, stanza4) {
//       console.log("-- D. callback version (stanza four) --");
//       if (err) exerciseUtils.magenta(new Error(err));
//       else exerciseUtils.blue(stanza4);
//     }
//   );
//   };

  // asyncawait version
  // try {

  // } catch (err) {
  // };
  // Tu código acá:
async function problemD() {
  try {
    eU.blue( await eU.promisifiedReadFile("poem-one/stanza-04.txt"));
  } catch (err) {
    eU.magenta(new Error(err));
  };
}

// function problemE() {
//   // callback version
//   exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
//     console.log("-- E. callback version (stanza three) --");
//     if (err) return exerciseUtils.magenta(new Error(err));
//     exerciseUtils.blue(stanza3);
//     exerciseUtils.readFile(
//       "poem-one/wrong-file-name.txt",
//       function (err2, stanza4) {
//         console.log("-- E. callback version (stanza four) --");
//         if (err2) return exerciseUtils.magenta(err2);
//         exerciseUtils.blue(stanza4);
//       }
//     );
//   });
// }

  // asyncawait version
  // Tu código acá:
async function problemE() {
  try {
    eU.blue(await eU.promisifiedReadFile("poem-one/stanza-03.txt"));
    eU.blue(await eU.promisifiedReadFile("poem-one/stanza-04.txt"));
  } catch (err) {
    eU.magenta((err))
  };
}

// function problemF() {
//   // callback version
//   exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
//     console.log("-- F. callback version (stanza three) --");
//     if (err) {
//       if (err) exerciseUtils.magenta(new Error(err));
//       console.log("-- F. callback version done --");
//       return;
//     }
//     exerciseUtils.blue(stanza3);
//     exerciseUtils.readFile(
//       "poem-one/wrong-file-name.txt",
//       function (err2, stanza4) {
//         console.log("-- F. callback version (stanza four) --");
//         if (err2) exerciseUtils.magenta(new Error(err2));
//         else exerciseUtils.blue(stanza4);
//         console.log("-- F. callback version done --");
//       }
//     );
//   });
// }

  // asyncawait version
  // Tu código acá:
async function problemF() {
  try {
    eU.blue(await eU.promisifiedReadFile("poem-one/stanza-03.txt"));
    eU.blue(await eU.promisifiedReadFile("poem-one/stanza-04.txt"));
  } catch (err) {
    eU.magenta(err);
  }; 
  console.log('done');
}