import "../styles/login.css";
import "../styles/bbs-home-mobile.css";

import { BbsHomeRenderer } from "../renderer/bbs-home-renderer.js";
import mobileHero from "../assets/images/bbs-home-mobile-hero.png";

export class BbsHomeScreen {

    constructor() {

        this.renderer = null;
        this.mobileAnimationRunning = false;

        this.isMobile = window.matchMedia(
            "(max-width: 768px), (pointer: coarse)"
        ).matches;
    }


    render() {

        /*
         * =====================================================
         * MOBILE
         * =====================================================
         */

        if (this.isMobile) {

            return `
                <main class="bbs-mobile-main">

                    <div class="bbs-mobile-reveal">

                        <section class="bbs-mobile-hero">

                            <img
                                class="bbs-mobile-hero-image"
                                src="${mobileHero}"
                                alt="iGNiTiON Network"
                                draggable="false"
                            >

                        </section>


                        <section class="bbs-mobile-terminal">

                            <div class="bbs-mobile-terminal-row">
                                <span>Initializing NODE0</span>
                                <span class="bbs-dots"></span>
                                <span class="red">OK</span>
                            </div>

                            <div class="bbs-mobile-terminal-row">
                                <span>Loading Genesis OS</span>
                                <span class="bbs-dots"></span>
                                <span class="red">OK</span>
                            </div>

                            <div class="bbs-mobile-terminal-row">
                                <span>Checking Network</span>
                                <span class="bbs-dots"></span>
                                <span class="red">OK</span>
                            </div>

                            <div class="bbs-mobile-terminal-row">
                                <span>Establishing Link</span>
                                <span class="bbs-dots"></span>
                                <span class="red">OK</span>
                            </div>


                            <div class="bbs-mobile-ready">

                                <span>
                                    SYSTEM READY
                                </span>

                                <span class="red">
                                    WELCOME TO iGNiTiON
                                </span>

                            </div>

                        </section>


                        <section class="bbs-mobile-system">

                            <div>
                                <span>SYSTEM</span>
                                <strong>GENESIS OS</strong>
                            </div>

                            <div>
                                <span>NODE</span>
                                <strong>NODE0</strong>
                            </div>

                            <div>
                                <span>NETWORK</span>
                                <strong>iGNiTiON</strong>
                            </div>

                            <div>
                                <span>STATUS</span>
                                <strong class="online">
                                    ONLINE
                                </strong>
                            </div>

                        </section>


                        <section class="bbs-mobile-menu">

                            <div class="bbs-mobile-menu-title">
                                MAIN MENU
                            </div>

                            <div class="bbs-mobile-menu-grid">

                                <span>[ 1 ] LOGIN</span>
                                <span>[ 2 ] GUEST</span>

                                <span>[ 3 ] SYSTEM</span>
                                <span>[ 4 ] NETWORK</span>

                            </div>

                        </section>


                        <section class="bbs-mobile-enter">

                            <span class="red">&gt;</span>

                            TAP TO CONTINUE

                            <span class="red">&lt;</span>

                        </section>


                        <footer class="bbs-mobile-footer">

                            iGNiTiON NETWORK // ONLINE SINCE 1986

                        </footer>

                    </div>

                </main>
            `;
        }


        /*
         * =====================================================
         * DESKTOP
         * =====================================================
         */

        return `
            <div class="bbs-home-screen">
                <canvas id="bbs-home-canvas"></canvas>
            </div>
        `;
    }


