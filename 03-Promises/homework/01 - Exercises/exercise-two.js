"use strict";

const { promisifiedReadFile } = require("./utils");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  // callback version
  // exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
  //   exerciseUtils.blue(stanza);
  // });
  // exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
  //   exerciseUtils.blue(stanza);
  // });

  // promise version
  // Tu código acá:

  const myPromises = [
    exerciseUtils.promisifiedReadFile('poem-two/stanza-01.txt')
      .then(sta1 => exerciseUtils.blue(sta1)),
    exerciseUtils.promisifiedReadFile('poem-two/stanza-02.txt')
      .then(sta2 => exerciseUtils.blue(sta2)),
  ];
  Promise.all(myPromises)
    .then(() => console.log('done'));

  
  // {
  // let p1 = exerciseUtils.promisifiedReadFile('poem-two/stanza-01.txt')
  // let p2 = exerciseUtils.promisifiedReadFile('poem-two/stanza-02.txt')
  // Promise.all([p1, p2]).then(([v1, v2]) => {
  //   exerciseUtils.blue(v1);
  //   exerciseUtils.blue(v2);
  // })
  // }
}

function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // promise version
  // Tu código acá:

  const myProms = [];
  filenames.forEach((fn) => {
    myProms.push(exerciseUtils.promisifiedReadFile(fn)
      .then(sta => exerciseUtils.blue(sta)))
  });
  Promise.all(myProms).then(() => console.log('done'));
}

function problemC() {
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

  // promise version
  // Tu código acá:
  filenames.forEach((fn) => {
    exerciseUtils.promisifiedReadFile(fn)
      .then(sta => exerciseUtils.blue(sta))
      .catch(err => exerciseUtils.magenta(new Error(err)))
  })

}

function problemD() {
  let fs = require("fs");
  function promisifiedWriteFile(filename, str) {
    // tu código acá:

    //   return new Promise((resolve, reject) => {
    //     fs.writeFile(filename, str, 'utf8', function (err) {
    //       if (err) return reject(err);
    //       resolve();
    //     });
    //   })
    // }

  }
}
