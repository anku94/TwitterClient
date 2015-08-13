"use strict"

var Tweet = function(string) {
    this.text = string;
    this.highlightedText = string;
    this.mentions = [];
    this.hashtags = [];

    this.domElement = null;
    this.parentDom = null;

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
    if(this.domElement) {
        return this.domElement;
    }

    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.highlightedText;
    this.domElement = wrapper.firstChild;

    return this.domElement;
};

Tweet.prototype.setParentDOM = function(domElement) {
    this.parentDom = domElement;
};

Tweet.prototype.getParentDOM = function() {
    return this.parentDom;
};

Tweet.prototype.hide = function() {
    this.getParentDOM().style.display = "none";
};

Tweet.prototype.show = function() {
    this.getParentDOM().style.display = "block";
}

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

