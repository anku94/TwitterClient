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
    inputElement.placeholder = "@twitterUser, @anotherUser, ...";

    inputNode.appendChild(inputElement);

    // ---------------------------------------------

    var tweetsNode = document.createElement("div");
    tweetsNode.id = "tweets";

    var checkboxDiv = document.createElement("div");
    checkboxDiv.className = "tweets-hashtags-checklist";

    var tweetContainer = document.createElement("div");
    tweetContainer.className = "tweets-container";

    var mentionDiv = document.createElement("div");
    mentionDiv.className = "tweets-users-checklist";

    tweetsNode.appendChild(checkboxDiv);
    tweetsNode.appendChild(tweetContainer);
    tweetsNode.appendChild(mentionDiv);

    uiParent.appendChild(inputNode);
    uiParent.appendChild(tweetsNode);

    this.uiParent = uiParent;
    this.inputDiv = inputNode;
    this.tweetDiv = tweetsNode;
    this.tweetHolder = tweetContainer;
    this.hashtagDiv = checkboxDiv;
    this.mentionDiv = mentionDiv;

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
    this.tweetHolder.innerText = "";
    this.tweetHolder.appendChild(dataDom);
};

TweetUI.prototype.renderHashtags = function(dataDom) {
    this.hashtagDiv.innerText = "";
    var nodes = dataDom.children;
    var l = nodes.length;

    for(var i = 0; i < l; i++) {
        this.hashtagDiv.appendChild(nodes[0]);
    }
};

TweetUI.prototype.renderMentions = function(dataDom) {
    this.mentionDiv.innerText = "";
    var nodes = dataDom.children;
    var l = nodes.length;

    for(var i = 0; i < l; i++) {
        this.mentionDiv.appendChild(nodes[0]);
    }
};
