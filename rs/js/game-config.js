/* Homepage browser player. Leave this string empty to restore the placeholder.
   The iframe is created only after Play Now is clicked. */
window.HELPING_YOUR_BOYFRIEND_EMBED_URL = "https://static.kingdomofmarionettes.org/games/helping-your-boyfriend/index.html";

(function () {
    var raw = window.HELPING_YOUR_BOYFRIEND_EMBED_URL;
    var stage = document.getElementById("player-stage");
    var gate = document.getElementById("player-gate");
    var placeholder = document.getElementById("player-placeholder");
    var playButton = document.getElementById("player-play");
    var controls = document.querySelectorAll("[data-player-control]");

    function isHttpsUrl(value) {
        if (typeof value !== "string") {
            return false;
        }
        var trimmed = value.trim();
        if (!trimmed) {
            return false;
        }
        try {
            return new URL(trimmed).protocol === "https:";
        } catch (err) {
            return false;
        }
    }

    function setControls(enabled) {
        controls.forEach(function (el) {
            if (enabled) {
                el.classList.remove("is-disabled");
                el.removeAttribute("aria-disabled");
                el.setAttribute("tabindex", "0");
                if (el.id === "half-expand") {
                    el.setAttribute("aria-label", "Theater mode");
                }
                if (el.id === "expand") {
                    el.setAttribute("aria-label", "Fullscreen");
                }
            } else {
                el.classList.add("is-disabled");
                el.setAttribute("aria-disabled", "true");
                el.setAttribute("tabindex", "-1");
            }
        });
    }

    function showPlaceholder() {
        if (gate) {
            gate.hidden = true;
        }
        if (placeholder) {
            placeholder.hidden = false;
        }
        setControls(false);
    }

    function mountPlayer() {
        if (!stage || !isHttpsUrl(raw) || document.getElementById("iframehtml5")) {
            return;
        }
        var iframe = document.createElement("iframe");
        iframe.id = "iframehtml5";
        iframe.title = "Helping Your Boyfriend";
        iframe.loading = "eager";
        iframe.allowFullscreen = true;
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("allow", "fullscreen; autoplay; gamepad; clipboard-write");
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        iframe.setAttribute("src", raw.trim());
        stage.textContent = "";
        stage.appendChild(iframe);
        setControls(true);
    }

    if (!stage) {
        return;
    }

    if (!isHttpsUrl(raw)) {
        showPlaceholder();
        return;
    }

    if (gate) {
        gate.hidden = false;
    }
    if (placeholder) {
        placeholder.hidden = true;
    }
    setControls(false);
    if (playButton) {
        playButton.addEventListener("click", mountPlayer);
    }
})();
