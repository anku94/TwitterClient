"use strict"

var Tweet = function(string) {
    this.text = string;
    this.highlightedText = string;
    this.mentions = [];
    this.hashtags = [];

    this.REGEX_MENTION = /@(\w+)/g;
    this.REGEX_HASHTAG = /#(\w+)/g;

    this.highlight();
    this.parseData();
};

Tweet.prototype.highlight = function() {
    this.highlightedText = this.highlightedText.replace(/(@\w+\b)/g, "<span class=\"tweet-mention\">$1</span>");
    this.highlightedText = this.highlightedText.replace(/(#\w+\b)/g, "<span class=\"tweet-hashtag\">$1</span>");
    this.highlightedText = "<span class=\"tweet-data\">" + this.highlightedText + "</span>"
};

Tweet.prototype.extractAllMatches = function(pattern, data) {
    var match;
    var resultSet = [];
    while(match = pattern.exec(data)) {
        resultSet.push(match[1]);
    }
    return resultSet;

};

Tweet.prototype.parseData = function() {
    this.hashtags = this.extractAllMatches(this.REGEX_HASHTAG, this.text);
    this.mentions = this.extractAllMatches(this.REGEX_MENTION, this.text);
};

Tweet.prototype.getDOM = function() {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.highlightedText;
    return wrapper.firstChild;
};

Tweet.prototype.containsHashtag = function(hashtag) {
    var idx = this.hashtags.indexOf(hashtag);
    return idx != -1;
};

Tweet.prototype.containsMention = function(mention) {
    var idx = this.mentions.indexOf(mention);
    return idx != -1;
};

// --------------------TESTS-----------------------

//var testTweet = new Tweet("RT @r0h1n: \"#Airtel & #Revenue\" - 2nd investigative on Airtel\ " +
//    "& @paranjoygt: #wow, http://t.co/Mz7nqcsNUN, #BanAirtel #DownWithAirtel #Airtel3GisBaad");

