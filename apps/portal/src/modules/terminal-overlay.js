import "../styles/terminal-overlay.css";

export class TerminalOverlay {

    render() {

        return `
            <div class="terminal-overlay">

                <div class="login-input">

                    <span class="label">HANDLE:</span>

                    <span id="handle-value"></span>

                    <span class="cursor">█</span>

                </div>

            </div>
        `;

    }

}