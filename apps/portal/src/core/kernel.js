import { Parser } from "./parser.js";
import { Registry } from "./registry.js";
import { BootScreen } from "./boot.js";
import { Terminal } from "./terminal.js";

import { HelpCommand } from "../commands/help.js";
import { StatusCommand } from "../commands/status.js";
import { AboutCommand } from "../commands/about.js";
import { ClearCommand } from "../commands/clear.js";
import { HistoryCommand } from "../commands/history.js";
import { VersionCommand } from "../commands/version.js";
import { CaptainCommand } from "../commands/captain.js";

import { SystemService } from "../services/system-service.js";

export class GenesisCore {

  async boot() {

    console.log("🚀 Genesis Core v0.3.0");

    const app = document.getElementById("app");

    const boot = new BootScreen();

    app.innerHTML = boot.render();

    const terminalElement = document.getElementById("terminal-output");

    this.terminal = new Terminal(terminalElement);
    this.parser = new Parser();
    this.registry = new Registry();
    this.system = new SystemService(this.registry);

    // Commands registrieren
    this.registry.register("help", new HelpCommand());
    this.registry.register("status", new StatusCommand());
    this.registry.register("about", new AboutCommand());
    this.registry.register("clear", new ClearCommand());
    this.registry.register("history", new HistoryCommand());
    this.registry.register("version", new VersionCommand());
    this.registry.register("captain", new CaptainCommand());

    // Bootsequenz
    await this.bootSequence();

    // Terminal-Callback
    this.terminal.onCommand = (input) => {

      const parsed = this.parser.parse(input);

      const handler = this.registry.get(parsed.command);

      if (!handler) {

        this.terminal.println("Unknown command: " + parsed.command);
        this.terminal.println("");

        return;

      }

      const output = handler.execute({

        terminal: this.terminal,
        parser: this.parser,
        registry: this.registry,
        system: this.system,
        args: parsed.args

      });

      if (output && output.length > 0) {

        output.forEach(line => this.terminal.println(line));

        this.terminal.println("");

      }

    };

  }

  sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

  }

  async bootStep(text, delay) {

    this.terminal.println("[ OK ] " + text);

    await this.sleep(delay);

  }

  async bootSequence() {

    this.terminal.println("Booting Genesis Core...");
    await this.sleep(1200);

    this.terminal.println("");

    await this.bootStep("Initializing Kernel", 900);
    await this.bootStep("Loading Services", 1000);
    await this.bootStep("Registering Commands", 800);
    await this.bootStep("Preparing Terminal", 900);
    await this.bootStep("Authentication Ready", 1200);

    this.terminal.println("");
    this.terminal.println("Genesis Core ready.");
    this.terminal.println("");

  }

}