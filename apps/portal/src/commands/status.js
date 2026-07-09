import { Command } from "./command.js";
import { SystemInfo } from "../core/system.js";

export class StatusCommand extends Command {

  constructor() {

    super(
      "status",
      "Shows the current system status."
    );

  }

  execute(context) {

    return SystemInfo.getStatus(context.registry);

  }

}