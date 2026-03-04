import axios from "axios";
import chalk from "chalk";

class TranslateCommand {
  private apiUrl = "https://api.mymemory.translated.net/get";

  register(program: any): void {
    program
      .command("translate <text>")
      .description("Translate text between languages (free, no API key)")
      .option("-f, --from <lang>", "Source language code (e.g. en, ar, fr)", "en")
      .option("-t, --to <lang>", "Target language code (e.g. ar, fr, es)", "ar")
      .action(async (text: string, options: any) => {
        await this.translate(text, options.from, options.to);
      });
  }

  async translate(text: string, from: string, to: string): Promise<void> {
    try {
      console.log(chalk.cyan(`\n  🌐 Translating: ${chalk.italic(text)}\n`));

      const { data } = await axios.get(this.apiUrl, {
        params: {
          q: text,
          langpair: `${from}|${to}`,
        },
      });

      if (data.responseStatus !== 200) {
        console.log(chalk.red(`  ❌ Translation failed: ${data.responseDetails}\n`));
        return;
      }

      const result = data.responseData.translatedText;
      console.log(`  ${chalk.yellow("Original:")}    ${chalk.white(text)}`);
      console.log(`  ${chalk.yellow("Translated:")}  ${chalk.greenBright(result)}`);
      console.log(`  ${chalk.yellow("Direction:")}   ${chalk.gray(`${from} → ${to}`)}\n`);
    } catch (err: any) {
      console.log(chalk.red(`\n  ❌ Translation error: ${err.message}\n`));
    }
  }
}

export default TranslateCommand;