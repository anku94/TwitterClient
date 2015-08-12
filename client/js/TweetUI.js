"use strict";

var TweetUI = function() {
};

TweetUI.prototype.init = function() {
    var uiParent = document.querySelector(".tweet-client");

    uiParent.innerText = "";

    var inputNode = document.createElement("div");
    inputNode.id = "tweets-input";

    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "username";
    inputElement.id = "tweets-username_input";
    inputElement.placeholder = "@twitterUser, @anotherUser, ..., #firstHashtag, #secondHashtag, ...";

    inputNode.appendChild(inputElement);

    // ---------------------------------------------

    var tweetsNode = document.createElement("div");
    tweetsNode.id = "tweets";

    uiParent.appendChild(inputNode);
    uiParent.appendChild(tweetsNode);

    this.uiParent = uiParent;
    this.inputDiv = inputNode;
    this.tweetDiv = tweetsNode;

    // ---------------------------------------------

    this.hideLoader();
};

TweetUI.prototype.hideLoader = function() {
    this.tweetDiv.classList.add("tweets-noload");
};

TweetUI.prototype.showLoader = function() {
    this.tweetDiv.classList.remove("tweets-noload");
};

TweetUI.prototype.displayText = function(string) {
    var messageElement = document.createElement("span");
    messageElement.classList.add("tweet-message");
    messageElement.innerText = string;

    this.renderData(messageElement);
};

TweetUI.prototype.renderData = function(dataDom) {
    this.tweetDiv.innerText = "";
    this.tweetDiv.appendChild(dataDom);
}