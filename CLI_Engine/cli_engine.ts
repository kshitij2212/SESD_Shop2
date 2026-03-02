const { Command } = require("commander");

class CliEngine {
    program
    constructor() {
        this.program = new Command();
    }

    registerCommand(commands) {
        commands.forEach((CommandClass) => {
            const commandInstance = new CommandClass();
            commandInstance.register(this.program); 
        });
    }

    run() {
        this.program.parse(process.argv);  
    }
}

export default CliEngine;