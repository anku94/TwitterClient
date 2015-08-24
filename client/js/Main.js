"use strict";

(function() {
    var tweetLoader = new TweetLoader();
    var tweetUI = new TweetUI();
    var displayManager = new DisplayManager();

    window.addEventListener("load", function () {
        var uiDiv = document.getElementsByClassName("tweet-client")[0];

        tweetUI.render(uiDiv);
        tweetUI.setInputCallback(tweetLoader.loadTweets.bind(tweetLoader));
        tweetLoader.setOnloadCallback(displayManager.load.bind(displayManager, tweetUI));
    });
})();