    async start() {

        /*
         * =====================================================
         * MOBILE
         * =====================================================
         */

        if (this.isMobile) {

            const reveal =
                document.querySelector(
                    ".bbs-mobile-reveal"
                );

            const hero =
                document.querySelector(
                    ".bbs-mobile-hero-image"
                );


            if (!reveal) {

                console.error(
                    "BBS HOME MOBILE: Reveal wurde nicht gefunden."
                );

                return;
            }


            /*
             * Reveal sofort vollständig schließen.
             *
             * Dadurch bleibt der Inhalt auch dann verborgen,
             * wenn Safari bereits einen Paint vorbereitet.
             */

            reveal.style.clipPath =
                "inset(0 0 100% 0)";

            reveal.style.webkitClipPath =
                "inset(0 0 100% 0)";


            /*
             * -------------------------------------------------
             * HERO LADEN
             * -------------------------------------------------
             */

            if (hero) {

                if (!hero.complete) {

                    await new Promise(resolve => {

                        hero.addEventListener(
                            "load",
                            resolve,
                            {
                                once: true
                            }
                        );

                        hero.addEventListener(
                            "error",
                            resolve,
                            {
                                once: true
                            }
                        );
                    });
                }


                if (
                    typeof hero.decode ===
                    "function"
                ) {

                    try {

                        await hero.decode();

                    } catch (error) {

                        console.warn(
                            "BBS HOME MOBILE: Hero decode() fehlgeschlagen.",
                            error
                        );
                    }
                }
            }


            /*
             * Browser Layout fertig berechnen lassen.
             */

            await new Promise(resolve => {

                requestAnimationFrame(() => {

                    requestAnimationFrame(
                        resolve
                    );
                });
            });


            /*
             * Tatsächliche Höhe nach vollständigem Layout
             * ermitteln.
             */

            const totalHeight =
                reveal.scrollHeight;


            /*
             * Reveal mit der exakten Pixelhöhe geschlossen
             * halten.
             */

            const initialClipValue =
                `inset(0 0 ${totalHeight}px 0)`;


            reveal.style.clipPath =
                initialClipValue;

            reveal.style.webkitClipPath =
                initialClipValue;


            /*
             * Kernel hat #app verborgen.
             * Jetzt übernimmt der Mobile-Screen.
             */

            const app =
                document.getElementById("app");

            if (app) {

                app.style.visibility =
                    "visible";
            }


            /*
             * Safari einen vollständigen sichtbaren Frame
             * geben.
             *
             * Der Inhalt bleibt dabei durch clip-path
             * vollständig verborgen.
             */

            await new Promise(resolve =>

                requestAnimationFrame(
                    resolve
                )
            );


            /*
             * =================================================
             * BBS SCAN
             * =================================================
             */

            let visibleHeight = 0;


            /*
             * Kleine Schritte + Pause ergeben den
             * langsamen alten Terminal-Aufbau.
             */

            const pixelsPerStep = 5;
            const stepDelay = 16;


            this.mobileAnimationRunning =
                true;


            while (
                visibleHeight < totalHeight &&
                this.mobileAnimationRunning
            ) {

                visibleHeight =
                    Math.min(
                        visibleHeight +
                        pixelsPerStep,
                        totalHeight
                    );


                const hiddenHeight =
                    totalHeight -
                    visibleHeight;


                const clipValue =
                    `inset(0 0 ${hiddenHeight}px 0)`;


                reveal.style.clipPath =
                    clipValue;

                reveal.style.webkitClipPath =
                    clipValue;


                /*
                 * Nächster Scan-Schritt.
                 */

                await new Promise(resolve =>

                    setTimeout(
                        resolve,
                        stepDelay
                    )
                );


                /*
                 * Kleine zufällige Modem/BBS-Hänger.
                 */

                if (
                    Math.random() <
                    0.018
                ) {

                    await new Promise(resolve =>

                        setTimeout(
                            resolve,
                            28
                        )
                    );
                }
            }


            /*
             * Scan fertig.
             */

            if (this.mobileAnimationRunning) {

                reveal.style.clipPath =
                    "none";

                reveal.style.webkitClipPath =
                    "none";
            }


            this.mobileAnimationRunning =
                false;


            return;
        }


        /*
         * =====================================================
         * DESKTOP
         * =====================================================
         *
         * Unser vorhandener Canvas-Renderer bleibt exakt
         * erhalten.
         */

        const canvas =
            document.getElementById(
                "bbs-home-canvas"
            );


        if (!canvas) {

            console.error(
                "BBS HOME: Canvas wurde nicht gefunden."
            );

            return;
        }


        this.renderer =
            new BbsHomeRenderer(
                canvas
            );


        await this.renderer.initialize();

        await this.renderer.play();
    }


    destroy() {

        /*
         * Mobile Scan stoppen.
         */

        this.mobileAnimationRunning =
            false;


        /*
         * Desktop Renderer.
         */

        if (this.renderer) {

            this.renderer.destroy();

            this.renderer = null;
        }
    }
}