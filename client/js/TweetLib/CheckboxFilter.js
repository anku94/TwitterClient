"use strict";

var CheckboxFilter = function(propertyName, extractDataFunc, displayFunc) {
    this.propertyName = propertyName;

    this.elementClassName = "checkbox-element";

    this.extractDataFrom = extractDataFunc;
    this.getDisplayString = displayFunc;

    this.activeFilterTags = [];
    this.totalFilterTags = [];
    this.elementDoms = [];

};

CheckboxFilter.prototype.reset = function() {
    this.activeFilterTags = [];
    this.totalFilterTags = [];
    this.elementDoms = [];
};

CheckboxFilter.prototype.extractTags = function(tweetList) {
    this.reset();

    tweetList.forEach(function(tweet) {
        this.totalFilterTags = _.union(this.totalFilterTags, this.extractDataFrom(tweet));
    }.bind(this));
};

CheckboxFilter.prototype.getActiveTags = function() {
    return this.activeFilterTags;
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

CheckboxFilter.prototype.render = function(parentDOM) {
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
        this.filterTrigger(e);
    }.bind(this));
};

CheckboxFilter.prototype.filterTrigger = function(e) {
    var target = e.target;
    if(target.nodeName == "INPUT") {
        if(target.checked) {
            this.addFilterTag(target.value);
        } else {
            this.removeFilterTag(target.value);
        }
    }
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
