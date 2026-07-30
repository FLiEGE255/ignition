import { BootScreen } from "./boot.js";
import { Application } from "./application.js";

import { FullscreenScreen } from "../modules/fullscreen-screen.js";
import { BbsHomeScreen } from "../modules/bbs-home-screen.js";
import { LoginScreen } from "../modules/login-screen.js";

export class GenesisCore {

    async boot() {

        const appElement =
            document.getElementById("app");


        /*
         * =====================================================
         * DEVICE
         * =====================================================
         */

        const isMobile =
            window.matchMedia(
                "(max-width: 768px), (pointer: coarse)"
            ).matches;


        /*
         * =====================================================
         * BOOT
         * =====================================================
         */

        const boot =
            new BootScreen();

        appElement.innerHTML =
            boot.render();


        const terminalElement =
            document.getElementById("terminal-output");


        this.app =
            new Application(terminalElement);


        this.app.logger.info(
            "Genesis OS v0.4.0-alpha.1"
        );


        this.app.commands.registerDefaults();


        await this.app.boot.run();


        /*
         * =====================================================
         * OPEN BBS HOME
         * =====================================================
         */

        const openBbsHome = async () => {

            const home =
                new BbsHomeScreen();


            appElement.innerHTML =
                home.render();

            await home.start();


            /*
             * Kurze Sperre, damit ein eventuell noch laufendes
             * Pointer-Event nicht direkt den Login öffnet.
             */

            await new Promise(resolve =>
                setTimeout(resolve, 300)
            );


            let homeTransitionRunning =
                false;


            /*
             * =================================================
             * OPEN LOGIN
             * =================================================
             */

            const openLogin = async () => {

                if (homeTransitionRunning) {
                    return;
                }


                homeTransitionRunning =
                    true;


                document.removeEventListener(
                    "keydown",
                    homeKeyHandler
                );

                document.removeEventListener(
                    "pointerup",
                    homePointerHandler
                );


                home.destroy();


                const login =
                    new LoginScreen();


                appElement.innerHTML =
                    login.render();


                await login.start();
            };


            const homeKeyHandler =
                async (event) => {

                    if (
                        event.key !== "Enter" &&
                        event.key !== "1"
                    ) {
                        return;
                    }


                    await openLogin();
                };


            const homePointerHandler =
                async () => {

                    if (!isMobile) {
                        return;
                    }


                    await openLogin();
                };


            document.addEventListener(
                "keydown",
                homeKeyHandler
            );


            document.addEventListener(
                "pointerup",
                homePointerHandler
            );
        };


        /*
         * =====================================================
         * MOBILE
         * =====================================================
         */

        if (isMobile) {

            await openBbsHome();

            return;
        }


        /*
         * =====================================================
         * DESKTOP
         * =====================================================
         */

        const fullscreen =
            new FullscreenScreen();


        appElement.innerHTML =
            fullscreen.render();


        let fullscreenTransitionRunning =
            false;


        const openDesktopBbsHome =
            async () => {

                if (fullscreenTransitionRunning) {
                    return;
                }


                fullscreenTransitionRunning =
                    true;


                document.removeEventListener(
                    "keydown",
                    fullscreenKeyHandler
                );


                const fullscreenElement =
                    document.querySelector(
                        ".fullscreen-screen"
                    );


                if (fullscreenElement) {

                    fullscreenElement.style.opacity =
                        "0";
                }


                await new Promise(resolve =>
                    setTimeout(resolve, 150)
                );


                await openBbsHome();
            };


            const fullscreenKeyHandler =
                async (event) => {

                    if (event.key !== "Enter") {
                        return;
                    }


                    await openDesktopBbsHome();
                };


        document.addEventListener(
            "keydown",
            fullscreenKeyHandler
        );
    }
}