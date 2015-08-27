"use strict";

var Connector = function() {
};

Connector.prototype.connect = function(obj1, func1, obj2, func2) {
    var f1 = obj1[func1];
    var f2 = obj2[func2];

    obj1[func1] = function() {
        var res = f1.apply(obj1, arguments);
        f2.call(obj2, res);
    }
};

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
