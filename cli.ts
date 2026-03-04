#!/usr/bin/env node
import CliEngine from "./CLI_Engine/cli_engine";
import GreetCommand from "./commands/greet_command";
import InitTsCommand from "./commands/init_ts";
import GithubCommand from "./commands/github_command";
import WeatherCommand from "./commands/weather_command";
import QuoteCommand from "./commands/quote_command";
import FileInfoCommand from "./commands/fileinfo_command";
import CalcCommand from "./commands/calc_command";
import PasswordCommand from "./commands/passgen_command";
import JokeCommand from "./commands/joke_command";
import SysinfoCommand from "./commands/sysinfo_command";
import TimerCommand from "./commands/timer_command";
import TranslateCommand from "./commands/translate_command";

const engine = new CliEngine();
engine.registerCommand([
    GreetCommand,
    InitTsCommand,
    GithubCommand,
    WeatherCommand,
    QuoteCommand,
    FileInfoCommand,
    CalcCommand,
    PasswordCommand,
    JokeCommand,
    SysinfoCommand,
    TimerCommand,
    TranslateCommand,
]);
engine.run();