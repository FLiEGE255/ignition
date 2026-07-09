import { Config } from "./config.js";

export class BootScreen {

  render() {

    return `
      <main class="terminal">

        <h1>${Config.platform} ${Config.engine}</h1>

        <p>Version ${Config.version}</p>

        <div id="terminal-output"></div>

      </main>
    `;

  }

}