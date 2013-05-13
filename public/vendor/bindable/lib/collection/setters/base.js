define(["require", "bindable/lib/core/utils"], function(require) {

    var __dirname = "bindable/lib/collection/setters",
    __filename    = "bindable/lib/collection/setters/base.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports,
    global        = window;

    

    // Generated by CoffeeScript 1.4.0
(function() {
  var utils;

  utils = require("bindable/lib/core/utils");

  module.exports = (function() {
    /*
    */

    function _Class(binding, target) {
      this.binding = binding;
      this.target = target;
      this._transformer = binding.transform();
      this._filter = binding.filter();
      this.init();
    }

    /*
    */


    _Class.prototype.init = function() {};

    /*
    */


    _Class.prototype.dispose = function() {};

    /*
    */


    _Class.prototype.change = function(event, item) {
      var _this = this;
      if (this._filter) {
        if (!this._filter.test(item)) {
          return;
        }
      }
      return this.__transform("to", item, function(err, item) {
        if (err) {
          throw err;
        }
        return _this._change(event, item);
      });
    };

    /*
    */


    _Class.prototype._change = function(event, item) {};

    /*
    */


    _Class.prototype.bothWays = function() {};

    /*
    */


    _Class.prototype.__transform = function(method, value, next) {
      return utils.tryTransform(this._transformer, method, value, next);
    };

    return _Class;

  })();

}).call(this);


    return module.exports;
});