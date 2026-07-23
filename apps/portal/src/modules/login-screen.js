import "../styles/login.css";

import { SessionService } from "../services/session-service.js";

export class LoginScreen {

    constructor() {
        this.handle = "";
        this.password = "";
        this.activeField = "handle";
        this.keyHandler = null;

        this.sessionService = new SessionService();
    }


    render() {
        return `
            <div class="login-screen">

                <div class="login-frame boot-hidden">

                    <header class="login-header boot-part">
                        <div>
                            <span class="red">iGNiTiON NETWORK</span>

                            <span class="header-separator">
                                //
                            </span>

                            <span class="yellow">
                                NODE0
                            </span>
                        </div>

                        <div class="red">
                            ONLINE SINCE 1986
                        </div>
                    </header>


                    <main class="login-main">

                        <section
                            class="connection-section boot-part"
                        >

                            <div class="connection-title">
                                ESTABLISHING SECURE CONNECTION...
                            </div>

                            <div class="connection-row">
                                <span>REMOTE NODE</span>

                                <span class="dots">
                                    ................
                                </span>

                                <span class="red">
                                    NODE0
                                </span>
                            </div>

                            <div class="connection-row">
                                <span>PROTOCOL</span>

                                <span class="dots">
                                    ................
                                </span>

                                <span class="red">
                                    GENESIS
                                </span>
                            </div>

                            <div class="connection-row">
                                <span>ENCRYPTION</span>

                                <span class="dots">
                                    ................
                                </span>

                                <span>
                                    ACTIVE
                                </span>
                            </div>

                        </section>


                        <div
                            class="section-divider boot-part"
                        ></div>


                        <section class="auth-section">

                            <div
                                class="auth-title boot-part"
                            >

                                <span class="auth-line"></span>

                                <span class="red">
                                    [ USER AUTHENTICATION ]
                                </span>

                                <span class="auth-line"></span>

                            </div>


                            <div
                                class="auth-row boot-part"
                            >

                                <div class="auth-label">
                                    HANDLE
                                    <span class="red">:</span>
                                </div>

                                <div class="auth-field">

                                    <span
                                        id="handle-value"
                                    ></span>

                                    <span
                                        id="handle-cursor"
                                        class="login-cursor hidden"
                                    ></span>

                                </div>

                            </div>


                            <div
                                class="auth-row boot-part"
                            >

                                <div class="auth-label">
                                    PASSWORD
                                    <span class="red">:</span>
                                </div>

                                <div class="auth-field">

                                    <span
                                        id="password-value"
                                    ></span>

                                    <span
                                        id="password-cursor"
                                        class="login-cursor hidden"
                                    ></span>

                                </div>

                            </div>


                            <div
                                class="connect-label red boot-part"
                            >
                                [ CONNECT ]
                            </div>


                            <div
                                id="login-status"
                                class="login-status boot-part"
                            ></div>


                            <div
                                class="authorized boot-part"
                            >

                                <span
                                    class="lock"
                                    aria-hidden="true"
                                ></span>

                                <span class="authorized-dots">
                                    ............
                                </span>

                                <span>
                                    AUTHORIZED USERS ONLY
                                </span>

                                <span class="authorized-dots">
                                    ............
                                </span>

                                <span
                                    class="lock"
                                    aria-hidden="true"
                                ></span>

                            </div>

                        </section>

                    </main>


                    <footer
                        class="login-footer boot-part"
                    >

                        <div>
                            <span>
                                SESSION:
                            </span>

                            <span class="footer-value">
                                WAITING
                            </span>
                        </div>


                        <div>
                            <span>
                                NODE0
                            </span>

                            <span class="online-dot"></span>

                            <span class="online">
                                ONLINE
                            </span>
                        </div>

                    </footer>

                </div>

            </div>
        `;
    }


    /*
     * =====================================================
     * SCREEN START / BUILD SEQUENCE
     * =====================================================
     */

    async start() {

        const frame =
            document.querySelector(".login-frame");

        if (!frame) {
            return;
        }


        /*
         * Äußerer Rahmen erscheint zuerst.
         */

        frame.classList.remove("boot-hidden");


        await this.wait(150);


        /*
         * Alle einzelnen Bildschirmteile holen.
         */

        const parts =
            Array.from(
                document.querySelectorAll(".boot-part")
            );


        /*
         * Sicherheit:
         * zunächst wirklich alles verstecken.
         */

        parts.forEach(part => {
            part.classList.add("boot-part-hidden");
        });


        /*
         * Kleine Pause nach dem Rahmen.
         */

        await this.wait(180);


        /*
         * NODE0 Screen Stück für Stück aufbauen.
         */

        for (const part of parts) {

            part.classList.remove(
                "boot-part-hidden"
            );

            part.classList.add(
                "boot-part-visible"
            );


            /*
             * Kleine zufällige Terminal-Verzögerung.
             */

            await this.wait(
                90 + Math.random() * 100
            );
        }


        /*
         * Kurze Pause vor Eingabefreigabe.
         */

        await this.wait(250);


        /*
         * Erst JETZT:
         *
         * Tastatur aktivieren
         * und roten Cursor anzeigen.
         */

        this.startInput();
    }


