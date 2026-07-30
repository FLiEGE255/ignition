import "../styles/fullscreen.css";

export class FullscreenScreen {

    render() {

        const isMobile =
            window.matchMedia("(pointer: coarse)").matches ||
            window.innerWidth <= 768;

        const fullscreenMessage = isMobile
            ? "Tap screen to continue"
            : "Press F11 for Fullscreen";

        const continueMessage = isMobile
            ? "&gt; TAP TO CONTINUE &lt;"
            : "&gt; PRESS ENTER TO CONTINUE &lt;";

        return `
            <div class="fullscreen-screen" data-mobile="${isMobile}">

<pre class="fullscreen-dialog">
+--------------------------------------------------------+
|                    SYSTEM MESSAGE                      |
+--------------------------------------------------------+

               ${fullscreenMessage}

----------------------------------------------------------
</pre>

<div class="continue-line">
    <span class="blink">${continueMessage}</span>
</div>

<pre class="fullscreen-dialog">
----------------------------------------------------------
</pre>

            </div>
        `;

    }

}