import chalk from "chalk";
import crypto from "crypto";

class PasswordCommand {
  register(program: any): void {
    program
      .command("passgen")
      .description("Generate a secure random password")
      .option("-l, --length <n>", "Password length", "16")
      .option("--no-symbols", "Exclude special symbols")
      .option("--no-numbers", "Exclude numbers")
      .option("-c, --count <n>", "Number of passwords to generate", "1")
      .action((options: any) => {
        this.generatePassword(options);
      });
  }

  generatePassword(options: any): void {
    const length = parseInt(options.length);

    if (length < 4 || length > 128) {
      console.log(chalk.red("\n  ❌ Length must be between 4 and 128.\n"));
      return;
    }

    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers !== false) charset += "0123456789";
    if (options.symbols !== false) charset += "!@#$%^&*()-_=+[]{}|;:,.<>?";

    const count = parseInt(options.count);
    console.log(chalk.cyan(`\n  🔐 Generated Password${count > 1 ? "s" : ""}:\n`));

    for (let i = 0; i < count; i++) {
      const bytes = crypto.randomBytes(length);
      let password = "";
      for (let j = 0; j < length; j++) {
        password += charset[bytes[j] % charset.length];
      }
      console.log(`  ${chalk.yellowBright(password)}`);
    }

    console.log(chalk.gray(`\n  Length: ${length}  |  Symbols: ${options.symbols !== false}  |  Numbers: ${options.numbers !== false}\n`));
  }
}

export default PasswordCommand;