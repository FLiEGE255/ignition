import { Config } from "./config.js";

export class BootScreen {

  render() {

    return `
      <main class="terminal">

        <h1 class="boot-title">
          <span class="boot-title-main">${Config.platform} ${Config.engine.replace(" Core", "")}</span>
          <span class="boot-title-core">Core</span>
        </h1>

        <p>Version ${Config.version}</p>

        <div id="terminal-output"></div>

      </main>
    `;

  }

}