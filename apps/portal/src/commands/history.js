import { Command } from "./command.js";

export class HistoryCommand extends Command {

  constructor() {

    super(
      "history",
      "Shows the command history."
    );

  }

  execute(context) {

    const history = context.terminal.getHistory();

    const output = [

      "Command History",
      ""

    ];

    history.forEach((command, index) => {

      output.push(
        `${String(index + 1).padStart(2)}  ${command}`
      );

    });

    return output;

  }

}