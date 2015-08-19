"use strict";

(function() {
    var tweetLoader = new TweetLoader();
    var tweetUI = new TweetUI();
    var queryParser = new QueryParser();

    var mentionFilter = new CheckboxFilter("mention", function (tweet) {
        return tweet.mentions;
    }, function (str) {
        return '@'.concat(str);
    });

    var hashtagFilter = new CheckboxFilter("hashtag", function (tweet) {
        return tweet.hashtags;
    }, function (str) {
        return '#'.concat(str);
    });

    var inputAvailableCallback = function (e) {
        if (e.keyCode == 13) {
            var query = tweetUI.getInput();
            var parsedQuery = queryParser.parseQuery(query);
            tweetLoader.loadTweets(parsedQuery);
        }
    };

    var loadingCompletedCallback = function (data, error) {
        console.log(data, error);
        if (data) {
            data.loadInside(tweetUI.centerPane);
            hashtagFilter.reset();
            hashtagFilter.extractTags(data);
            hashtagFilter.loadInside(tweetUI.leftPane);

            mentionFilter.reset();
            mentionFilter.extractTags(data);
            mentionFilter.loadInside(tweetUI.rightPane)
        } else {
            TweetUI.displayMessage(error);
        }
    };

    var applyFiltersCallback = function (e) {
        console.log(e);

        var tweetList = tweetLoader.tweetList;
        tweetList.hide();
        var filteredList = hashtagFilter.returnFilteredElements(tweetList);
        var filteredList = mentionFilter.returnFilteredElements(filteredList);
        filteredList.show();
    };

    window.addEventListener("load", function () {
        var uiDiv = document.querySelector(".tweet-client");

        tweetUI.loadInside(uiDiv);
        
        tweetUI.registerInputAvailableCallback(inputAvailableCallback);
        tweetLoader.registerLoadingCompletedCallback(loadingCompletedCallback)
        hashtagFilter.registerReloadCallback(applyFiltersCallback);
        mentionFilter.registerReloadCallback(applyFiltersCallback);
    });
})();
