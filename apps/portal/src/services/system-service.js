import { Config } from "../core/config.js";

export class SystemService {

  constructor(registry) {

    this.registry = registry;
    this.started = Date.now();

  }

  getVersion() {

    return Config.version;

  }

  getEngine() {

    return Config.engine;

  }

  getPlatform() {

    return Config.platform;

  }

  getBuild() {

    return Config.build;

  }

  getCommandCount() {

    return this.registry.count();

  }

  getUptime() {

    return Math.floor((Date.now() - this.started) / 1000);

  }

}