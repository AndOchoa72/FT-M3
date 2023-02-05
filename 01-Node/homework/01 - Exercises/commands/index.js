const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
//    console.log("Llegamos al print");
    print(process.cwd());
}

function date(print) {
//    console.log("Llegamos a la funcion Date");
    print(Date());
}

function echo(print, args) {
//    console.log("Llegamos a la funcion Echo");
    print(args);
}

function ls(print) {
//    console.log("Llegamos a la funcion ls");
    fs.readdir(".", (err, files) => {
        if (err) {
//            console.log(err);
            throw Error(err);
        };
//          console.log(files);
        rds = files.join(" ");
//           console.log(rds);
        print(rds);
    });
}

function cat(print, args) {
//    console.log("Llegamos a la funcion cat");
//    console.log(args);
//    args = args.slice(1).join(" ");
    if (args == "") {
        print("No files specified.");
    } else {
//        console.log(args);
        fs.readFile(args, "utf-8",(err, lines) => {
            if (err) throw Error(err);
            lines = lines.toString();
//            console.log(lines);
            print(lines);
        });
    }
}

function head(print, args) {
//    console.log("Llegamos a la funcion head");
//    console.log(args);
//    args = args.slice(1).join(" ");
    if (args == "") {
        print("No files specified.");
    } else {
//        console.log(args);
        fs.readFile(args, "utf-8",(err, lines) => {
            if (err) throw Error(err);
//            console.log("* " + lines);
            lines = lines + "\n";
            lines = lines.substring(0, lines.indexOf("\n"));
            print(lines);
        });
    }
}

function tail(print, args) {
//    console.log("Llegamos a la funcion tail");
//    console.log("1:" + args);
//    args = args.slice(1).join(" ");
    if (args == "") {
        print("No files specified.");
    } else {
        console.log(args);
        fs.readFile(args, "utf-8",(err, lines) => {
            if (err) throw Error(err);
//            console.log("*:" + lines);
//            lines = "\n" + lines;
//            lines = lines.substring(lines.lastIndexOf("\n"));
//            print(lines);
            print(lines.split(" ").at(-1));
        });
    }
}

function curl(print, args) {
//    console.log("Llegamos a la funcion curl");
//    console.log(args);
//    args = args.slice(1).join(" ");
    if (args == "") {
        print("No WebPages specified.");
    } else {
//        console.log(args);
        utils.request(args,(err, response) => {
        if (err) throw Error(err);
//        console.log(response.data);
        // lines = "\n" + lines;
        // lines = lines.substring(lines.lastIndexOf("\n"));
        print(response);
        });
    }
}

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl
};