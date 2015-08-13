"use strict";

var HashtagList = function() {
    this.list = new Array();
    this.hashtags = {};
};

HashtagList.prototype.addHashtagsFromStringArray = function(ls) {
    ls.forEach(function(hashtag) {
            if(!(hashtag in this.hashtags)) {
                this.list.push(new Hashtag(hashtag));
                this.hashtags[hashtag] = true;
            }
        }.bind(this)
    );
    this.list = _.uniq(this.list);
};

HashtagList.prototype.getDOM = function() {
    var parentElement = document.createElement("div");
    this.list.forEach(function(hashtagElement) {
        parentElement.appendChild(hashtagElement.getCheckboxElement());
    });

    return parentElement;
}
