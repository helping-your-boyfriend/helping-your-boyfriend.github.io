$(document).ready(function () {
    var $toggle = $(".icon-menu-mobile");
    var $menu = $("#mobile-dropdown");

    function closeMenu() {
        $menu.removeClass("is-open").slideUp(200);
        $toggle.attr("aria-expanded", "false");
        $toggle.attr("aria-label", "Open menu");
    }

    $toggle.on("click", function () {
        if ($menu.hasClass("is-open")) {
            closeMenu();
            return;
        }
        $menu.addClass("is-open").slideDown(200);
        $toggle.attr("aria-expanded", "true");
        $toggle.attr("aria-label", "Close menu");
    });

    $menu.find("a").on("click", function () {
        closeMenu();
    });

    $(document).on("keydown", function (event) {
        if (event.key === "Escape" && $menu.hasClass("is-open")) {
            closeMenu();
            $toggle.trigger("focus");
        }
    });

    $("#half-expand").on("click", function () {
        theaterMode();
    });

    $("#half-expand, #expand, #_exit_full_screen").on("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            $(this).trigger("click");
        }
    });
});

function playerFrame() {
    return document.getElementById("iframehtml5");
}

function theaterMode() {
    var iframe = playerFrame();
    if (!iframe) {
        return;
    }
    if (iframe.classList.contains("force_half_full_screen")) {
        iframe.classList.remove("force_half_full_screen");
        document.body.style.overflow = "unset";
        document.querySelector(".header-game").classList.remove("header_game_enable_half_full_screen");
        document.querySelector("body").setAttribute("style", "");
    } else {
        var above = 0;
        var left = 0;
        var below = document.querySelector(".header-game").clientHeight;
        if (!document.querySelector("#style-append")) {
            var styleElement = document.createElement("style");
            styleElement.type = "text/css";
            styleElement.setAttribute("id", "style-append");
            styleElement.innerHTML = `
        .force_half_full_screen{
        position: fixed!important;
        top: 0!important;
        left: 0!important;
        z-index: 887;
        top:${above}px!important;
        left:${left}px!important;
        width:calc(100% - ${left}px)!important;
        height:calc(100% - ${above + below}px)!important;
        background-color:#000;
        }
        .header_game_enable_half_full_screen{
            position:fixed;
            left:${left}px!important;
            bottom:0!important;
            right:0!important;
            z-index:887!important;
            width:calc(100% - ${left}px)!important;
            padding-left:10px;
            padding-right:10px;
        }
        @media (max-width: 1364px){
            .force_half_full_screen{
                left:0!important;
                width:100%!important;
            }
            .header_game_enable_half_full_screen{
                width:100%!important;
                left:0!important;
            }
        }`;
            document.querySelector("head").appendChild(styleElement);
        }
        document.querySelector("body").setAttribute("style", "overflow:hidden");
        iframe.classList.add("force_half_full_screen");
        document.querySelector(".header-game").classList.add("header_game_enable_half_full_screen");
    }
}

$("#expand").on("click", function () {
    if (!playerFrame()) {
        return;
    }
    $("#iframehtml5").addClass("force_full_screen");
    $("#_exit_full_screen").removeClass("hidden");
    requestFullScreen(document.body);
});

$("#_exit_full_screen").on("click", cancelFullScreen);

function requestFullScreen(element) {
    if (!playerFrame()) {
        return;
    }
    $("#iframehtml5").removeClass("force_half_full_screen");
    $(".header-game").removeClass("header_game_enable_half_full_screen");
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function cancelFullScreen() {
    $("#_exit_full_screen").addClass("hidden");
    $("#iframehtml5").removeClass("force_full_screen");
    $("#iframehtml5").removeClass("force_half_full_screen");
    $(".header-game").removeClass("header_game_enable_half_full_screen");
    document.querySelector("body").setAttribute("style", "");
    document.body.style.overflow = "unset";
    var requestMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.exitFullscreen;
    if (requestMethod) {
        requestMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

if (document.addEventListener) {
    document.addEventListener("webkitfullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);
}

function exitHandler() {
    var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (!fullscreenElement) {
        $("#_exit_full_screen").addClass("hidden");
        $("#iframehtml5").removeClass("force_full_screen");
        $("#iframehtml5").removeClass("force_half_full_screen");
        $(".header-game").removeClass("header_game_enable_half_full_screen");
        if (document.body) {
            document.body.style.overflow = "unset";
        }
    }
}
