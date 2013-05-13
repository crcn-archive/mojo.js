define(["require", "bindable/lib/collection/setters/fn", "bindable/lib/collection/setters/object", "bindable/lib/collection/setters/collection"], function(require) {

    var __dirname = "bindable/lib/collection/setters",
    __filename    = "bindable/lib/collection/setters/factory.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports,
    global        = window;

    

    // Generated by CoffeeScript 1.4.0
(function() {
  var CollectionSetter, FnSetter, ObjSetter;

  FnSetter = require("bindable/lib/collection/setters/fn");

  ObjSetter = require("bindable/lib/collection/setters/object");

  CollectionSetter = require("bindable/lib/collection/setters/collection");

  module.exports = (function() {

    function _Class() {}

    /*
    */


    _Class.prototype.createSetter = function(binding, target) {
      if (!target) {
        return null;
      }
      if (typeof target === "function") {
        return new FnSetter(binding, target);
      } else if (target.__isCollection) {
        return new CollectionSetter(binding, target);
      } else if (target.insert || target.update || target.remove || target.replace) {
        return new ObjSetter(binding, target);
      }
      return null;
    };

    return _Class;

  })();

}).call(this);


    return module.exports;
});