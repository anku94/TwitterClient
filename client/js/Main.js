"use strict";

var tweetLib = new TweetLib();

window.addEventListener("load", function(){
    tweetLib.tweetUI.init();
    tweetLib.tweetUI.inputDiv.children[0].addEventListener("keypress", tweetLib.inputAvailableCallback);
});