"use strict";

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
};

Tweet.prototype.intersectionExists = function(array1, array2) {
    return _.intersection(array1, array2).length > 0;
};

Tweet.prototype.filterByMention = function(checkedMentions) {
    if(checkedMentions.length == 0) {
        return;
    }

    if(!this.intersectionExists(checkedMentions, this.mentions)) {
        this.hide();
    }
};

Tweet.prototype.filterByHashtag = function(checkedHashtags) {
    if(checkedHashtags.length == 0) {
        return;
    }

    if(!this.intersectionExists(checkedHashtags, this.hashtags)) {
        this.hide();
    }
};
