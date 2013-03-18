// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["disposable", "eventemitter2"], function(disposable, events) {
    var EventEmitter;
    return EventEmitter = (function(_super) {

      __extends(EventEmitter, _super);

      /*
      */


      function EventEmitter() {
        EventEmitter.__super__.constructor.call(this, {
          wildcard: true
        });
      }

      /*
      */


      EventEmitter.prototype.on = function(key, listener) {
        var disposables, k, listeners,
          _this = this;
        disposables = disposable.create();
        if (arguments.length === 1) {
          listeners = key;
          for (k in listeners) {
            disposables.add(this.on(k, listeners[k]));
          }
          return disposables;
        }
        key.split(" ").forEach(function(key) {
          EventEmitter.__super__.on.call(_this, key, listener);
          return disposables.add(function() {
            return _this.off(key, listener);
          });
        });
        return disposables;
      };

      return EventEmitter;

    })(events.EventEmitter2);
  });

}).call(this);
