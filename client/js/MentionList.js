"use strict";

var MentionList = function() {
    this.list = new Array();
    this.mentions = {};
};

MentionList.prototype.addMentionsFromStringArray = function(ls) {
    ls.forEach(function(mention) {
            if(!(mention in this.mentions)) {
                this.list.push(new Mention(mention));
                this.mentions[mention] = true;
            }
        }.bind(this)
    );
    this.list = _.uniq(this.list);
};

MentionList.prototype.getDOM = function() {
    var parentElement = document.createElement("div");
    this.list.forEach(function(mentionElement) {
        parentElement.appendChild(mentionElement.getCheckboxElement());
    });

    return parentElement;
}
