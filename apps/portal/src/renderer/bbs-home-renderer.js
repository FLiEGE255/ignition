import homeImage from "../assets/images/bbs-home-v1.png";

export class BbsHomeRenderer {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.image = new Image();
        this.image.src = homeImage;
    }

    async initialize() {
        await this.image.decode();

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
            this.draw(this.image.height);
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    calculateSize() {
        const imageRatio = this.image.width / this.image.height;

        const maxWidth = this.canvas.width * 0.94;
        const maxHeight = this.canvas.height * 0.92;

        let drawWidth;
        let drawHeight;

        if (imageRatio > (maxWidth / maxHeight)) {
            drawWidth = maxWidth;
            drawHeight = drawWidth / imageRatio;
        } else {
            drawHeight = maxHeight;
            drawWidth = drawHeight * imageRatio;
        }

        const x = (this.canvas.width - drawWidth) / 2;
        const y = (this.canvas.height - drawHeight) / 2;

        return {
            x,
            y,
            drawWidth,
            drawHeight
        };
    }

    draw(lines) {
        const { x, y, drawWidth, drawHeight } = this.calculateSize();

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

    async play() {
        const totalLines = this.image.height;

        for (let line = 1; line <= totalLines; line += 2) {
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

        // Letzte Bildzeile garantiert vollständig anzeigen
        this.draw(totalLines);
    }

}