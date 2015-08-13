"use strict";

var Mention = function(mentionStr) {
    this.text = mentionStr;

    if(this.text.startsWith('@')) {
        this.text = this.text.splice(1, this.text.length);
    }

    this.checkbox = this.getCheckboxElement();
};

Mention.prototype.getCheckboxElement = function() {
    if(this.checkbox) return this.checkbox;

    var parentDiv = document.createElement("div");
    parentDiv.className = "checkbox-element";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "mention";
    checkbox.value = this.text;
    checkbox.id = this.text;

    var labelElement = document.createElement("label");
    labelElement.innerText = '@' + this.text;
    labelElement.htmlFor = this.text;

    parentDiv.appendChild(checkbox);
    parentDiv.appendChild(labelElement);

    this.checkbox = parentDiv;
    return this.checkbox;
};
