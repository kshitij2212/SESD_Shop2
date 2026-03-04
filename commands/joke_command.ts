import axios from "axios";
import chalk from "chalk";

class JokeCommand {
  private apiUrl = "https://v2.jokeapi.dev/joke";

  register(program: any): void {
    program
      .command("joke")
      .description("Fetch a random joke")
      .option(
        "-c, --category <cat>",
        "Category: Any, Programming, Misc, Dark, Pun, Spooky, Christmas",
        "Any"
      )
      .option("--safe", "Safe mode — no dark or explicit jokes")
      .action(async (options: any) => {
        await this.getJoke(options);
      });
  }

  async getJoke(options: any): Promise<void> {
    try {
      const params: any = {
        type: "twopart,single",
      };
      if (options.safe) params.safe = true;

      const url = `${this.apiUrl}/${options.category}`;
      const { data } = await axios.get(url, { params });

      console.log(chalk.cyan("\n  😂 Here's a joke:\n"));

      if (data.type === "single") {
        console.log(chalk.white(`  ${data.joke}`));
      } else {
        console.log(chalk.white(`  Q: ${data.setup}`));
        console.log(chalk.yellowBright(`  A: ${data.delivery}`));
      }
      console.log(chalk.gray(`\n  Category: ${data.category}\n`));
    } catch (err: any) {
      console.log(chalk.red(`\n  ❌ Could not fetch joke: ${err.message}\n`));
    }
  }
}

export default JokeCommand;