import { Parser } from "./parser.js";
import { Registry } from "./registry.js";
import { Terminal } from "./terminal.js";

import { EventBus } from "../engine/event-bus.js";
import { ServiceManager } from "../engine/service-manager.js";
import { CommandManager } from "../engine/command-manager.js";

import { SystemService } from "../services/system-service.js";

import { BootManager } from "../engine/boot-manager.js";

import { Logger } from "../engine/logger.js";

import { ModuleManager } from "../engine/module-manager.js";


export class Application {

    constructor(terminalElement) {

        // Core
        this.terminal = new Terminal(terminalElement);
        this.parser = new Parser();
        this.registry = new Registry();

        // Engine
this.events = new EventBus();

this.services = new ServiceManager();

this.commands = new CommandManager(this);

this.boot = new BootManager(this);

this.logger = new Logger(this);

this.modules = new ModuleManager(this);

        // Services
        this.system = this.services.register(
            "system",
            new SystemService(this.registry)
        );

    }

}