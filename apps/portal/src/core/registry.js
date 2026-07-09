export class Registry {

  constructor() {

    this.commands = new Map();

  }

  register(name, command) {

    this.commands.set(name, command);

  }

  get(name) {

    return this.commands.get(name);

  }

  count() {

    return this.commands.size;

  }

  list() {

    return Array.from(this.commands.values());

  }

}