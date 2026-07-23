export class BootManager {

    constructor(app) {

        this.app = app;

    }

    async run() {

        const t = this.app.terminal;

        t.println("Genesis OS Bootloader v0.4.0");
        t.println("");

        await this.step("Power On", 700);
        await this.step("Memory Test", 900);
        await this.step("CPU Check", 800);
        await this.step("Loading Kernel", 1200);
        await this.step("Loading Services", 900);
        await this.step("Registering Commands", 800);
        await this.step("Connecting NODE0", 1400);
        await this.step("Opening Terminal", 1000);

        t.println("");
        t.println("Genesis OS 0.4.0");
        t.println("Running iGNiTiON Network");
        t.println("");
        t.println("READY");
        t.println("");

        // READY 3 Sekunden stehen lassen
        await new Promise(resolve => setTimeout(resolve, 3000));

    }

    async step(text, delay) {

        this.app.terminal.println(
            text.padEnd(28, ".") + " OK"
        );

        await new Promise(resolve => setTimeout(resolve, delay));

    }

}