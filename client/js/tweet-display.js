"use strict";

var tweetDisplay = {};

(function(exports) {

    exports.initUI = function() {
        var uiParent = document.querySelector(".tweet-client");

        uiParent.innerText = "";

        var inputNode = document.createElement("div");
        //inputNode.classList.add("tweets-input");
        inputNode.id = "tweets-input";

        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.name = "username";
        inputElement.id = "tweets-username_input";
        inputElement.placeholder = "@twitterUser";

        inputNode.appendChild(inputElement);

        // ---------------------------------------------

        var tweetsNode = document.createElement("div");
        tweetsNode.id = "tweets";

        uiParent.appendChild(inputNode);
        uiParent.appendChild(tweetsNode);


        exports.nowaiting();
        // ---------------------------------------------
    }

    exports.tweetHighlight = function(string) {
        string = string.replace(/(@\w+\b)/g, "<span class=\"tweet-mention\">$1</span>");
        string = string.replace(/(#\w+\b)/g, "<span class=\"tweet-hashtag\">$1</span>");
        string = "<span class=\"tweet-data\">" + string + "</span>"
        return string;
    }

    exports.nowaiting = function() {
        var tweetDiv = document.querySelector("#tweets");
        tweetDiv.classList.add("tweets-noload");
    }

    exports.waiting = function () {
        var tweetDiv = document.querySelector("#tweets");
        tweetDiv.classList.remove("tweets-noload");
        tweetDiv.innerHTML = "";
        return;
    }

    exports.display = function (tweetList) {
        exports.nowaiting();

        var tweetDiv = document.querySelector("#tweets");
        tweetDiv.innerText = "";

        var listNode = document.createElement("ul");
        listNode.className = "tweet-ls";
        tweetDiv.appendChild(listNode);

        tweetList.forEach(function(tweet, idx) {
            var node = document.createElement("li");
            node.innerHTML = exports.tweetHighlight(tweet);
            listNode.appendChild(node);
        });
    };

    exports.displayError = function () {
        var tweetDiv = document.querySelector("#tweets");
        tweetDiv.innerText = "An error was encountered";
    };
})(tweetDisplay);
