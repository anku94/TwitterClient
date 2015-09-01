define([
    'dojo/_base/declare',
    'TweetLib/widgets/TweetWidget'
], function (
    declare,
    TweetWidget
) {
    return declare(null, {
        tweetWidgets: null,

        constructor: function (jsonData) {
            this.tweetWidgets = new Array();

            if(jsonData) {
                this.addTweets(jsonData);
            }
        },

        reset: function() {
            this.tweetWidgets.forEach(function(widget) {
                widget.destroyRecursive();
            });
            this.tweetWidgets = new Array();
        },

        addTweets: function(jsonData) {
            var tweetArray = jsonData["tweets"];

            tweetArray.forEach(function(tweet) {
                var tweetWidget = new TweetWidget(tweet);
                this.tweetWidgets.push(tweetWidget);
            }.bind(this));
        },

        loadDOM: function(parentDOM) {
            parentDOM.innerText = "";
            this.tweetWidgets.forEach(function(widget) {
                widget.placeAt(parentDOM);
            })
        },

        forEach: function(f) {
            this.tweetWidgets.forEach(f);
        },

        hide: function() {
            this.tweetWidgets.forEach(function(widget) {
                widget.hide();
            });
        },

        show: function() {
            this.tweetWidgets.forEach(function(widget) {
                widget.show();
            });
        },

        applyAllFilters: function(activeMentions, activeHashtags) {
            console.log("FILTERING BY", activeMentions, activeHashtags);
            this.show();
            this.forEach(function(tweet) {
                tweet.filterByMention(activeMentions);
                tweet.filterByHashtag(activeHashtags);
            });
        }

    });
});
