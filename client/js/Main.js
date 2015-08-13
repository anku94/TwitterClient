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
                // filter - hide elements
                tweetLib.activeHashtags.push(target.value);
            } else {
                // remove from list of filters
                var idx = tweetLib.activeHashtags.indexOf(target.value);
                if(idx > -1) {
                    tweetLib.activeHashtags.splice(idx, 1);
                }
            }

            console.log(tweetLib.activeHashtags);
            tweetLib.hideAllBut(tweetLib.activeHashtags);
        }
    });
});
