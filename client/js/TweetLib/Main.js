"use strict";

var appManager = new AppManager();

window.addEventListener("load", function () {
    var uiDiv = document.getElementsByClassName("tweet-client")[0];
    appManager.init(uiDiv);
});
