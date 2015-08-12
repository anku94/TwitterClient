"use strict";

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
