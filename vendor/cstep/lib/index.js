define(["require", "/vendor/tq/lib/index.js"], function(require) {

    var __dirname = "/vendor/cstep/lib",
    __filename    = "/vendor/cstep/lib/index.js",
    module        = { exports: {} },
    exports       = module.exports;

    

    // Generated by CoffeeScript 1.4.0
(function() {
  var CStep, tq, tryInitializingCStep;

  tq = require("/vendor/tq/lib/index.js");

  tryInitializingCStep = function(target) {
    if (target.cstep) {
      return target.cstep;
    }
    return target.cstep = new CStep();
  };

  CStep = (function() {
    /*
        Function: 
    
        Parameters:
    */

    function CStep() {
      this._queue = tq.queue().start();
    }

    /*
        Function: 
    
        Parameters:
    */


    CStep.prototype.add = function(fnOrObj) {
      var fn, self, _i, _len;
      if (typeof fnOrObj === "object") {
        return this.add(function(next) {
          var _this = this;
          return tryInitializingCStep(fnOrObj).add(function(parentNext) {
            next();
            return parentNext();
          });
        });
      }
      if (arguments.length > 1) {
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          fn = arguments[_i];
          this.add(fn);
        }
        this;

      }
      if (!this._cqueue || this._calling) {
        this._cqueue = tq.queue().start();
        this._callingStepper = false;
      }
      self = this;
      this._cqueue.push(function() {
        var args, oldQueue;
        args = Array.prototype.slice.apply(arguments);
        args[fnOrObj.length - 1] = this;
        oldQueue = self._cqueue;
        self._callingStepper = true;
        fnOrObj.apply(self, args);
        self._callingStepper = false;
        return self._cqueue = oldQueue;
      });
      return this;
    };

    return CStep;

  })();

  module.exports = function(fnOrObj) {
    if (typeof fnOrObj === "object") {
      return tryInitializingCStep(fnOrObj);
    }
    return function() {
      var args, called, orgNext, tole,
        _this = this;
      tryInitializingCStep(this);
      args = Array.prototype.slice.apply(arguments);
      tole = typeof args[args.length - 1];
      orgNext = null;
      if (tole === "function" || tole === "undefined") {
        orgNext = args.pop();
      }
      if (!orgNext) {
        orgNext = function(err) {
          if (err) {
            throw err;
          }
        };
      }
      called = false;
      this.cstep.add(function(next) {
        args[fnOrObj.length - 1] = function() {
          if (called) {
            throw new Error("cannot call cstep callback twice");
          }
          called = true;
          orgNext.apply(_this, arguments);
          return next();
        };
        return fnOrObj.apply(_this, args);
      });
      return this;
    };
  };

}).call(this);


    return module.exports;
});