import { HelpCommand } from "../commands/help.js";
import { StatusCommand } from "../commands/status.js";
import { AboutCommand } from "../commands/about.js";
import { ClearCommand } from "../commands/clear.js";
import { HistoryCommand } from "../commands/history.js";
import { VersionCommand } from "../commands/version.js";
import { CaptainCommand } from "../commands/captain.js";

export class CommandManager {

    constructor(app) {

        this.app = app;

    }

    registerDefaults() {

        this.register("help", new HelpCommand());
        this.register("status", new StatusCommand());
        this.register("about", new AboutCommand());
        this.register("clear", new ClearCommand());
        this.register("history", new HistoryCommand());
        this.register("version", new VersionCommand());
        this.register("captain", new CaptainCommand());

    }

    register(name, command) {

        this.app.registry.register(name, command);

    }

    execute(input) {

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

    }

}