"use strict";

TweetLib.prototype.filterTweetsContainingHashtags = function(tweetList, hashtags) {
    var filteredList = new TweetList();

    if(hashtags.length == 0) return tweetList;

    tweetList.forEach(function(tweet) {
        var length = _.intersection(tweet.hashtags, hashtags).length;
        if(length > 0) {
            filteredList.addTweet(tweet);
        }
    });

    return filteredList;
};

TweetLib.prototype.hideAllBut = function (hashtagArray) {
    if(hashtagArray.length == 0) {
        this.tweetList.show();
        return;
    }

    this.tweetList.hide();

    hashtagArray.forEach(function(hashtag) {
        this.getListContainingHashtag(this.tweetList, hashtag).show();
    }.bind(this));
};

TweetLib.prototype.getListContainingHashtag = function (tweetList, hashtag) {
    var currentList = tweetList.filter(function(tweet) {
        return tweet.containsHashtag(hashtag);
    });
    return currentList;
};

TweetLib.prototype.getListNotContainingHashtag = function (tweetList, hashtag) {
    var currentList = tweetList.filter(function(tweet) {
        return (!tweet.containsHashtag(hashtag));
    });
    return currentList;
};

TweetLib.prototype.getAllHashtags = function(tweetList) {
    var hashtagList = new HashtagList();
    tweetList.forEach(function(tweet) {
        hashtagList.addHashtagsFromStringArray(tweet.hashtags);
    });
    return hashtagList;
};
