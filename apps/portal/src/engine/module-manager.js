export class ModuleManager {

    constructor(app) {

        this.app = app;

        this.modules = new Map();

    }

    register(name, module) {

        this.modules.set(name, module);

        this.app.logger?.info(`Module registered: ${name}`);

        return module;

    }

    get(name) {

        return this.modules.get(name);

    }

    has(name) {

        return this.modules.has(name);

    }

    unregister(name) {

        this.modules.delete(name);

    }

    all() {

        return Array.from(this.modules.values());

    }

    names() {

        return Array.from(this.modules.keys());

    }

    async initialize() {

        for (const module of this.modules.values()) {

            if (typeof module.initialize === "function") {
                await module.initialize();
            }

        }

    }

    async start() {

        for (const module of this.modules.values()) {

            if (typeof module.start === "function") {
                await module.start();
            }

        }

    }

    async stop() {

        for (const module of this.modules.values()) {

            if (typeof module.stop === "function") {
                await module.stop();
            }

        }

    }

}