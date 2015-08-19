"use strict";

var TweetLoader = function() {
    this.apiClient = new ApiClient("http://localhost:5000");

    this.callbacksRemaining = 0;
    this.errorMessage = null;

    this.loadingCompletedCallback = null;
};

TweetLoader.prototype.loadTweets = function(inputQuery) {
    this.tweetList = new TweetList();

    this.callbacksRemaining = inputQuery.mentions.length;

    inputQuery.mentions.forEach(function(userName) {
        this.apiClient.fetchTweets(userName, this.tweetsAvailableCallback.bind(this, userName), this.tweetsNotLoadedCallback.bind(this));
    }.bind(this));
};

TweetLoader.prototype.registerLoadingCompletedCallback = function(callback) {
    this.loadingCompletedCallback = callback;
};

TweetLoader.prototype.tweetsAvailableCallback = function(userName, tweetData) {
    this.callbacksRemaining--;

    tweetData = JSON.parse(tweetData);

    if(tweetData.tweets) {
        this.tweetList.addTweetsFromStringArray(tweetData['tweets']);
    } else {
        if(this.errorMessage) {
            this.errorMessage = "Multiple errors";
        } else {
            this.errorMessage = "Invalid handle";
        }
    }

    this.checkLoadingCompleted();
};

TweetLoader.prototype.checkLoadingCompleted = function() {
    console.log("Pending callbacks", this.callbacksRemaining);

    if(this.callbacksRemaining > 0) return;

    if(this.errorMessage) {
        if(this.loadingCompletedCallback)
            this.loadingCompletedCallback(null, this.errorMessage);
    } else {
        if(this.loadingCompletedCallback)
            this.loadingCompletedCallback(this.tweetList, null);
    }
};

TweetLoader.prototype.tweetsNotLoadedCallback = function() {
    if(this.errorMessage) {
        this.errorMessage = "Multiple Errors";
    } else {
        this.errorMessage = "Internal Error";
    }
};

TweetLoader.prototype.inputAvailableCallback = function(e) {
    if(e.which == 13) {
        tweetLoader.loadTweets();
    }
};