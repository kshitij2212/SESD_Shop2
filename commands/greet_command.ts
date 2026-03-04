class GreetCommand {

    register(program){
        program
        .command('greet <name>')
        .description('Greet someone by name')
        .option('-l, --loud', 'Greet in uppercase')
        .action((name, options)=>{this.greetName(name, options)})
    }

    greetName(name, options){
        const message = `Hello, ${name}!`;
        console.log(options.loud ? message.toUpperCase() : message);
    }
}
export default GreetCommand;