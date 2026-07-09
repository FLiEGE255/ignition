import { Parser } from "./parser.js";
import { Registry } from "./registry.js";
import { Terminal } from "./terminal.js";

import { EventBus } from "../engine/event-bus.js";
import { ServiceManager } from "../engine/service-manager.js";

import { SystemService } from "../services/system-service.js";

export class Application {

    constructor(terminalElement) {

        this.terminal = new Terminal(terminalElement);

        this.parser = new Parser();

        this.registry = new Registry();

        this.events = new EventBus();

        this.services = new ServiceManager();

        this.system = this.services.register(
    "system",
    new SystemService(this.registry)
);

    }

}