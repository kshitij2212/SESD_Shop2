class GreetCommand {

    register(program){
        program
        .command('greet <name>')
        .action((name)=>{this.greetName(name)})
    }

    greetName(name){
        console.log(`Hello ${name}`);
    }
}
export default GreetCommand;