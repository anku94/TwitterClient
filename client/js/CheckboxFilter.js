"use strict";

var CheckboxFilter = function(propertyName, extractDataFunc, displayFunc) {
    this.propertyName = propertyName;

    this.elementClassName = "checkbox-element";

    this.extractDataFrom = extractDataFunc;
    this.getDisplayString = displayFunc;
    this.reloadFunc = null;

    this.activeFilterTags = new Array();
    this.totalFilterTags = new Array();
    this.elementDoms = new Array();

};

CheckboxFilter.prototype.reset = function() {
    this.activeFilterTags = new Array();
    this.totalFilterTags = new Array();
    this.elementDoms = new Array();
};

CheckboxFilter.prototype.extractTags = function(tweetList) {
    tweetList.forEach(function(tweet) {
        //this.totalFilterTags = this.totalFilterTags.concat(this.extractDataFrom(tweet));
        this.totalFilterTags = _.union(this.totalFilterTags, this.extractDataFrom(tweet));
    }.bind(this));
};

CheckboxFilter.prototype.returnFilteredElements = function(list) {
    if(this.activeFilterTags.length == 0) {
        return list;
    }

    var filteredList = new TweetList();

    list.forEach(function(tweet) {
        var commonElements = _.intersection(this.extractDataFrom(tweet), this.activeFilterTags).length;
        if(commonElements > 0) {
            filteredList.addTweet(tweet);
        }
    }.bind(this));

    return filteredList;
};

CheckboxFilter.prototype.registerReloadCallback = function(callback) {
    this.reloadFunc = callback;
};

CheckboxFilter.prototype.generateElementDom = function(element) {
    var parentDiv = document.createElement("div");
    parentDiv.className = this.elementClassName;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = this.propertyName;
    checkbox.value = element;
    checkbox.id = element;

    var labelElement = document.createElement("label");
    labelElement.innerText = this.getDisplayString(element);
    labelElement.htmlFor = element;

    parentDiv.appendChild(checkbox);
    parentDiv.appendChild(labelElement);

    return parentDiv;
};

CheckboxFilter.prototype.loadInside = function(parentDOM) {
    parentDOM.innerText = "";
    if(this.elementDoms.length == 0) {
        // createDoms
        this.totalFilterTags.forEach(function(tag) {
            var domElement = this.generateElementDom(tag);
            this.elementDoms.push(domElement);
        }.bind(this));
    }

    this.elementDoms.forEach(function(domElement) {
        parentDOM.appendChild(domElement);
    });

    parentDOM.addEventListener("click", function(e) {
        var target = e.target;
        if(target.nodeName == "INPUT") {
            if(target.checked) {
                this.addFilterTag(target.value);
            } else {
                this.removeFilterTag(target.value);
            }
        }

        if(this.reloadFunc)
            this.reloadFunc();
    }.bind(this));
};

CheckboxFilter.prototype.addFilterTag = function(tag) {
    var idx = this.activeFilterTags.indexOf(tag);
    if(idx < 0) {
        this.activeFilterTags.push(tag);
    }
};

CheckboxFilter.prototype.removeFilterTag = function(tag) {
    var idx = this.activeFilterTags.indexOf(tag);
    if(idx > -1) {
        this.activeFilterTags.splice(idx, 1);
    }
};
