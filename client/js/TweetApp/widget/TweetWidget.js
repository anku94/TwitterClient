define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojox/collections/Set",
    "dojo/text!./templates/TweetWidget.html",
    "dojo/dom-style",
    "dojo/_base/fx",
    "dojo/_base/lang",
    "dojo/on"
], function (declare, _WidgetBase, _TemplatedMixin, Set, template, domStyle, baseFx, lang, on) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        baseClass: "tweetWidget",

        mentions: null,
        hashtags: null,

        REGEX_MENTION: /@(\w+)/g,
        REGEX_HASHTAG: /#(\w+)/g,

        postCreate: function () {
            this.inherited(arguments);
        },

        _setTweetAttr: function (tweet) {
            this._parseData(tweet);
            this.domNode.innerHTML = this._highlightText(tweet);
        },

        _highlightText: function (tweetText) {
            var highlightedText = tweetText.replace(/(@\w+\b)/g, "<span class=\"tweet-mention\">$1</span>");
            highlightedText = highlightedText.replace(/(#\w+\b)/g, "<span class=\"tweet-hashtag\">$1</span>");
            highlightedText = "<span class=\"tweet-data\">" + highlightedText + "</span>"
            return highlightedText;
        },

        _extractData: function(pattern, data) {
            var match;
            var resultSet = [];
            while(match = pattern.exec(data)) {
                resultSet.push(match[1]);
            }
            return resultSet;
        },

        _parseData: function(tweet) {
            this.hashtags = this._extractData(this.REGEX_HASHTAG, tweet);
            this.mentions = this._extractData(this.REGEX_MENTION, tweet);
        },

        hide: function() {
            domStyle.set(this.domNode, "display", "none");
        },

        show: function() {
            domStyle.set(this.domNode, "display", "block");
        },

        intersectionExists: function(array1, array2) {
            return Set.intersection(array1, array2).count > 0;
        },

        filterByMention: function(checkedMentions) {
            if(checkedMentions.length == 0) {
                return;
            }

            if(!this.intersectionExists(checkedMentions, this.mentions)) {
                this.hide();
            }
        },

        filterByHashtag: function(checkedHashtags) {
            if(checkedHashtags.length == 0) {
                return;
            }

            if(!this.intersectionExists(checkedHashtags, this.hashtags)) {
                this.hide();
            }
        }
    });
});
