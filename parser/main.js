"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAndWrite = void 0;
var fs = require("fs");
var querystring_1 = require("querystring");
// testing google cloud NLP
var folder = "json";
// default filetype txt
var filetype = "txt";
if (process.argv.length === 2) {
    console.error("Need filetype argument.");
    console.log("Eg. tsc run.ts; node run.js -md");
    process.exit(1);
}
else {
    filetype = process.argv[2].substring(1);
}
var conversationCount = 3; // need a better way to find this
function genName() {
    var name = Math.floor(Math.random() * Math.pow(2, 16)).toString(16);
    var other = Math.floor(Math.random() * Math.pow(2, 16)).toString(16);
    var end = Math.floor(Math.random() * Math.pow(2, 16)).toString(16);
    return name + other + end;
}
function parseAndWrite(file) {
    console.log("Parsing conversations.");
    var jsontext = fs.readFileSync(file, "utf-8");
    var jsonOBJ = JSON.parse(jsontext);
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    var _loop_1 = function (i) {
        console.log(i);
        console.log(jsonOBJ[i].title);
        var sf = jsonOBJ[i].title;
        var subfolder = sf.replace(/ /g, "_");
        if (!fs.existsSync(folder + "/" + subfolder)) {
            fs.mkdirSync(folder + "/" + subfolder);
        }
        Object.keys(jsonOBJ[i].mapping).forEach(function (key) {
            var mappingObj = jsonOBJ[i].mapping[key].message;
            try {
                var author = mappingObj.author;
                if (author.role !== "system") {
                    var id = mappingObj.content;
                    var messageContent = id.parts;
                    var mc = (0, querystring_1.stringify)(messageContent);
                    var decodeMC = global.decodeURI(mc);
                    // remove 0= from start of line
                    var dmc_sub = decodeMC.substring(2, decodeMC.length);
                    var name_1 = genName();
                    fs.writeFile("".concat(folder, "/").concat(subfolder, "/").concat(name_1, "_").concat(author.role, ".").concat(filetype), dmc_sub, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            }
            catch (err) {
                console.log("Skipping, no content");
            }
        });
    };
    for (var i = 0; i < conversationCount; i++) {
        _loop_1(i);
    }
    console.log("Done");
}
exports.parseAndWrite = parseAndWrite;
function getFiles(path) {
    try {
        var files = [];
        var subfolders = fs.readdirSync(path);
        for (var _i = 0, subfolders_1 = subfolders; _i < subfolders_1.length; _i++) {
            var f = subfolders_1[_i];
            var files_in_subfolder = fs.readdirSync(path + "/" + f);
            for (var _a = 0, files_in_subfolder_1 = files_in_subfolder; _a < files_in_subfolder_1.length; _a++) {
                var v = files_in_subfolder_1[_a];
                var file = v;
                files.push(file);
            }
        }
        console.log(files);
        console.log(files.length);
        return files;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
exports.default = getFiles;
