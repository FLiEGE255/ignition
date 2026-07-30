import "../styles/welcome.css";

export class WelcomeScreen {

    constructor(session) {
        this.session = session;
    }


    render() {

        const handle =
            this.session?.handle || "FLiEGE";

        return `
            <div class="welcome-screen">

                <div class="welcome-frame">

                    <div class="welcome-header">
                        <span class="welcome-red">
                            iGNiTiON NETWORK
                        </span>

                        <span class="welcome-yellow">
                            NODE0
                        </span>
                    </div>


                    <main class="welcome-main">

                        <div
                            class="welcome-line welcome-hidden"
                        >
                            SESSION ESTABLISHED
                        </div>


                        <div
                            class="welcome-divider welcome-hidden"
                        ></div>


                        <div
                            class="welcome-title welcome-hidden"
                        >
                            WELCOME BACK,
                        </div>


                        <div
                            class="welcome-handle welcome-hidden"
                        >
                            ${handle}
                        </div>


                        <div
                            class="welcome-message welcome-hidden"
                        >
                            YOUR SESSION HAS BEEN RESTORED.
                        </div>


                        <div
                            class="welcome-status welcome-hidden"
                        >
                            NODE0 ACCESS CONFIRMED
                        </div>


                        <div
                            class="welcome-continue welcome-hidden"
                        >
                            [ PRESS ENTER TO CONTINUE ]
                        </div>

                    </main>


                    <footer class="welcome-footer">

                        <span>
                            GENESIS OS
                        </span>

                        <span class="welcome-online">
                            NODE0 ● ONLINE
                        </span>

                    </footer>

                </div>

            </div>
        `;
    }


    async start() {

        const elements =
            document.querySelectorAll(
                ".welcome-hidden"
            );


        for (const element of elements) {

            await this.wait(
                180 + Math.random() * 140
            );

            element.classList.remove(
                "welcome-hidden"
            );

            element.classList.add(
                "welcome-visible"
            );
        }
    }


    wait(ms) {

        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );
    }
}