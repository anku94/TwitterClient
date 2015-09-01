define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/on',
    'dojo/topic'
], function(
    declare,
    dom,
    on,
    topic
) {
    return declare(null, {
        inputDiv: null,
        contentDiv: null,

        leftPane: null,
        centerPane: null,
        rightPane: null,

        constructor: function() {
        },

        init: function() {
            this.contentDiv = dom.byId("tweets");
            this.inputDiv = dom.byId("tweets-input");

            this.leftPane = dom.byId("left-pane");
            this.centerPane = dom.byId("center-pane");
            this.rightPane = dom.byId("right-pane");

            on(this.inputDiv, "keypress", function(e) {
                if(e.keyCode == 13) {
                    console.log("ENTER PRESSED");
                    this.handleInput();
                }
            }.bind(this));

        },

        showLoader: function() {
            this.centerPane.innerText = "";
            this.contentDiv.classList.remove("tweets-noload");
        },

        hideLoader: function() {
            this.contentDiv.classList.add("tweets-noload");
        },

        getInputDOM: function() {
            return this.inputDiv.children[0];
        },

        handleInput: function() {
            topic.publish("inputAvailable", this.getInputDOM().value);
        },

        displayMessage: function(text) {
            var messageElement = document.createElement("div");
            messageElement.classList.add("tweet-message");
            messageElement.innerText = text;

            this.centerPane.innerText = "";
            this.centerPane.appendChild(messageElement);
        }
    });
});
