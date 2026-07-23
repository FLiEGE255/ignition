import loginImage from "../assets/images/login-screen-v2.png";

export class LoginRenderer {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.image = new Image();
        this.image.src = loginImage;
    }

    async initialize() {
        await this.image.decode();

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
            this.draw(this.image.height);
            this.updateInputPosition();
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    calculateSize() {
        const imageRatio =
            this.image.width / this.image.height;

        const maxWidth =
            this.canvas.width * 0.94;

        const maxHeight =
            this.canvas.height * 0.92;

        let drawWidth;
        let drawHeight;

        if (imageRatio > (maxWidth / maxHeight)) {

            drawWidth = maxWidth;
            drawHeight = drawWidth / imageRatio;

        } else {

            drawHeight = maxHeight;
            drawWidth = drawHeight * imageRatio;
        }

        const x =
            (this.canvas.width - drawWidth) / 2;

        const y =
            (this.canvas.height - drawHeight) / 2;

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

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        const visibleHeight =
            drawHeight * (lines / this.image.height);

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
    }

    updateInputPosition() {
        const handle =
            document.querySelector(".login-handle");

        const password =
            document.querySelector(".login-password");

        const status =
            document.querySelector(".login-status");

        if (!handle || !password) {
            return;
        }

        const {
            x,
            y,
            drawWidth,
            drawHeight
        } = this.calculateSize();


        /*
         * HANDLE / PASSWORD
         *
         * SITZT.
         * NICHT MEHR ANFASSEN.
         */

        const fieldLeft = 0.342;
        const fieldWidth = 0.375;

        const handleTop = 0.482;
        const passwordTop = 0.582;

        const fieldHeight = 0.065;


        handle.style.left =
            `${x + drawWidth * fieldLeft}px`;

        handle.style.top =
            `${y + drawHeight * handleTop}px`;

        handle.style.width =
            `${drawWidth * fieldWidth}px`;

        handle.style.height =
            `${drawHeight * fieldHeight}px`;


        password.style.left =
            `${x + drawWidth * fieldLeft}px`;

        password.style.top =
            `${y + drawHeight * passwordTop}px`;

        password.style.width =
            `${drawWidth * fieldWidth}px`;

        password.style.height =
            `${drawHeight * fieldHeight}px`;


        /*
         * NODE0 STATUS
         *
         * Position wird jetzt über den
         * MITTELPUNKT bestimmt.
         *
         * 0.50 = horizontale Bildmitte
         *
         * Keine künstliche Statusbox mehr.
         */

        if (status) {

            const statusCenterX = 0.50;
            const statusCenterY = 0.775;

            status.style.left =
                `${x + drawWidth * statusCenterX}px`;

            status.style.top =
                `${y + drawHeight * statusCenterY}px`;
        }
    }

    async play() {
        const totalLines =
            this.image.height;

        for (
            let line = 1;
            line <= totalLines;
            line += 2
        ) {
            this.draw(line);

            await new Promise(resolve =>
                setTimeout(resolve, 1)
            );

            if (Math.random() < 0.015) {

                await new Promise(resolve =>
                    setTimeout(resolve, 20)
                );
            }
        }

        this.draw(totalLines);

        this.updateInputPosition();
    }

}