define([
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/topic',
    'TweetLib/TweetLoader',
    'TweetLib/widgets/UIWidget',
    'TweetLib/TweetList',
    'TweetLib/CheckboxFilter'
], function(
    declare, dom, topic, TweetLoader, UIWidget, TweetList, CheckboxFilter
) {
    return declare(null, {
        BASEURL: "http://localhost:5000/tweets",
        _tweetLoader: null,
        _tweetUI: null,
        _elementList: null,
        _hashtagFilter: null,
        _mentionFilter: null,

        constructor: function() {
            this._tweetLoader = new TweetLoader(this.BASEURL);
            this._tweetUI = new UIWidget();
            this._elementList = new TweetList();

            this._tweetUI.placeAt(dom.byId("tweet-client"));
            this._tweetUI.init();

            this._mentionFilter = new CheckboxFilter(this._elementList, this._tweetUI.leftPane, function(tweet) {
                return tweet.mentions;
            }, function(str) {
                return '@' + str;
            });

            this._hashtagFilter = new CheckboxFilter(this._elementList, this._tweetUI.rightPane, function(tweet) {
                return tweet.hashtags;
            }, function(str) {
                return '#' + str;
            });

            topic.subscribe("inputAvailable", this.inputHandler.bind(this));
            topic.subscribe("tweetsFetched", this.tweetHandler.bind(this));
            topic.subscribe("error", this.errorHandler.bind(this));
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

        inputHandler: function(query) {
            this._tweetUI.showLoader();

            var handles = this.parseQuery(query);
            this._tweetLoader.loadTweets(handles);
        },

        tweetHandler: function(data) {
            this._tweetUI.hideLoader();

            this._elementList.reset();
            data.forEach(function(list) {
                this._elementList.addTweets(list[1]);
            }.bind(this));
            this._elementList.loadDOM(this._tweetUI.centerPane);

            this._mentionFilter.loadFilter();
            this._hashtagFilter.loadFilter();
        },

        errorHandler: function(errorMsg) {
            this._tweetUI.displayMessage(errorMsg);
        },

        filterHandler: function() {
            this._elementList.applyAllFilters(this._mentionFilter.getActiveTags(), this._hashtagFilter.getActiveTags());
        }
    });
});
