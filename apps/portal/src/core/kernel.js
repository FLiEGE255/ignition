import { BootScreen } from "./boot.js";
import { Application } from "./application.js";

import { HelpCommand } from "../commands/help.js";
import { StatusCommand } from "../commands/status.js";
import { AboutCommand } from "../commands/about.js";
import { ClearCommand } from "../commands/clear.js";
import { HistoryCommand } from "../commands/history.js";
import { VersionCommand } from "../commands/version.js";
import { CaptainCommand } from "../commands/captain.js";

export class GenesisCore {

    async boot() {

        console.log("🚀 Genesis OS v0.4.0");

        const appElement = document.getElementById("app");

        const boot = new BootScreen();

        appElement.innerHTML = boot.render();

        const terminalElement = document.getElementById("terminal-output");

        this.app = new Application(terminalElement);

        this.registerCommands();

        await this.bootSequence();

        this.bindTerminal();

    }

    registerCommands() {

        this.app.registry.register("help", new HelpCommand());
        this.app.registry.register("status", new StatusCommand());
        this.app.registry.register("about", new AboutCommand());
        this.app.registry.register("clear", new ClearCommand());
        this.app.registry.register("history", new HistoryCommand());
        this.app.registry.register("version", new VersionCommand());
        this.app.registry.register("captain", new CaptainCommand());

    }

    bindTerminal() {

        this.app.terminal.onCommand = (input) => {

            const parsed = this.app.parser.parse(input);

            const handler = this.app.registry.get(parsed.command);

            if (!handler) {

                this.app.terminal.println("Unknown command: " + parsed.command);
                this.app.terminal.println("");

                return;

            }

            const output = handler.execute({

                app: this.app,
                terminal: this.app.terminal,
                parser: this.app.parser,
                registry: this.app.registry,
                system: this.app.system,
                args: parsed.args

            });

            if (output && output.length > 0) {

                output.forEach(line => this.app.terminal.println(line));

                this.app.terminal.println("");

            }

        };

    }

    sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    }

    async bootStep(text, delay) {

        this.app.terminal.println(
            text.padEnd(28, ".") + " OK"
        );

        await this.sleep(delay);

    }

    async bootSequence() {

        const t = this.app.terminal;

        t.println("Genesis OS Bootloader v0.4.0");
        t.println("");

        await this.bootStep("Power On", 400);
        await this.bootStep("Memory Test", 500);
        await this.bootStep("CPU Check", 450);
        await this.bootStep("Loading Kernel", 600);
        await this.bootStep("Loading Services", 500);
        await this.bootStep("Registering Commands", 500);
        await this.bootStep("Connecting NODE0", 700);
        await this.bootStep("Opening Terminal", 500);

        t.println("");
        t.println("Genesis OS 0.4.0");
        t.println("Running iGNiTiON Network");
        t.println("");
        t.println("READY");
        t.println("");

    }

}