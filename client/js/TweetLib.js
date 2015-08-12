"use strict";

var TweetLib = function() {
    this.tweetUI = new TweetUI();
    this.apiClient = new ApiClient("http://localhost:5000");

    this.callbacksRemaining = 0;
    this.errorMessage = null;
    this.queryTerms = null;
};

TweetLib.prototype.parseInput = function(inputStr) {
    var inputElements = inputStr.split(",");
    var response = {screen_names: [], hashtags: []};
    inputElements.forEach(function(element) {
        element = element.trim();
        if(element.startsWith('#')) {
            response.hashtags.push(element.slice(1, element.length));
        } else if(element.startsWith('@')) {
            response.screen_names.push(element.slice(1, element.length));
        }
    });
    return response;
};

TweetLib.prototype.loadTweets = function() {
    this.tweetList = new TweetList();

    var inputData = this.tweetUI.inputDiv.childNodes[0].value;
    this.queryTerms = this.parseInput(inputData);

    this.callbacksRemaining = this.queryTerms.screen_names.length;

    this.queryTerms.screen_names.forEach(function(userName) {
        this.apiClient.fetchTweets(userName, this.tweetsAvailableCallback.bind(this, userName), this.tweetsNotLoadedCallback.bind(this));
    }.bind(this));
};

TweetLib.prototype.tweetsAvailableCallback = function(userName, tweetData) {
    console.log("Callback", this);
    this.callbacksRemaining--;

    tweetData = JSON.parse(tweetData);

    if(tweetData.tweets) {
        this.tweetList.addTweetArray(tweetData['tweets']);
    } else {
        if(this.errorMessage) {
            this.errorMessage = "Multiple error";
        } else {
            this.errorMessage = "Invalid handle";
        }
    }

    this.checkLoadingCompleted();
};

TweetLib.prototype.filterListByHashtag = function (tweetList, hashtag) {
    var currentList = tweetList.filter(function(tweet) {
        return tweet.containsHashtag(hashtag);
    });
    return currentList;
};

TweetLib.prototype.filterListByMultipleHashtags = function (tweetList, hashtagList) {
    var filteredList = new TweetList();
    this.queryTerms.hashtags.forEach(function(hashtag) {
            filteredList.appendList(this.filterListByHashtag(tweetList, hashtag));
        }.bind(this)
    );
    return filteredList;
};

TweetLib.prototype.checkLoadingCompleted = function() {
    console.log("Pending callbacks", this.callbacksRemaining);

    if(this.callbacksRemaining > 0) return;

    if(this.errorMessage) {
        this.tweetUI.displayText(this.errorMessage);
        this.errorMessage = null;
    } else if(this.queryTerms.hashtags.length == 0) {
        this.tweetUI.renderData(this.tweetList.render());
    } else {
        console.log("Prefiltered list");
        console.log(this.tweetList);

        console.log(this.queryTerms.hashtags);
        this.tweetList = this.filterListByMultipleHashtags(this.tweetList, this.queryTerms.hashtags);

        console.log("Filtered list");
        console.log(this.tweetList);

        this.tweetUI.renderData(this.tweetList.render());
    }
};

TweetLib.prototype.tweetsNotLoadedCallback = function() {
    if(this.errorMessage) {
        this.errorMessage = "Multiple Errors";
    } else {
        this.errorMessage = "Internal Error";
    }
};

TweetLib.prototype.inputAvailableCallback = function(e) {
    if(e.which == 13) {
        tweetLib.loadTweets();
    }
};

var tweetLib = new TweetLib();

window.addEventListener("load", function(){
    tweetLib.tweetUI.init();
    tweetLib.tweetUI.inputDiv.children[0].addEventListener("keypress", tweetLib.inputAvailableCallback);
});
