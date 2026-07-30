import desktopImage from "../assets/images/bbs-home-v1.png";

export class BbsHomeRenderer {

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.image = new Image();
        this.image.src = desktopImage;

        this.handleResize = () => {

            this.resize();

            this.draw(
                this.image.height
            );
        };
    }


    async initialize() {

        await this.image.decode();

        this.resize();

        window.addEventListener(
            "resize",
            this.handleResize
        );
    }


    resize() {

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;

        this.ctx =
            this.canvas.getContext("2d");

        /*
         * ASCII-/Pixel-Artwork nicht weichzeichnen.
         */
        this.ctx.imageSmoothingEnabled =
            false;
    }


    calculateSize() {

        const imageRatio =
            this.image.width /
            this.image.height;

        const maxWidth =
            this.canvas.width * 0.94;

        const maxHeight =
            this.canvas.height * 0.92;

        let drawWidth;
        let drawHeight;


        if (
            imageRatio >
            (maxWidth / maxHeight)
        ) {

            drawWidth =
                maxWidth;

            drawHeight =
                drawWidth /
                imageRatio;

        } else {

            drawHeight =
                maxHeight;

            drawWidth =
                drawHeight *
                imageRatio;
        }


        const x =
            (
                this.canvas.width -
                drawWidth
            ) / 2;

        const y =
            (
                this.canvas.height -
                drawHeight
            ) / 2;


        return {
            x,
            y,
            drawWidth,
            drawHeight
        };
    }


    draw(lines) {

        const {
            x,
            y,
            drawWidth,
            drawHeight
        } = this.calculateSize();


        /*
         * Canvas leeren.
         */
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        /*
         * Aktuell sichtbare Höhe des Artworks.
         */
        const visibleHeight =
            drawHeight *
            (
                lines /
                this.image.height
            );


        /*
         * =====================================================
         * ORIGINAL ARTWORK
         * =====================================================
         *
         * Wird weiterhin zeilenweise aufgebaut.
         */
        this.ctx.drawImage(
            this.image,

            0,
            0,
            this.image.width,
            lines,

            x,
            y,
            drawWidth,
            visibleHeight
        );


        /*
         * =====================================================
         * CLEAN UI TEXT
         * =====================================================
         *
         * Die saubere Schrift wird bereits während
         * des Scanline-Aufbaus gezeichnet.
         *
         * Dadurch gibt es am Ende KEINEN sichtbaren
         * Wechsel von alter zu neuer Schrift mehr.
         */
        this.drawCleanText(
            x,
            y,
            drawWidth,
            drawHeight,
            lines
        );
    }


    drawCleanText(
        x,
        y,
        drawWidth,
        drawHeight,
        lines
    ) {

        /*
         * Originalgröße des Artworks.
         */
        const baseWidth = 1600;
        const baseHeight = 960;


        const sx =
            drawWidth /
            baseWidth;

        const sy =
            drawHeight /
            baseHeight;


        const px = value =>
            x + value * sx;

        const py = value =>
            y + value * sy;


        /*
         * Aktuelle Scanposition innerhalb
         * des Originalbildes.
         */
        const scanY =
            lines;


        const RED =
            "#ff1717";

        const YELLOW =
            "#e4cc00";

        const BLACK =
            "#000000";


        /*
         * =====================================================
         * HELFER: BEREICH SCHWÄRZEN
         * =====================================================
         */

        const clearArea = (
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight
        ) => {

            this.ctx.fillStyle =
                BLACK;

            this.ctx.fillRect(
                px(sourceX),
                py(sourceY),
                sourceWidth * sx,
                sourceHeight * sy
            );
        };


        /*
         * =====================================================
         * HELFER: TEXT
         * =====================================================
         */

        const text = (
            value,
            sourceX,
            sourceY,
            color = YELLOW,
            size = 26,
            align = "left"
        ) => {

            this.ctx.save();

            this.ctx.fillStyle =
                color;

            /*
             * Saubere Terminal-Schrift.
             */
            this.ctx.font =
                `500 ${size * sy}px "Courier New", Consolas, monospace`;

            this.ctx.textAlign =
                align;

            this.ctx.textBaseline =
                "middle";

            this.ctx.fillText(
                value,
                px(sourceX),
                py(sourceY)
            );

            this.ctx.restore();
        };


        /*
         * =====================================================
         * BOOT BOX
         * =====================================================
         */

        if (scanY >= 574) {

            /*
             * Nur den Bereich schwärzen,
             * den der Scan bereits erreicht hat.
             */
            const visibleBootHeight =
                Math.min(
                    202,
                    scanY - 574
                );


            clearArea(
                112,
                574,
                790,
                visibleBootHeight
            );


            const bootRows = [

                [
                    "POWER ON",
                    "[ OK ]"
                ],

                [
                    "MEMORY TEST",
                    "[ OK ]"
                ],

                [
                    "CPU CHECK",
                    "[ OK ]"
                ],

                [
                    "GENESIS OS KERNEL",
                    "[ OK ]"
                ],

                [
                    "SYSTEM SERVICES",
                    "[ OK ]"
                ],

                [
                    "NETWORK STACK",
                    "[ OK ]"
                ]
            ];


            const bootStartY =
                595;

            const bootStep =
                32;


            bootRows.forEach(
                ([label, status], index) => {

                    const rowY =
                        bootStartY +
                        index * bootStep;


                    /*
                     * Zeile erst zeichnen,
                     * wenn die Scanline sie erreicht hat.
                     */
                    if (
                        scanY <
                        rowY + 12
                    ) {
                        return;
                    }


                    text(
                        label,
                        126,
                        rowY,
                        YELLOW,
                        25
                    );


                    text(
                        "........................",
                        395,
                        rowY,
                        YELLOW,
                        21
                    );


                    text(
                        status,
                        804,
                        rowY,
                        RED,
                        24
                    );
                }
            );
        }


        /*
         * =====================================================
         * RECHTE SYSTEMBOX OBEN
         * =====================================================
         */

        if (scanY >= 575) {

            const visibleInfoHeight =
                Math.min(
                    158,
                    scanY - 575
                );


            clearArea(
                1025,
                575,
                480,
                visibleInfoHeight
            );


            if (scanY >= 620) {

                text(
                    "iGNiTiON BBS v1.0",
                    1045,
                    608,
                    YELLOW,
                    24
                );
            }


            if (scanY >= 661) {

                text(
                    "NODE0  ●  1986",
                    1045,
                    649,
                    YELLOW,
                    24
                );
            }


            if (scanY >= 702) {

                text(
                    "SECURE SESSION",
                    1045,
                    690,
                    YELLOW,
                    24
                );
            }
        }


        /*
         * =====================================================
         * RECHTE STATUSBOX
         * =====================================================
         */

        if (scanY >= 741) {

            const visibleStatusHeight =
                Math.min(
                    120,
                    scanY - 741
                );


            clearArea(
                1025,
                741,
                480,
                visibleStatusHeight
            );


            /*
             * LAST LOGIN
             */
            if (scanY >= 785) {

                text(
                    "LAST LOGIN",
                    1045,
                    773,
                    YELLOW,
                    23
                );

                text(
                    ":",
                    1215,
                    773,
                    YELLOW,
                    23
                );

                text(
                    "NEVER",
                    1260,
                    773,
                    RED,
                    23
                );
            }


            /*
             * SECURITY
             */
            if (scanY >= 818) {

                text(
                    "SECURITY",
                    1045,
                    806,
                    YELLOW,
                    23
                );

                text(
                    ":",
                    1215,
                    806,
                    YELLOW,
                    23
                );

                text(
                    "ANSI ENABLED",
                    1260,
                    806,
                    RED,
                    23
                );
            }


            /*
             * STATUS
             */
            if (scanY >= 851) {

                text(
                    "STATUS",
                    1045,
                    839,
                    YELLOW,
                    23
                );

                text(
                    ":",
                    1215,
                    839,
                    YELLOW,
                    23
                );

                text(
                    "ONLINE",
                    1260,
                    839,
                    RED,
                    23
                );
            }
        }


        /*
         * =====================================================
         * READY-BEREICH
         * =====================================================
         */

        if (scanY >= 780) {

            const visibleReadyHeight =
                Math.min(
                    82,
                    scanY - 780
                );


            clearArea(
                115,
                780,
                785,
                visibleReadyHeight
            );


            if (scanY >= 818) {

                text(
                    "READY FOR CONNECTIONS",
                    505,
                    806,
                    YELLOW,
                    25,
                    "center"
                );
            }


            if (scanY >= 851) {

                text(
                    "PRESS ENTER TO CONTINUE",
                    505,
                    839,
                    RED,
                    25,
                    "center"
                );
            }
        }


        /*
         * =====================================================
         * HAUPTMENÜ
         * =====================================================
         */

        if (scanY >= 891) {

            const visibleMenuHeight =
                Math.min(
                    54,
                    scanY - 891
                );


            clearArea(
                28,
                891,
                1544,
                visibleMenuHeight
            );


            /*
             * Menü erst dann zeichnen,
             * wenn die Scanline weit genug
             * durch die Zeile gelaufen ist.
             */
            if (scanY >= 936) {

                text(
                    "[1]  LOGIN",
                    52,
                    919,
                    RED,
                    24
                );


                text(
                    "[2]  NEW USER",
                    347,
                    919,
                    RED,
                    24
                );


                text(
                    "[3]  INFO",
                    660,
                    919,
                    RED,
                    24
                );


                text(
                    "[4]  HELP",
                    945,
                    919,
                    RED,
                    24
                );


                text(
                    "[5]  GUEST",
                    1160,
                    919,
                    RED,
                    24
                );


                text(
                    "F1=HELP",
                    1545,
                    919,
                    RED,
                    23,
                    "right"
                );
            }
        }
    }


    async play() {

        const totalLines =
            this.image.height;


        /*
         * =====================================================
         * SCANLINE BUILD
         * =====================================================
         */

        for (
            let line = 1;
            line <= totalLines;
            line += 2
        ) {

            this.draw(
                line
            );


            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        1
                    )
            );


            /*
             * Kleine zufällige Pausen für
             * alten BBS-/Terminal-Look.
             */
            if (
                Math.random() <
                0.015
            ) {

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            20
                        )
                );
            }
        }


        /*
         * Finalen Zustand garantiert
         * vollständig zeichnen.
         */
        this.draw(
            totalLines
        );
    }


    destroy() {

        window.removeEventListener(
            "resize",
            this.handleResize
        );
    }
}