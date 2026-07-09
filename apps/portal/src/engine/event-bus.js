export class EventBus {

    constructor() {

        this.listeners = new Map();

    }

    on(event, callback) {

        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(callback);

    }

    emit(event, payload = null) {

        if (!this.listeners.has(event)) {
            return;
        }

        for (const callback of this.listeners.get(event)) {
            callback(payload);
        }

    }

    off(event, callback) {

        if (!this.listeners.has(event)) {
            return;
        }

        const listeners = this.listeners.get(event);

        const index = listeners.indexOf(callback);

        if (index !== -1) {
            listeners.splice(index, 1);
        }

    }

}