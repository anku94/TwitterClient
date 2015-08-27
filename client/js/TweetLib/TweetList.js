"use strict";

var TweetList = function() {
    this.tweets = [];
};

TweetList.prototype.reset = function() {
    this.tweets = [];
};

TweetList.prototype.addTweets = function(ls) {
    ls.forEach(function(tweetString) {
        var tweet = new Tweet(tweetString);
        this.tweets.push(tweet);
    }.bind(this));
};

TweetList.prototype.forEach = function(func) {
    this.tweets.forEach(func);
};

TweetList.prototype.hide = function() {
    this.tweets.forEach(function(tweet) {
        tweet.hide();
    });
};

TweetList.prototype.show = function() {
    this.tweets.forEach(function(tweet) {
        tweet.show();
    });
};


TweetList.prototype.render = function(domParent) {
    var listElement = document.createElement("ul");
    listElement.className = "tweet-ls";

    this.forEach(function(tweet) {
        var tweetElement = document.createElement("li");
        var tweetDom = tweet.getDOM();

        tweetElement.appendChild(tweetDom);
        listElement.appendChild(tweetElement);

        tweet.setParentDOM(tweetElement);
    }.bind(this));

    domParent.innerText = "";
    domParent.appendChild(listElement);
};

TweetList.prototype.applyAllFilters = function(activeHashtags, activeMentions) {
    this.show();
    this.tweets.forEach(function(tweet) {
        tweet.filterByHashtag(activeHashtags);
        tweet.filterByMention(activeMentions);
    });
};
