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
    var response = {screen_names: []};
    inputElements.forEach(function(element) {
        element = element.trim();
        if(element.startsWith('@')) {
            response.screen_names.push(element.slice(1, element.length));
        }
    });
    return response;
};

TweetLib.prototype.loadTweets = function() {
    this.tweetList = new TweetList();
    mentionFilter.reset();
    hashtagFilter.reset();

    var inputData = this.tweetUI.inputDiv.childNodes[0].value;
    this.queryTerms = this.parseInput(inputData);

    this.callbacksRemaining = this.queryTerms.screen_names.length;

    this.queryTerms.screen_names.forEach(function(userName) {
        this.apiClient.fetchTweets(userName, this.tweetsAvailableCallback.bind(this, userName), this.tweetsNotLoadedCallback.bind(this));
    }.bind(this));
};

TweetLib.prototype.tweetsAvailableCallback = function(userName, tweetData) {
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

TweetLib.prototype.checkLoadingCompleted = function() {
    console.log("Pending callbacks", this.callbacksRemaining);

    if(this.callbacksRemaining > 0) return;

    if(this.errorMessage) {
        this.tweetUI.displayText(this.errorMessage);
        this.errorMessage = null;
    } else {
        this.tweetUI.renderData(this.tweetList.render());

        mentionFilter.extractTags(this.tweetList);
        mentionFilter.loadInside(this.tweetUI.mentionDiv);

        hashtagFilter.extractTags(this.tweetList);
        hashtagFilter.loadInside(this.tweetUI.hashtagDiv);
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

TweetLib.prototype.getUIContext = function() {
    return this.tweetUI;
};

TweetLib.prototype.showRelevantTweets = function() {
    tweetLib.tweetList.hide();
    var filteredList = hashtagFilter.returnFilteredElements(tweetLib.tweetList);
    console.log("Filtered Hash List", filteredList);
    var filteredList = mentionFilter.returnFilteredElements(filteredList);
    console.log("Filtered Mention List", filteredList);
    filteredList.show();
};
