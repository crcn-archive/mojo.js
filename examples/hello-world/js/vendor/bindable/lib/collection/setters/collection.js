define(["require", "bindable/lib/collection/setters/object", "bindable/lib/collection/setters/base"], function(require) {

    var __dirname = "bindable/lib/collection/setters",
    __filename    = "bindable/lib/collection/setters/collection.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports,
    global        = window;

    

    // Generated by CoffeeScript 1.6.2
(function() {
  var ObjSetter, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ObjSetter = require("bindable/lib/collection/setters/object");

  module.exports = (function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    /*
    */


    _Class.prototype.init = function() {
      var methods,
        _this = this;

      _Class.__super__.init.call(this);
      return this._setter = new ObjSetter(this.binding, methods = {
        insert: function(item) {
          if (_this.binding._copyId) {
            _this.target._id(_this.binding._from._id());
          }
          if (~_this.target.indexOf(item)) {
            return methods.update(item);
          } else {
            return _this.target.push(item);
          }
        },
        update: function(item, index) {
          return _this.target.update(item);
        },
        remove: function(item) {
          var index;

          index = _this.target.indexOf(item);
          if (~index) {
            return _this.target.splice(index, 1);
          }
        }
      });
    };

    /*
    */


    _Class.prototype._change = function() {
      return this._setter._change.apply(this._setter, arguments);
    };

    /*
    */


    _Class.prototype.bothWays = function() {
      throw new Error("cannot bind both ways yet");
    };

    return _Class;

  })(require("bindable/lib/collection/setters/base"));

}).call(this);


    return module.exports;
});