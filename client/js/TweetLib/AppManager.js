define([
    'dojo/_base/declare',
    'dojo/topic',
    'TweetLib-Dojo/TweetLoader',
    'TweetLib-Dojo/TweetUI',
    'TweetLib-Dojo/TweetList',
    'TweetLib-Dojo/CheckboxFilter'
], function(
    declare,
    topic,
    TweetLoader,
    TweetUI,
    TweetList,
    CheckboxFilter
) {
    return declare(null, {
        BASEURL: "http://localhost:5000/tweets",
        _tweetLoader: null,
        _tweetUI: null,
        _tweetList: null,
        _hashtagFilter: null,
        _mentionFilter: null,

        constructor: function(kw) {
            this._tweetLoader = new TweetLoader(this.BASEURL);
            this._tweetUI = new TweetUI();
            this._tweetList = new TweetList();

            this._tweetUI.init();
            this._mentionFilter = new CheckboxFilter(this._tweetList, this._tweetUI.leftPane, function(tweet) {
                return tweet.mentions;
            }, function(str) {
                return '@' + str;
            });

            this._hashtagFilter = new CheckboxFilter(this._tweetList, this._tweetUI.rightPane, function(tweet) {
                return tweet.hashtags;
            }, function(str) {
                return '#' + str;
            });

            //var req = this._tweetLoader.loadTweets(["anku94", "hiianubhav"]);
            //var req = this._tweetLoader.loadTweets(["anku94"]);

            topic.subscribe("inputAvailable", this.inputHandler.bind(this));
            topic.subscribe("tweetsFetched", this.tweetHandler.bind(this));
            topic.subscribe("error", this.errorHandler.bind(this));
            topic.subscribe("tweetsLoaded", this.onLoadHandler.bind(this));
            topic.subscribe("filterClicked", this.filterHandler.bind(this));
        },

        parseQuery: function(query) {
            var handles = [];
            query.split(",").forEach(function(handle) {
                handle = handle.trim(' \r\n\t');
                if(handle.startsWith('@')) {
                    handle = handle.slice(1, handle.length);
                }
                handles.push(handle);
            });
            return handles;
        },

        inputHandler: function() {
            this._tweetUI.showLoader();

            var query = this._tweetUI.getInputDOM().value;
            var handles = this.parseQuery(query);
            this._tweetLoader.loadTweets(handles);
        },

        tweetHandler: function(data) {
            this._tweetUI.hideLoader();

            this._tweetList.reset();
            data.forEach(function(list) {
                this._tweetList.addTweets(list[1]);
            }.bind(this));
            this._tweetList.loadDOM(this._tweetUI.centerPane);

            topic.publish("tweetsLoaded");
        },

        onLoadHandler: function() {
            this._mentionFilter.loadFilter();
            this._hashtagFilter.loadFilter();
        },

        errorHandler: function(errorMsg) {
            this._tweetUI.displayMessage(errorMsg);
        },

        filterHandler: function() {
            this._tweetList.applyAllFilters(this._mentionFilter.getActiveTags(), this._hashtagFilter.getActiveTags());
        }
    });
});
