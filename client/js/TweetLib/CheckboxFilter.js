define([
    'dojo/_base/declare',
    'dojo/query',
    'dojo/topic',
    'dojo/on',
    'dojox/collections/Set',
    'TweetLib/widgets/CheckboxWidget'
], function (declare, query, topic, on, Set, CheckboxWidget) {
    return declare(null, {

        allTags: null,
        activeTags: null,
        _elementList: null,
        _parentDOM: null,
        _extractData: null,
        _widgets: null,

        constructor: function (elementList, parentDOM, extractDataFunc, displayFunc) {
            this.allTags = [];
            this.activeTags = [];

            this._elementList = elementList;
            this._parentDOM = parentDOM;
            this._extractData = extractDataFunc;
            this._displayFunc = displayFunc;
        },

        extractTags: function (tweetList) {
            var res = [];

            tweetList.forEach(function (tweet) {
                res = Set.union(res, this._extractData(tweet)).toArray();
            }.bind(this));

            return res;
        },

        reset: function () {
            if (this._widgets) {
                this._widgets.forEach(function (widget) {
                    widget.destroyRecursive();
                });
            }

            this._widgets = null;
            this.allTags = [];
            this.activeTags = [];
        },

        loadFilter: function () {
            this.reset();
            this.allTags = this.extractTags(this._elementList);
            this.loadDOM(this._parentDOM);
        },

        loadDOM: function (parentDOM) {
            parentDOM.innerText = "";

            if (!this._widgets) {
                this._widgets = [];
                this.allTags.forEach(function (tag) {
                    var widget = new CheckboxWidget({data: tag}, this._displayFunc);
                    this._widgets.push(widget);
                }.bind(this));
            }

            this._widgets.forEach(function (widget) {
                widget.placeAt(parentDOM);
            });

            on(parentDOM, "input:click", this.clickHandler.bind(this));
        },

        addFilterTag: function (tag) {
            var idx = this.activeTags.indexOf(tag);
            if (idx < 0) {
                this.activeTags.push(tag);
            }
        },

        removeFilterTag: function (tag) {
            var idx = this.activeTags.indexOf(tag);
            if (idx > -1) {
                this.activeTags.splice(idx, 1);
            }
        },

        getActiveTags: function () {
            return this.activeTags;
        },

        clickHandler: function (e) {
            var target = e.target;
            if (target.checked) {
                this.addFilterTag(target.value);
            } else {
                this.removeFilterTag(target.value);
            }
            topic.publish("filterClicked");
        }
    });
});
