import { Command } from "./command.js";

export class ClearCommand extends Command {

  constructor() {

    super(
      "clear",
      "Clears the terminal."
    );

  }

  execute(context) {

    context.terminal.clear();

    return [];

  }

}