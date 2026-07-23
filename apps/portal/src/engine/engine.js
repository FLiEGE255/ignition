export class Engine {

    constructor(app) {

        this.app = app;

        this.managers = [];

    }

    register(manager) {

        this.managers.push(manager);

        return manager;

    }

    async initialize() {

        for (const manager of this.managers) {

            if (manager.initialize) {
                await manager.initialize();
            }

        }

    }

    async start() {

        for (const manager of this.managers) {

            if (manager.start) {
                await manager.start();
            }

        }

    }

}