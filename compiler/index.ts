import fs = require("fs");
import { exec } from "child_process";
const cmd = process.argv[2];
var LOG_DATA = new Date() + "\n";

const execute = (cmd: string, callback?: () => void) => {
    log("Running CMD: `" + cmd + '`');
    return exec(cmd, callback);
}

const Time = () => {
    let dt = new Date();
    return "[ " + dt.getHours() + "H:" + dt.getMinutes() + "M:" + dt.getSeconds() + "S ] ";
}

const log = (...args: any[]) => {
    LOG_DATA += ("\n" + Time() + args.join(" "));
    console.log(Time(), ...args);
    fs.writeFileSync("compiler/log.txt", LOG_DATA, opt);
}

const logErr = (err: any) => err ? console.error(err) : null;
const opt: fs.WriteFileOptions = { encoding: "utf8" };

fs.writeFileSync("compiler/log.txt", LOG_DATA, opt);

/* For Client Side */

log("Compile .ts file to .js file in 'dist' dir")
execute("tsc -w --project tsconfig.json");

var scripts: { [key: string]: string; } = {};
var mainJSCt = "";

function compile(exit = false) {
    fs.readFile("./src/scripts.json", opt, (err, data) => {
        logErr(err);

        log("Compiling the scripts into './public/main.js'");
        let scriptsURL: string[] = JSON.parse(data as string).scripts;
        mainJSCt = "";
        var newScripts: { [key: string]: string; } = {};

        scriptsURL.forEach(url => {
            let content = scripts[url];
            if (content == undefined) content = getAndParseJS(url);
            newScripts[url] = content;
            mainJSCt += '\n' + content;
        });

        scripts = newScripts;
        fs.writeFileSync("./public/main.js", mainJSCt, opt);
        log("Compile finished!");
        if(exit) process.exit();
    });
}

/** @param { string } fn */
function getAndParseJS(fn: string) {
    let ct = (fs.readFileSync("./dist/" + fn, opt) as string).split("\n");
    ct.shift();
    return ct.join("\n");
}

if (cmd == "watch") {
    log("Watching 'scripts.json' file for changes");
    fs.watchFile("./src/scripts.json", () => { compile(); });

    log("Watching 'dist' dir for changes (contains all compiled .js)")
    fs.watch("./dist", (ev, fn) => {
        log("Change in directory -> Event: " + ev + ", Filename: " + fn);
        if (ev == "change") {
            scripts[fn] = getAndParseJS(fn);
            compile();
        }
        else log("@", ev);
    });
}
else if(cmd == "build") compile(true);