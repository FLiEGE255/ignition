import { Config } from "./config.js";

export class SystemInfo {

  static getStatus(registry) {

    return [

      `${Config.engine} v${Config.version}`,
      "",
      "State.............ONLINE",
      `Commands..........${registry.count()}`,
      "Parser............READY",
      "Registry..........READY"

    ];

  }

}