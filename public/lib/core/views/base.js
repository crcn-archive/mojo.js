// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "events", "outcome"], function($, events, outcome) {
    var BaseView;
    return BaseView = (function(_super) {

      __extends(BaseView, _super);

      /*
      */


      function BaseView(options) {
        this.options = options != null ? options : {};
        this.rerender = __bind(this.rerender, this);

        this._o = outcome.e(this);
      }

      /*
           returns a search for a particular element
      */


      BaseView.prototype.$ = function(search) {
        return $.find(search);
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
        return this.renderTemplate(this._o.e(callback).s(function(content) {
          _this.element.html(content);
          return callback;
        }));
      };

      /*
           re-renders an element
      */


      BaseView.prototype.rerender = function(callback) {
        if (callback == null) {
          callback = function() {};
        }
        if (!this.selector) {
          return callback();
        }
        return this.attach(this.selector, callback);
      };

      /*
           returns the template data
      */


      BaseView.prototype.templateData = function() {
        return this.options.data || {};
      };

      /*
           renders the template if it exists
      */


      BaseView.prototype.renderTemplate = function(callback) {
        if (!this.options.template) {
          return callback(null, "");
        }
        return this.options.template.render(this.templateData(), callback);
      };

      return BaseView;

    })(events.EventEmitter);
  });

}).call(this);
