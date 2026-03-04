import chalk from "chalk";

class CalcCommand {
  register(program: any): void {
    program
      .command("calc <expression>")
      .description('Evaluate a math expression (e.g. "2 + 3 * 4")')
      .action((expression: string) => {
        this.evaluate(expression);
      });
  }

  evaluate(expression: string): void {
    const safe = /^[\d\s\+\-\*\/\.\(\)\^%]+$/.test(expression);
    if (!safe) {
      console.log(chalk.red("\n  ❌ Invalid expression. Only numbers and + - * / . ( ) ^ % allowed.\n"));
      return;
    }

    try {
      const sanitized = expression.replace(/\^/g, "**");
      const result = Function(`"use strict"; return (${sanitized})`)();
      console.log(
        chalk.cyan(`\n  🔢 ${chalk.white(expression)} ${chalk.gray("=")} ${chalk.yellowBright(result)}\n`)
      );
    } catch {
      console.log(chalk.red("\n  ❌ Could not evaluate expression.\n"));
    }
  }
}

export default CalcCommand;