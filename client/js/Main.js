"use strict";

(function() {
    var tweetLoader = new TweetLoader();
    var tweetUI = new TweetUI();
    var filteredDisplay = new FilteredDisplay();

    window.addEventListener("load", function () {
        var uiDiv = document.querySelector(".tweet-client");

        tweetUI.loadInside(uiDiv);
        tweetUI.registerInputAvailableCallback(tweetLoader.loadTweets.bind(tweetLoader));
        tweetLoader.registerLoadingCompletedCallback(filteredDisplay.load.bind(filteredDisplay, tweetUI));
    });
})();
