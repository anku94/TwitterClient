"use strict";

var FilteredDisplay = function() {
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

FilteredDisplay.prototype.applyFiltersCallback = function() {

    var filteredList = this.hashtagFilter.returnFilteredElements(this.tweetList);
    var filteredList = this.mentionFilter.returnFilteredElements(filteredList);

    this.tweetList.hide();
    filteredList.show();
    
};

FilteredDisplay.prototype.generateFilterTags = function() {
    this.hashtagFilter.reset();
    this.hashtagFilter.extractTags(this.tweetList);

    this.mentionFilter.reset();
    this.mentionFilter.extractTags(this.tweetList);
};

FilteredDisplay.prototype.load = function(uiContext, data) {
    if(data.error) {
        uiContext.displayMessage(data.error);
    } else {
        this.tweetList = data.tweets;

        this.generateFilterTags();

        this.mentionFilter.loadInside(uiContext.leftPane);
        this.tweetList.loadInside(uiContext.centerPane);
        this.hashtagFilter.loadInside(uiContext.rightPane);
    }
};
