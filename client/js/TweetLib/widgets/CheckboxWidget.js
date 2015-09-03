define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/CheckboxWidget.html",
    "dojo/dom-style",
    "dojo/_base/fx",
    "dojo/_base/lang",
    "dojo/on"
], function (
    declare, _WidgetBase, _TemplatedMixin, template
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        baseClass: "checkboxWidget",
        displayFunc: null,

        constructor: function(data, displayFunc) {
            this.inherited(arguments);
            this.displayFunc = displayFunc;
        },

        postCreate: function () {
            this.inherited(arguments);
        },

        _setDataAttr: function (data) {
            this.checkboxNode.name = data;
            this.labelNode.innerText = this.displayFunc(data);
        }
    });
});
