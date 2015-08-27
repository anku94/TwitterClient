"use strict";

var AppManager = function () {
    this.tweetUI = new TweetUI();
    this.tweetLoader = new TweetLoader();
    this.connector = new Connector();

    this.mentionFilter = new CheckboxFilter("mention", function (tweet) {
        return tweet.mentions;
    }, function (str) {
        return '@'.concat(str);
    });

    this.hashtagFilter = new CheckboxFilter("hashtag", function (tweet) {
        return tweet.hashtags;
    }, function (str) {
        return '#'.concat(str);
    });

    this.tweetList = new TweetList();
};

AppManager.prototype.init = function (uiDiv) {
    this.tweetUI.render(uiDiv);

    this.connector.connect(this.tweetUI, "handleInput", this, "handleInput");
    this.connector.connect(this.mentionFilter, "filterTrigger", this, "applyFiltersCallback");
    this.connector.connect(this.hashtagFilter, "filterTrigger", this, "applyFiltersCallback");
};

AppManager.prototype.addToTweetList = function (tweetList, data) {
    data.forEach(function (userData) {
        tweetList.addTweets(userData.tweets);
    });
};

AppManager.prototype.handleInput = function (inputQuery) {
    if(!inputQuery) return;

    var loadRequest = this.tweetLoader.loadAllTweets(inputQuery);

    loadRequest.then(function (data) {
        this.tweetList.reset();
        this.addToTweetList(this.tweetList, data);
        this.displayTweetList();
    }.bind(this), function (errorMessage) {
        this.tweetUI.displayMessage(errorMessage);
    }.bind(this))
};

AppManager.prototype.applyFiltersCallback = function () {
    this.tweetList.applyAllFilters(this.hashtagFilter.getActiveTags(),
        this.mentionFilter.getActiveTags());
};

AppManager.prototype.generateFilterTags = function (tweetList) {
    this.hashtagFilter.extractTags(tweetList);
    this.mentionFilter.extractTags(tweetList);
};

AppManager.prototype.displayTweetList = function () {
    this.tweetUI.hideLoader();

    this.generateFilterTags(this.tweetList);

    this.mentionFilter.render(this.tweetUI.leftPane);
    this.tweetList.render(this.tweetUI.centerPane);
    this.hashtagFilter.render(this.tweetUI.rightPane);
};