    wait(ms) {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );
    }


    /*
     * =====================================================
     * KEYBOARD INPUT
     * =====================================================
     */

    startInput() {

        /*
         * Doppelten EventListener verhindern.
         */

        if (this.keyHandler) {

            document.removeEventListener(
                "keydown",
                this.keyHandler
            );
        }


        this.keyHandler = (event) => {


            /*
             * TAB
             *
             * HANDLE <-> PASSWORD
             */

            if (event.key === "Tab") {

                event.preventDefault();

                this.activeField =
                    this.activeField === "handle"
                        ? "password"
                        : "handle";

                this.updateDisplay();

                return;
            }


            /*
             * ENTER
             */

            if (event.key === "Enter") {

                event.preventDefault();

                this.handleEnter();

                return;
            }


            /*
             * BACKSPACE
             */

            if (event.key === "Backspace") {

                event.preventDefault();

                this.handleBackspace();

                return;
            }


            /*
             * Sondertasten ignorieren.
             */

            if (event.key.length !== 1) {
                return;
            }


            /*
             * HANDLE
             */

            if (this.activeField === "handle") {

                if (this.handle.length >= 20) {
                    return;
                }

                this.handle += event.key;
            }


            /*
             * PASSWORD
             */

            else {

                if (this.password.length >= 32) {
                    return;
                }

                this.password += event.key;
            }


            this.updateDisplay();
        };


        document.addEventListener(
            "keydown",
            this.keyHandler
        );


        this.updateDisplay();
    }


    /*
     * =====================================================
     * ENTER
     * =====================================================
     */

    handleEnter() {

        /*
         * HANDLE bestätigt.
         */

        if (this.activeField === "handle") {

            if (this.handle.length === 0) {
                return;
            }


            this.activeField = "password";

            this.updateDisplay();

            return;
        }


        /*
         * PASSWORD bestätigt.
         */

        if (this.password.length === 0) {
            return;
        }


        this.submitLogin();
    }


    /*
     * =====================================================
     * BACKSPACE
     * =====================================================
     */

    handleBackspace() {

        if (this.activeField === "handle") {

            this.handle =
                this.handle.slice(0, -1);
        }

        else {

            this.password =
                this.password.slice(0, -1);
        }


        this.updateDisplay();
    }


    /*
     * =====================================================
     * DISPLAY
     * =====================================================
     */

    updateDisplay() {

        const handleValue =
            document.getElementById(
                "handle-value"
            );

        const passwordValue =
            document.getElementById(
                "password-value"
            );

        const handleCursor =
            document.getElementById(
                "handle-cursor"
            );

        const passwordCursor =
            document.getElementById(
                "password-cursor"
            );


        if (
            !handleValue ||
            !passwordValue ||
            !handleCursor ||
            !passwordCursor
        ) {
            return;
        }


        /*
         * HANDLE
         */

        handleValue.textContent =
            this.handle;


        /*
         * PASSWORD maskieren
         */

        passwordValue.textContent =
            "*".repeat(
                this.password.length
            );


        /*
         * Cursor
         */

        handleCursor.classList.toggle(
            "hidden",
            this.activeField !== "handle"
        );


        passwordCursor.classList.toggle(
            "hidden",
            this.activeField !== "password"
        );
    }


    /*
     * =====================================================
     * LOGIN
     * =====================================================
     */

    async submitLogin() {

        const status =
            document.getElementById(
                "login-status"
            );


        if (!status) {
            return;
        }


        /*
         * Während CONNECT:
         * keine Tastatureingaben.
         */

        document.removeEventListener(
            "keydown",
            this.keyHandler
        );


        /*
         * Cursor aus.
         */

        const handleCursor =
            document.getElementById(
                "handle-cursor"
            );

        const passwordCursor =
            document.getElementById(
                "password-cursor"
            );


        handleCursor?.classList.add(
            "hidden"
        );

        passwordCursor?.classList.add(
            "hidden"
        );


        /*
         * Verbindung simulieren.
         */

        status.textContent =
            "CONNECTING TO NODE0...";


        await this.wait(900);


        /*
         * SessionService
         */

        const result =
            await this.sessionService.login(
                this.handle,
                this.password
            );


        /*
         * LOGIN FEHLGESCHLAGEN
         */

        if (!result.success) {

            status.textContent =
                result.message;


            this.password = "";

            this.activeField =
                "password";


            this.startInput();

            return;
        }


        /*
         * LOGIN ERFOLGREICH
         */

        status.textContent =
            "ACCESS GRANTED";


        await this.wait(1200);


        console.log(
            "Authenticated session:",
            result.session
        );


        /*
         * NÄCHSTER SCHRITT:
         *
         * WELCOME BACK, FLiEGE
         *
         * ->
         *
         * HAUSORDNUNG
         *
         * ->
         *
         * MISSION CONTROL
         */
    }
}