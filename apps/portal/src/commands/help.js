import { Command } from "./command.js";

export class HelpCommand extends Command {

  constructor() {

    super(
      "help",
      "Displays all available commands."
    );

  }

  execute(context) {

    // Hilfe zu einem bestimmten Command
    if (context.args.length > 0) {

      const command = context.registry.get(context.args[0]);

      if (!command) {

        return [
          `Unknown command: ${context.args[0]}`
        ];

      }

      return [

        command.name,
        "",
        command.description

      ];

    }

    // Übersicht aller Commands
    const output = [

      "Available Commands",
      ""

    ];

    context.registry.list().forEach(command => {

      output.push(
        `${command.name.padEnd(12)} ${command.description}`
      );

    });

    return output;

  }

}