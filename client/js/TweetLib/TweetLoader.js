"use strict";

var ApiClient = function(apiURL) {
    this.BASEURL = apiURL;
};

ApiClient.prototype.fetchTweets = function(userName) {
    var request = new XMLHttpRequest();
    var reqURL = this.BASEURL + "/tweets/" + userName;
    var deferred = $.Deferred();
    console.log("ReqURL", reqURL);

    request.open("GET", reqURL, true);
    request.addEventListener("load", function() {
        if(request.status == "200") {
            deferred.resolve(request.responseText);
        } else if(request.status == "404") {
            deferred.reject("Requested handle does not exist");
        } else {
            deferred.reject("Unknown error was encountered");
        }
    });
    request.send(null);

    return deferred.promise();
};

var TweetLoader = function() {
    this.apiClient = new ApiClient("http://localhost:5000");
};

TweetLoader.prototype.makeLoadRequest = function(userName) {
    return this.apiClient.fetchTweets(userName);
};

TweetLoader.prototype.makeMultipleRequests = function(inputQuery) {
    var loadRequests = [];

    inputQuery.mentions.forEach(function(userName) {
        loadRequests.push(this.makeLoadRequest(userName));
    }.bind(this));

    return loadRequests;
};

TweetLoader.prototype.loadAllTweets = function(inputQuery) {
    var loadRequests = this.makeMultipleRequests(inputQuery);

    var loadingCompleted = $.Deferred();

    $.when.apply($, loadRequests).then(function() {
        var tweetData = [];
        for(var i = 0; i < arguments.length; i++) {
            tweetData.push(JSON.parse(arguments[i]));
        }
        loadingCompleted.resolve(tweetData);
    }, function(errorMessage) {
        loadingCompleted.reject(errorMessage);
    });

    return loadingCompleted.promise();
};

