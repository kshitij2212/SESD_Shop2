import chalk from "chalk";

class TimerCommand {
  register(program: any): void {
    program
      .command("timer <seconds>")
      .description("Start a countdown timer")
      .option("-m, --message <msg>", "Message to display when timer ends", "⏰ Time's up!")
      .action((seconds: string, options: any) => {
        this.startTimer(parseInt(seconds), options.message);
      });
  }

  startTimer(seconds: number, message: string): void {
    if (isNaN(seconds) || seconds <= 0 || seconds > 3600) {
      console.log(chalk.red("\n  ❌ Please provide a valid number of seconds (1–3600).\n"));
      return;
    }

    console.log(chalk.cyan(`\n  ⏱️  Timer started: ${seconds}s\n`));

    let remaining = seconds;
    const interval = setInterval(() => {
      process.stdout.write(
        `\r  ${chalk.yellow("⏳")} ${chalk.bold(String(remaining).padStart(4))}s remaining...  `
      );
      remaining--;

      if (remaining < 0) {
        clearInterval(interval);
        process.stdout.write("\r" + " ".repeat(40) + "\r");
        console.log(chalk.greenBright(`\n  ${message}\n`));
      }
    }, 1000);
  }
}

export default TimerCommand;