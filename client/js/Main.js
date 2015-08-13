"use strict";

var tweetLib = new TweetLib();
var tweetUI = tweetLib.getUIContext();

window.addEventListener("load", function(){
    tweetUI.init();
    tweetUI.inputDiv.children[0].addEventListener("keypress", tweetLib.inputAvailableCallback);
    tweetUI.hashtagDiv.addEventListener("click", function(e) {
        var target = e.target;
        if(target.nodeName == "INPUT") {
            if(target.checked) {
                tweetLib.activeHashtags.push(target.value);
            } else {
                var idx = tweetLib.activeHashtags.indexOf(target.value);
                if(idx > -1) {
                    tweetLib.activeHashtags.splice(idx, 1);
                }
            }

            tweetLib.showRelevantTweets();
        }
    });

    tweetUI.mentionDiv.addEventListener("click", function(e) {
        var target = e.target;
        if(target.nodeName == "INPUT") {
            if(target.checked) {
                tweetLib.activeMentions.push(target.value);
            } else {
                var idx = tweetLib.activeMentions.indexOf(target.value);
                if(idx > -1) {
                    tweetLib.activeMentions.splice(idx, 1);
                }
            }
            tweetLib.showRelevantTweets();
        }
    });
});
