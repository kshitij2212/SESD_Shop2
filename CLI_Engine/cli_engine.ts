const { Command } = require("commander");

class CliEngine {
    program
    constructor() {
        this.program = new Command();
        this.program
            .name("mycli")
            .description("SESD CLI Tool - Built with Node.js + TypeScript")
            .version("1.0.0", "-v, --version", "Output the current version");
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