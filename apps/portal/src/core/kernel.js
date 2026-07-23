import { BootScreen } from "./boot.js";
import { Application } from "./application.js";

import { FullscreenScreen } from "../modules/fullscreen-screen.js";
import { BbsHomeScreen } from "../modules/bbs-home-screen.js";
import { LoginScreen } from "../modules/login-screen.js";

export class GenesisCore {

    async boot() {

        const appElement = document.getElementById("app");

        // Bootscreen anzeigen
        const boot = new BootScreen();
        appElement.innerHTML = boot.render();

        // Terminal initialisieren
        const terminalElement = document.getElementById("terminal-output");

        this.app = new Application(terminalElement);

        this.app.logger.info("Genesis OS v0.4.0-alpha.1");

        // Standard-Commands registrieren
        this.app.commands.registerDefaults();

        // Bootsequenz
        await this.app.boot.run();

        // Fullscreen-Hinweis anzeigen
        const fullscreen = new FullscreenScreen();
        appElement.innerHTML = fullscreen.render();

        // ENTER -> BBS Home
        document.addEventListener("keydown", async function fullscreenHandler(event) {

            if (event.key !== "Enter") {
                return;
            }

            document.removeEventListener("keydown", fullscreenHandler);

            document.querySelector(".fullscreen-screen").style.opacity = "0";

            await new Promise(resolve => setTimeout(resolve, 150));

            const home = new BbsHomeScreen();

            appElement.innerHTML = home.render();

            await home.start();

            // ENTER oder 1 -> Login
            document.addEventListener("keydown", async function homeHandler(event) {

                if (event.key !== "Enter" && event.key !== "1") {
                    return;
                }

                document.removeEventListener("keydown", homeHandler);

                const login = new LoginScreen();

                appElement.innerHTML = login.render();

                await login.start();

            });

        });

    }

}