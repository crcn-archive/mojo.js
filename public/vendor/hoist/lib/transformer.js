define(["require", "isa"], function(require) {

    var __dirname = "hoist/lib",
    __filename    = "hoist/lib/transformer.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports,
    global        = window;

    

    // Generated by CoffeeScript 1.4.0
(function() {
  var getArrayTypeCaster, getClassTypeCaster, getSimpleDataTypeCaster, getTypeCaster, isa, transformer;

  isa = require("isa");

  /*
  */


  getArrayTypeCaster = function() {
    return function(value) {
      if (isa.array(value)) {
        return value;
      }
      return [value];
    };
  };

  /*
  */


  getSimpleDataTypeCaster = function(typeClass) {
    return function(value) {
      return typeClass(value);
    };
  };

  /*
  */


  getClassTypeCaster = function(typeClass) {
    return function(value) {
      if (value && value.constructor === typeClass) {
        return value;
      }
      return new typeClass(value);
    };
  };

  /*
  */


  getTypeCaster = function(typeClass) {
    if (typeClass === Array) {
      return getArrayTypeCaster();
    }
    if ((typeClass === String) || (typeClass === Number)) {
      return getSimpleDataTypeCaster(typeClass);
    }
    return getClassTypeCaster(typeClass);
  };

  /*
  */


  module.exports = transformer = function(options) {
    var self;
    if (options == null) {
      options = {};
    }
    /*
    */

    if (!options.transform) {
      options.transform = function(value) {
        return value;
      };
    }
    /*
    */

    self = function(value, next) {
      if (arguments.length > 1 && isa["function"](arguments[arguments.length - 1])) {
        return options.root.async(value, next);
      } else {
        return options.root.sync.apply(null, arguments);
      }
    };
    if (!options.root) {
      options.root = self;
    }
    /*
    */

    self.options = options;
    /*
    */

    self.async = function(value, next) {
      var onResult;
      onResult = function(err, result) {
        if (err) {
          return next(err);
        }
        if (!options.next) {
          return next(null, result);
        }
        return options.next.async(result, next);
      };
      if (options.async) {
        return options.transform(value, onResult);
      } else {
        return onResult(null, options.transform(value));
      }
    };
    /*
    */

    self.sync = function(value) {
      arguments[0] = options.transform.apply(null, arguments);
      if (options.next) {
        value = options.next.sync.apply(null, arguments);
      }
      return value;
    };
    /*
    */

    self.cast = function(typeClass) {
      return options.next = transformer({
        root: options.root,
        transform: getTypeCaster(typeClass)
      });
    };
    /*
    */

    self.map = function(fn, test) {
      return options.next = transformer({
        parent: self,
        root: options.root,
        async: fn.length > 1,
        transform: fn
      });
    };
    return self;
  };

}).call(this);


    return module.exports;
});