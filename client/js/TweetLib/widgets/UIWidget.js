define([
    'dojo/_base/declare',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/UIWidget.html",
    'dojo/dom',
    'dojo/on',
    'dojo/topic'
], function(
    declare, _WidgetBase, _TemplatedMixin, template, dom, on, topic
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        baseClass: "uiWidget",

        constructor: function() {
            this.inherited(arguments);
        },

        init: function() {
            on(this.inputDiv, "keypress", function(e) {
                if(e.keyCode == 13) {
                    console.log("ENTER PRESSED");
                    this.handleInput();
                }
            }.bind(this));

        },

        postCreate: function() {
            this.inherited(arguments);

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
