"use strict";

var DisplayManager = function () {
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

    this.tweetList = null;

    this.mentionFilter.registerReloadCallback(this.applyFiltersCallback.bind(this));
    this.hashtagFilter.registerReloadCallback(this.applyFiltersCallback.bind(this));
};

DisplayManager.prototype.applyFiltersCallback = function () {
    this.tweetList.applyAllFilters(this.hashtagFilter.getActiveTags(),
        this.mentionFilter.getActiveTags());
};

DisplayManager.prototype.generateFilterTags = function () {
    this.hashtagFilter.extractTags(this.tweetList);
    this.mentionFilter.extractTags(this.tweetList);
};

DisplayManager.prototype.load = function (uiContext, data) {
    uiContext.hideLoader();

    if (data.error) {
        uiContext.displayMessage(data.error);
    } else {
        this.tweetList = data.tweets;

        this.generateFilterTags();

        this.mentionFilter.render(uiContext.leftPane);
        this.tweetList.render(uiContext.centerPane);
        this.hashtagFilter.render(uiContext.rightPane);
    }
};

