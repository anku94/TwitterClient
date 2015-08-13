"use strict";

TweetLib.prototype.filterTweetsContainingMentions = function(tweetList, mentions) {
    var filteredList = new TweetList();

    if(mentions.length == 0) return tweetList;

    tweetList.forEach(function(tweet) {
        var length = _.intersection(tweet.mentions, mentions).length;
        if(length > 0) {
            filteredList.addTweet(tweet);
        }
    });

    return filteredList;
};

TweetLib.prototype.getListContainingMention = function (tweetList, mention) {
    var currentList = tweetList.filter(function(tweet) {
        return tweet.containsMention(mention);
    });
    return currentList;
};

TweetLib.prototype.getListNotContainingMention = function (tweetList, mention) {
    var currentList = tweetList.filter(function(tweet) {
        return (!tweet.containsMention(hashtag));
    });
    return currentList;
};

TweetLib.prototype.getAllMentions = function(tweetList) {
    var mentionList = new MentionList();
    tweetList.forEach(function(tweet) {
        mentionList.addMentionsFromStringArray(tweet.mentions);
    });
    return mentionList;
}
