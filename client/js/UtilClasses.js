"use strict";

// -----------------------------------------------------

var ApiClient = function(apiURL) {
    this.BASEURL = apiURL;
};

ApiClient.prototype.fetchTweets = function(userName, callbackFunc, errorFunc) {
    var request = new XMLHttpRequest();

    var reqURL = this.BASEURL + "/tweets/" + userName;
    console.log("ReqURL", reqURL);
    request.open("GET", reqURL, true);
    request.addEventListener("load", function() {
        if(request.status == "200") {
            callbackFunc(request.responseText);
        } else if(errorFunc) {
            errorFunc();
        }
    });
    request.send(null);
};

// -----------------------------------------------------

var QueryParser = function() {

};

QueryParser.prototype.parseQuery = function(query) {
    var mentions = [];
    var queryTokens = query.split(",");

    queryTokens.forEach(function(element) {
        element = element.trim();
        if(element.startsWith('@')) {
            mentions.push(element.slice(1, element.length));
        }
    });

    return {mentions: mentions};
};

// -----------------------------------------------------
