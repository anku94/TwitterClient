define([
    'dojo/_base/declare',
    'dojo/_base/xhr',
    'dojo/topic',
    'dojo/DeferredList',
    'dojo/_base/array'
], function (declare,
             xhr,
             topic,
             DeferredList,
             array) {
    return declare(null, {
        BASEURL: null,

        constructor: function (BASEURL) {
            this.BASEURL = BASEURL;
        },

        sendRequest: function (userName) {
            return xhr.get({
                url: this.BASEURL + "/" + userName,
                handleAs: "json",
            })
        },

        loadTweets: function (query) {
            var requestsList = [];
            query.forEach(function (handle) {
                var request = this.sendRequest(handle);
                requestsList.push(request);
            }.bind(this));

            var deferredList = new DeferredList(requestsList);
            deferredList.then(function (data) {
                var status = array.map(data, function (element) {
                    return element[0];
                });

                if (array.every(status, function (val) { return val == true; })) {
                    this.dataCallback(data);
                } else {
                    this.errorCallback("Unknown error was encountered");
                }
            }.bind(this));
        },

        dataCallback: function (data) {
            console.log("DATA", data);
            topic.publish("tweetsFetched", data);
        },

        errorCallback: function (error) {
            console.log("ERROR", error);
            topic.publish("error", "An internal error was encountered");
        }
    });
});
