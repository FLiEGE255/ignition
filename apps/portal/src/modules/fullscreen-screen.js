import "../styles/fullscreen.css";

export class FullscreenScreen {

    render() {

        return `
            <div class="fullscreen-screen">

<pre class="fullscreen-dialog">
+--------------------------------------------------------+
|                    SYSTEM MESSAGE                      |
+--------------------------------------------------------+

               Press F11 for Fullscreen

----------------------------------------------------------
</pre>

<div class="continue-line">
    <span class="blink">&gt; PRESS ENTER TO CONTINUE &lt;</span>
</div>

<pre class="fullscreen-dialog">
----------------------------------------------------------
</pre>

            </div>
        `;

    }

}