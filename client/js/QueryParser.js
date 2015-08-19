"use strict";

var QueryParser = function() {

};

QueryParser.prototype.parseQuery = function(query) {
    var mentions = [];
    var queryTokens = query.split(",");

    queryTokens.forEach(function(element) {
        element = element.trim();
        if(element.startsWith('@')) {
            mentions.push(element.slice(1, element.length));
        }
    });

    return {mentions: mentions};
};