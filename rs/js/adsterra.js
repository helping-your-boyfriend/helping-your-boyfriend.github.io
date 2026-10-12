(function () {
    "use strict";

    // Static pages navigate with full document loads. This lock also makes
    // repeated script inclusion and back/forward cache restoration harmless.
    if (window.__helpingBoyfriendAdsInitialized) {
        return;
    }
    window.__helpingBoyfriendAdsInitialized = true;

    var assetBase = new URL("../ads/", document.currentScript.src);
    var mobile = window.matchMedia("(max-width: 767px)").matches;
    var bannerSlot = document.querySelector("[data-adsterra-banner]");
    var nativeSlot = document.querySelector("[data-adsterra-native]");

    function label(slot) {
        var text = document.createElement("span");
        text.className = "ad-label";
        text.textContent = "Advertisement";
        slot.appendChild(text);
    }

    function trackFailure(script, slot) {
        script.addEventListener("error", function () {
            slot.dataset.adsterraStatus = "unavailable";
        }, { once: true });
    }

    if (bannerSlot) {
        label(bannerSlot);
        var width = mobile ? 320 : 728;
        var height = mobile ? 50 : 90;
        var frame = document.createElement("div");
        frame.className = "ad-banner-frame";
        frame.style.width = width + "px";
        frame.style.minHeight = height + "px";
        var banner = document.createElement("iframe");
        banner.title = "Advertisement";
        banner.width = width;
        banner.height = height;
        banner.setAttribute("scrolling", "no");
        // The chosen document contains the supplied GET CODE verbatim. Its
        // parser-time script/document.write cannot replace the site's document.
        banner.src = new URL(mobile ? "banner-mobile.html" : "banner-desktop.html", assetBase).href;
        frame.appendChild(banner);
        bannerSlot.appendChild(frame);

        function fitBanner() {
            // Fit narrow content columns without cropping the ad or loading
            // the other unit when the viewport changes during this visit.
            banner.style.transform = "scale(" + Math.min(1, frame.clientWidth / width) + ")";
        }
        fitBanner();
        if (typeof ResizeObserver !== "undefined") {
            new ResizeObserver(fitBanner).observe(frame);
        } else {
            window.addEventListener("resize", fitBanner, { passive: true });
        }
    }

    if (nativeSlot) {
        label(nativeSlot);
        var nativeContainer = document.createElement("div");
        nativeContainer.id = "container-cb6801a6bea9d6ddda5aec31a1b6b040";
        nativeSlot.appendChild(nativeContainer);
        var nativeScript = document.createElement("script");
        nativeScript.setAttribute("async", "async");
        nativeScript.setAttribute("data-cfasync", "false");
        nativeScript.src = "https://bauval.org/21/cb6801a6bea9d6ddda5aec31a1b6b040";
        trackFailure(nativeScript, nativeSlot);
        nativeSlot.insertBefore(nativeScript, nativeContainer);
    }

    // Global initialization lives here, never in a page's content slot.
    var socialScript = document.createElement("script");
    socialScript.setAttribute("data-cfasync", "false");
    socialScript.src = "https://bauval.org/14/acbf61750fac53c605d55a29db16f4c2";
    socialScript.async = false;
    trackFailure(socialScript, document.body);
    document.body.appendChild(socialScript);
})();
