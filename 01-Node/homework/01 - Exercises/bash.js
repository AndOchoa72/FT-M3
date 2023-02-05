const { stdout, stdin } = require("process");
const process = require("process");
const commands = require("./commands/index.js");

function bash() {
  stdout.write("prompt > ");
  stdin.on("data", function (data) {
    args = data.toString().trim().split(" ");
    cmd = args.shift();
//    console.log("*Args:", args);
//    console.log("*Cmd:", cmd);
    if (commands.hasOwnProperty(cmd)) {
        commands[cmd](print, args.join(" "));
      } else {
        print ("command not found: " + cmd);
      }
  });
}
    
function print(output) {
  stdout.write(output);
  stdout.write("\nprompt > ");
}

// console.log(commands);

bash();

module.exports = {
  print,
  bash,
};
