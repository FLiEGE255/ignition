import { Command } from "./command.js";

export class VersionCommand extends Command {

  constructor() {

    super(
      "version",
      "Shows version information."
    );

  }

  execute(context) {

    return [

      `${context.system.getEngine()} v${context.system.getVersion()}`,
      "",
      `Platform..........${context.system.getPlatform()}`,
      `Build.............${context.system.getBuild()}`,
      `Uptime............${context.system.getUptime()} sec`

    ];

  }

}