"use strict";

var tweetModels = {};

(function(exports) {
    var BASEURL = "http://localhost:5000/tweets/"

    exports.getTweets = function (userName, callbackFunc, errorFunc) {
        var req = new XMLHttpRequest();
        req.open("GET" ,BASEURL + userName, true);
        req.addEventListener("load", function() {
            if(req.status == "200") {
                callbackFunc(req.responseText);
            } else if(errorFunc) {
                errorFunc();
            }
        });
        req.send(null);
    };

    exports.parseTweets = function (tweetData) {
        var jsonTweets = JSON.parse(tweetData);
        return jsonTweets['tweets'];
    };
}) (tweetModels);
