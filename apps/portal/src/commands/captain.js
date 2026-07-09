import { Command } from "./command.js";

export class CaptainCommand extends Command {

  constructor() {

    super(
      "captain",
      "Opens the Captain interface."
    );

  }

  execute(context) {

    context.terminal.setPrompt("FLiEGE>");

    return [

      "═══════════════════════════════",
      "",
      "Captain Interface",
      "",
      "Status........ONLINE",
      "Mission.......NONE",
      "Node..........LOCAL",
      "",
      "Awaiting instructions...",
      "",
      "═══════════════════════════════"

    ];

  }

}