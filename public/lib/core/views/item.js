// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["./base", "../models/base"], function(BaseView, BaseModel) {
    var ItemView;
    return ItemView = (function(_super) {

      __extends(ItemView, _super);

      /*
      */


      function ItemView(options) {
        if (options == null) {
          options = {};
        }
        this._onTargetUpdate = __bind(this._onTargetUpdate, this);

        ItemView.__super__.constructor.call(this, options);
        this.source(options.data || {});
      }

      /*
      */


      ItemView.prototype.source = function(value) {
        if (!arguments.length) {
          return this._target;
        }
        if (!value) {
          value = {};
        }
        if (this._updateListener) {
          this._updateListener.dispose();
        }
        this._target = value.hasOwnProperty("get") ? value : new BaseModel(value);
        return this._updateListener = this._target.on("update", this._onTargetUpdate);
      };

      /*
      */


      ItemView.prototype.templateData = function() {
        return this._target.get();
      };

      /*
      */


      ItemView.prototype._onTargetUpdate = function() {
        console.log(this._target.get());
        return this.rerender();
      };

      return ItemView;

    })(BaseView);
  });

}).call(this);
