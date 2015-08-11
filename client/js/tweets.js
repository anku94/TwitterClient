"use strict";

(function() {
    function loadTweets(userName) {
        if(userName.length < 1) {
            return;
        }

        if(userName.startsWith("@")) {
            userName = userName.slice(1, userName.length);
        }

        tweetDisplay.waiting();

        tweetModels.getTweets(userName, function(tweetData) {
            var tweets = tweetModels.parseTweets(tweetData);
            tweetDisplay.display(tweets);
        }, function() {
            tweetDisplay.displayError();
        });
    };

    window.addEventListener("load", function() {
        tweetDisplay.initUI();

        var textbox = document.querySelector("#tweets-username_input");

        textbox.addEventListener("keypress", function(e) {
            if(e.which == 13) {
                loadTweets(textbox.value);
            }
        });
    });
})();
