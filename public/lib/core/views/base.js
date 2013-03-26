// Generated by CoffeeScript 1.6.2
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "events", "bindable", "../utils/idGenerator", "outcome", "dref", "underscore", "./decor/facade", "asyngleton", "../models/locator", "../utils/async"], function($, events, bindable, generateId, outcome, dref, _, ViewDecorator, asyngleton, modelLocator, async) {
    var BaseView;

    return BaseView = (function(_super) {
      __extends(BaseView, _super);

      /*
       may seem a bit antipattern-ish to use a singleton object like this for all views, bit 
       it makes data-binding to one object a helluvalot easier, and it also promotes good use by making it
       easier for developer to reuse global data. 
      
       This also reduces the amount of written code tremendously.
      */


      BaseView.prototype.modelLocator = modelLocator;

      /*
      */


      function BaseView(options) {
        if (options == null) {
          options = {};
        }
        this.rerender = __bind(this.rerender, this);
        options.view = this;
        options._id = dref.get(options, "_id") || generateId();
        BaseView.__super__.constructor.call(this, options);
        this.decorator = new ViewDecorator(this);
        this.loadables = new bindable.Collection([this.decorator]);
        this._o = outcome.e(this);
        this._init();
        this.decorator.init();
      }

      /*
       visible is a nice toggle which handles events / bindings - and other things
      */


      BaseView.prototype.visible = function() {};

      /*
      */


      BaseView.prototype.init = function() {};

      /*
      */


      BaseView.prototype._init = function() {
        this.init();
        return this._listen();
      };

      /*
      */


      BaseView.prototype._listen = function() {
        return this.on({
          rendered: this._onRendered,
          attached: this._onAttached,
          removed: this._onRemoved,
          loaded: this._onLoaded
        });
      };

      /*
       returns a search for a particular element
      */


      BaseView.prototype.$ = function(search) {
        var _ref;

        return (_ref = this.element) != null ? _ref.find(search) : void 0;
      };

      /*
       attaches to an element
      */


      BaseView.prototype.attach = function(selectorOrElement, callback) {
        var _this = this;

        if (callback == null) {
          callback = (function() {});
        }
        this.element = typeof selectorOrElement === "string" ? $(selectorOrElement) : selectorOrElement;
        this.selector = selectorOrElement;
        return this.load(function() {
          return _this.decorator.attach(_this._o.e(callback).s(function() {
            callback();
            return _this.emit("attached");
          }));
        });
      };

      /*
       re-renders an element
      */


      BaseView.prototype.rerender = function(callback) {
        if (callback == null) {
          callback = function() {};
        }
        callback = this._fixCallback(callback);
        if (!this.selector) {
          return callback();
        }
        return this.attach(this.selector, callback);
      };

      /*
      */


      BaseView.prototype.remove = function(callback) {
        var _this = this;

        if (callback == null) {
          callback = (function() {});
        }
        callback = this._fixCallback(callback);
        if (!this.element) {
          return callback();
        }
        return this.decorator.remove(this._o.e(callback).s(function() {
          _this.element.unbind("*");
          _this.element.html("");
          callback();
          return _this.emit("removed");
        }));
      };

      /*
      */


      BaseView.prototype.load = asyngleton(function(callback) {
        var _this = this;

        return async.eachSeries(this.loadables.source(), (function(loadable, next) {
          return loadable.load(next);
        }), this._o.e(callback).s(function() {
          callback();
          return _this.emit("loaded");
        }));
      });

      /*
       Fixes the callback incase it's not a function
      */


      BaseView.prototype._fixCallback = function(callback) {
        if (typeof callback !== "function") {
          callback = (function() {});
        }
        return callback;
      };

      /*
       DEPRECATED
      */


      BaseView.prototype._onReady = function() {};

      BaseView.prototype._onRendered = function() {
        return this._onReady();
      };

      BaseView.prototype._onAttached = function() {};

      BaseView.prototype._onRemoved = function() {};

      BaseView.prototype._onLoaded = function() {};

      return BaseView;

    })(bindable.Object);
  });

}).call(this);
