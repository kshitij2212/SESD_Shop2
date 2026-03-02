#!/usr/bin/env node
import CliEngine from "./CLI_Engine/cli_engine.js";
import GreetCommand from "./commands/greet_command.js";

const engine = new CliEngine();
engine.registerCommand([GreetCommand]);
engine.run();


