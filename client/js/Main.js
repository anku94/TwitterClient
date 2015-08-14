"use strict";

var tweetLib = new TweetLib();
var tweetUI = tweetLib.getUIContext();


var extractMention = function(tweet) {
    var resp = tweet.mentions;

    resp.forEach(function(mention) {
        if(mention.startsWith('@')) {
            mention.splice(1, 1);
        }
    });
    return resp;
};

var displayMention = function(str) {
    if(!(str.startsWith('@'))) {
        str = '@'.concat(str);
    }
    return str;
};

var extractHashtag = function(tweet) {
    return tweet.hashtags;
};

var displayHashtag = function(str) {
    return '#'.concat(str);
}

var mentionFilter = new CheckboxFilter(extractMention, displayMention, tweetLib.showRelevantTweets, "mention", "checkbox-element");
var hashtagFilter = new CheckboxFilter(extractHashtag, displayHashtag, tweetLib.showRelevantTweets, "hashtag", "checkbox-element");

window.addEventListener("load", function(){
    tweetUI.init();
    tweetUI.inputDiv.children[0].addEventListener("keypress", tweetLib.inputAvailableCallback);
});
