export class Terminal {

  constructor(element) {

    this.element = element;

    this.lines = [];
    this.input = "";
    this.history = [];
    this.historyIndex = -1;

    this.onCommand = null;
    this.prompt = ">";

    window.addEventListener("keydown", (event) => {
      this.handleKey(event);
    });

    this.render();

  }

  print(text) {

    this.lines.push(text);

  }

  println(text) {

    this.lines.push(text);
    this.render();

  }

  clear() {

    this.lines = [];
    this.render();

  }

  setPrompt(prompt) {

    this.prompt = prompt;
    this.render();

  }

  getHistory() {

    return [...this.history];

  }

  handleKey(event) {

    if (event.key === "Backspace") {

      this.input = this.input.slice(0, -1);

    }

    else if (event.key === "ArrowUp") {

      if (this.historyIndex > 0) {

        this.historyIndex--;

        this.input = this.history[this.historyIndex];

      }

    }

    else if (event.key === "ArrowDown") {

      if (this.historyIndex < this.history.length - 1) {

        this.historyIndex++;

        this.input = this.history[this.historyIndex];

      }

      else {

        this.historyIndex = this.history.length;
        this.input = "";

      }

    }

    else if (event.key === "Enter") {

      const command = this.input;

      if (command.trim() !== "") {

        this.history.push(command);
        this.historyIndex = this.history.length;

      }

      this.lines.push(this.prompt + " " + command);

      this.input = "";

      if (this.onCommand) {

        this.onCommand(command);

      }

    }

    else if (event.key.length === 1) {

      this.input += event.key;

    }

    this.render();

  }

  render() {

    this.element.innerHTML = "";

    this.lines.forEach(line => {

      const div = document.createElement("div");

      div.textContent = line;

      this.element.appendChild(div);

    });

    const prompt = document.createElement("div");

    prompt.textContent = this.prompt + " " + this.input;

    this.element.appendChild(prompt);

  }

}