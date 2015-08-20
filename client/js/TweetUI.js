"use strict";
var TweetUI = function () {
    this.queryParser = new QueryParser();

    this.domParent = null;
    this.contentDiv = null;

    this.inputDiv = this.createInputDiv();

    this.leftPane = this.createLeftPane();
    this.centerPane = this.createCenterPane();
    this.rightPane = this.createRightPane();

    this.inputEventListener = null;
};

TweetUI.prototype.createElementWithId = function (tag, id) {
    var node = document.createElement(tag);
    node.id = id;

    return node;
};

TweetUI.prototype.createInputDiv = function () {
    var inputNode = this.createElementWithId("div", "tweets-input");

    var inputElement = this.createElementWithId("input", "tweets-username-input");
    inputElement.type = "text";
    inputElement.name = "username";
    inputElement.placeholder = "@twitterUser, @anotherUser, ...";

    inputNode.appendChild(inputElement);

    return inputNode;
};

TweetUI.prototype.createLeftPane = function () {
    return this.createElementWithId("div", "left-pane");
};

TweetUI.prototype.createCenterPane = function () {
    return this.createElementWithId("div", "center-pane");
};

TweetUI.prototype.createRightPane = function () {
    return this.createElementWithId("div", "right-pane");
};

TweetUI.prototype.loadInside = function (domParent) {
    this.domParent = domParent;

    // Empty the parent div
    domParent.innerText = "";

    // Create a container div with all three panes
    this.contentDiv = document.createElement("div");
    this.contentDiv.id = "tweets";

    this.contentDiv.appendChild(this.leftPane);
    this.contentDiv.appendChild(this.centerPane);
    this.contentDiv.appendChild(this.rightPane);

    this.domParent.appendChild(this.inputDiv);
    this.domParent.appendChild(this.contentDiv);

    this.hideLoader();

};

TweetUI.prototype.getInput = function () {
    return this.inputDiv.children[0].value;
};

TweetUI.prototype.hideLoader = function () {
    this.contentDiv.classList.add("tweets-noload");
};

TweetUI.prototype.showLoader = function () {
    this.contentDiv.classList.remove("tweets-noload");
};

TweetUI.prototype.displayMessage = function (string) {
    var messageElement = document.createElement("div");
    messageElement.classList.add("tweet-message");
    messageElement.innerText = string;

    this.centerPane.innerText = "";
    this.centerPane.appendChild(messageElement);
};

TweetUI.prototype.getInputTextBoxDOM = function() {
    return this.inputDiv.children[0];
}

TweetUI.prototype.registerInputAvailableCallback = function (callback) {
    var inputTextbox = this.getInputTextBoxDOM();
    console.log(inputTextbox);
    this.inputEventListener = inputTextbox.addEventListener("keypress", _.partial(this.handleInput, _, callback).bind(this));
};

TweetUI.prototype.handleInput = function (e, callback) {
    if (e.keyCode == 13) {
        var query = this.getInput();
        console.log("Query", query);
        var parsedQuery = this.queryParser.parseQuery(query);
        callback(parsedQuery);
    }
};
