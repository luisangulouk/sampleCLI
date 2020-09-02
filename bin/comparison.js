#! /usr/bin/env node
var readline = require('readline');
const fs = require('fs');
const Dispatcher = require('../lib/dispatcher');

class App {
    constructor(processArgs){
        this.args = processArgs;
        this.filePath = this.args[0];
    }
    
    getCommands() {
        try {
            if (fs.existsSync(this.filePath)) {
                const rawdata = fs.readFileSync(this.filePath);
                const plans = JSON.parse(rawdata);
            
                var appInterface = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });
                
                const actionDispatcher = new Dispatcher(plans);
                appInterface.on('line', (line) => {
                    const args = line.split(' ');
                    //console.log(args);
                    actionDispatcher.validate(args);
                });
            }
        } 
        catch(err) {
            console.error(err)
        }
    }

}

const comparison = new App(process.argv.slice(2));
comparison.getCommands();

process.on('SIGTERM', (signal) => {
    console.info('SIGTERM signal received.', signal);
});


