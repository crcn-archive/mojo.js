// Generated by CoffeeScript 1.4.0
(function() {

  define(["./eventTree", "./binding", "dref"], function(EventTree, Binding, dref) {
    var Bindable;
    return Bindable = (function() {
      /*
      */

      function Bindable(data) {
        this.data = data != null ? data : {};
        this._emitter = new EventTree();
      }

      /*
      */


      Bindable.prototype.get = function(key) {
        return dref.get(this.data, key);
      };

      /*
      */


      Bindable.prototype.set = function(key, value) {
        dref.set(this.data, key, value);
        return this._emitter.emit(key);
      };

      /*
           called immediately
      */


      Bindable.prototype.bind = function(property, listener) {
        return this._emitter.on(property, new Binding(this, property, listener).listener);
      };

      return Bindable;

    })();
  });

}).call(this);
