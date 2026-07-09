import { Command } from "./command.js";

export class AboutCommand extends Command {

  constructor() {

    super(
      "about",
      "Shows information about Genesis Core."
    );

  }

  execute(context) {

    return [

      "iGNiTiON Genesis Core",
      "",
      "Version...........0.2.0",
      "Platform..........Interactive Mission Platform",
      "Status............Development Build",
      "",
      "© 2026 iGNiTiON"

    ];

  }

}