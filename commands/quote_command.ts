import axios from "axios";
import chalk from "chalk";

class QuoteCommand {
  private apiUrl = "https://zenquotes.io/api";

  register(program: any): void {
    const quote = program
      .command("quote")
      .description("Fetch inspirational quotes");

    quote
      .command("random")
      .description("Get a random inspirational quote")
      .option("-c, --count <n>", "Number of quotes to show", "1")
      .action(async (options: any) => {
        await this.getRandomQuote(parseInt(options.count));
      });

    quote
      .command("today")
      .description("Get the quote of the day")
      .action(async () => {
        await this.getQuoteOfDay();
      });
  }

  async getRandomQuote(count: number): Promise<void> {
    try {
      const url = count > 1 ? `${this.apiUrl}/quotes` : `${this.apiUrl}/random`;
      const { data } = await axios.get(url);
      const quotes = Array.isArray(data) ? data.slice(0, count) : [data[0]];

      console.log();
      quotes.forEach((q: any) => {
        console.log(chalk.cyan(`  "`) + chalk.italic.white(q.q) + chalk.cyan(`"`));
        console.log(chalk.yellow(`       — ${q.a}\n`));
      });
    } catch (err: any) {
      console.log(chalk.red(`\n  ❌ Could not fetch quote: ${err.message}\n`));
    }
  }

  async getQuoteOfDay(): Promise<void> {
    try {
      const { data } = await axios.get(`${this.apiUrl}/today`);
      const q = data[0];
      console.log(chalk.magentaBright("\n  ✨ Quote of the Day:\n"));
      console.log(chalk.cyan(`  "`) + chalk.italic.white(q.q) + chalk.cyan(`"`));
      console.log(chalk.yellow(`       — ${q.a}\n`));
    } catch (err: any) {
      console.log(chalk.red(`\n  ❌ Could not fetch quote: ${err.message}\n`));
    }
  }
}

export default QuoteCommand;