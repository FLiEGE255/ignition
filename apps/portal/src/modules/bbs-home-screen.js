import "../styles/login.css";

import { BbsHomeRenderer } from "../renderer/bbs-home-renderer.js";

export class BbsHomeScreen {

    render() {
        return `
            <div class="login-screen">
                <canvas id="bbs-home-canvas"></canvas>
            </div>
        `;
    }

    async start() {
        const canvas = document.getElementById("bbs-home-canvas");

        const renderer = new BbsHomeRenderer(canvas);

        await renderer.initialize();
        await renderer.play();
    }

}