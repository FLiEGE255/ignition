export class Parser {

  parse(input) {

    const parts = input.trim().split(/\s+/);

    return {

      command: (parts.shift() || "").toLowerCase(),
      args: parts

    };

  }

}