define(["require"], function(require) {

    var __dirname = "bindable/lib/core",
    __filename    = "bindable/lib/core/builder.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports,
    global        = window;

    

    // Generated by CoffeeScript 1.6.2
(function() {
  var Builder, CallChain;

  CallChain = (function() {
    /*
    */
    CallChain.prototype.__isCallChain = true;

    /*
    */


    function CallChain(_targetClass, methods) {
      this._targetClass = _targetClass;
      this._addMethods(methods);
      this._callChain = [];
    }

    /*
    */


    CallChain.prototype.createObject = function() {
      var C, args, call, clazz, obj, _i, _len, _ref, _results;

      clazz = this._targetClass;
      args = arguments;
      C = function() {
        return clazz.apply(this, args);
      };
      C.prototype = clazz.prototype;
      obj = new C();
      _ref = this._callChain;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        call = _ref[_i];
        _results.push(obj = obj[call.method].apply(obj, call.args));
      }
      return _results;
    };

    /*
    */


    CallChain.prototype.copyId = function(value) {
      if (!arguments.length) {
        return this._copyId;
      }
      this._copyId = value;
      return this;
    };

    /*
    */


    CallChain.prototype.callMethod = function(method, args) {
      this._callChain.push({
        method: method,
        args: args
      });
      return this;
    };

    /*
    */


    CallChain.prototype._addMethods = function(methods) {
      var method, _i, _len;

      for (_i = 0, _len = methods.length; _i < _len; _i++) {
        method = methods[_i];
        this._addMethod(method);
      }
      return this;
    };

    /*
    */


    CallChain.prototype._addMethod = function(method) {
      return this[method] = function() {
        return this.callMethod(method, arguments);
      };
    };

    return CallChain;

  })();

  module.exports = Builder = (function() {
    /*
    */
    function Builder(_class, _attach) {
      this._class = _class;
      this._attach = _attach != null ? _attach : this;
      this._createMethods();
    }

    /*
    */


    Builder.prototype._createMethods = function() {
      var key, _results;

      this._methods = [];
      _results = [];
      for (key in this._class.prototype) {
        if (key.substr(0, 1) === "_") {
          continue;
        }
        _results.push(this._addMethod(key));
      }
      return _results;
    };

    /*
    */


    Builder.prototype._addMethod = function(method) {
      var _this = this;

      this._methods.push(method);
      return this._attach[method] = function() {
        return new CallChain(_this._class, _this._methods).callMethod(method, arguments);
      };
    };

    return Builder;

  })();

}).call(this);


    return module.exports;
});