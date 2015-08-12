"use strict";

var TweetList = function(tweetArray) {
    this.tweets = new Array();
    if(tweetArray) {
        this.tweets = this.tweets.concat(tweetArray);
    }
};

TweetList.prototype.addTweet = function (tweet) {
    this.tweets.push(tweet);
}

TweetList.prototype.addTweetArray = function(ls) {
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

TweetList.prototype.render = function() {
    var listElement = document.createElement("ul");
    listElement.className = "tweet-ls";

    this.forEach(function(tweet) {
        var tweetElement = document.createElement("li");
        var tweetDom = tweet.getDOM();

        tweetElement.appendChild(tweetDom);

        listElement.appendChild(tweetElement);
    }.bind(this));

    return listElement;
};

// Tests

//var tweet1 = new Tweet("hello world");
//var tweet2 = new Tweet("bye world");
//
//var ls =  new TweetList();
//ls.addTweet(tweet1);
//ls.addTweet(tweet2);
//
//ls.filter(function(tweet) {
//    var res = /bye/.test(tweet.text);
//    return res;
//});
