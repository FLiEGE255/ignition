export class Command {

  constructor(name, description) {

    this.name = name;
    this.description = description;

  }

  execute(context) {

    throw new Error("execute() must be implemented");

  }

}