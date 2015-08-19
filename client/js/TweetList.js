"use strict";

var TweetList = function(tweetList) {
    this.tweets = new Array();
    if(tweetList) {
        this.tweets = this.tweets.concat(tweetList);
    }
};

TweetList.prototype.addTweet = function (tweet) {
    this.tweets.push(tweet);
}

TweetList.prototype.addTweetsFromStringArray = function(ls) {
    ls.forEach(function(tweetString) {
        var tweet = new Tweet(tweetString);
        this.tweets.push(tweet);
    }.bind(this));
}

TweetList.prototype.removeTweet = function (tweet) {
    var index = this.tweets.indexOf(tweet);
    if(index >= 0) this.tweets.splice(index, 1);
}

TweetList.prototype.appendList = function(newList) {
    this.tweets = this.tweets.concat(newList.tweets);
};

TweetList.prototype.forEach = function(func) {
    this.tweets.forEach(func);
}

TweetList.prototype.filter = function(func) {
    return new TweetList(this.tweets.filter(func));
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

TweetList.prototype.loadInside = function(domParent) {
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
