const {execSync} = require("child_process");

class InitTsCommand {
    register(program){
        program
        .command('init-ts <foldername>')        
        .action((foldername)=>{
            this.InitializeTs(foldername);
        })
    }
    InitializeTs(foldername){ 
        this.run(`mkdir ${foldername}`);
        this.run(`cd ${foldername} && npm init -y`);
        this.run(`cd ${foldername} && npm install -D typescript ts-node nodemon @types/node`);
        this.run(`cd ${foldername} && npx tsc --init`);
    }
    run(command){
        execSync(command,{stdio:"inherit"});
    }
}
export default InitTsCommand;