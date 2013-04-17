define(["require", "mannequin/lib/utils", "async", "mannequin/lib/propertyDefinition"], function(require) {

    var __dirname = "mannequin/lib",
    __filename    = "mannequin/lib/schema.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports,
    global        = window;

    

    // Generated by CoffeeScript 1.6.2
(function() {
  var PropertyDefinition, Schema, async, utils;

  utils = require("mannequin/lib/utils");

  async = require("async");

  PropertyDefinition = require("mannequin/lib/propertyDefinition");

  module.exports = Schema = (function() {
    /*
    */
    Schema.prototype.__isSchema = true;

    /*
    */


    function Schema(definition, options) {
      this.definition = definition;
      this.options = options;
      this._definitionsByKey = {};
      this.build();
    }

    /*
     validates an object against all definitions
    */


    Schema.prototype.test = function(target, next) {
      return async.forEach(this.definitions, (function(definition, next) {
        return definition.test(target, next);
      }), next);
    };

    /*
    */


    Schema.prototype.hasDefinition = function() {
      return !!this._definitionsByKey[key];
    };

    /*
    */


    Schema.prototype.getDefinition = function(key) {
      return this._definitionsByKey[key];
    };

    /*
    */


    Schema.prototype.refs = function() {
      var def, refs, _i, _len, _ref;

      refs = [];
      _ref = this.definitions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        def = _ref[_i];
        if (def.options.$ref) {
          refs.push(def);
        }
      }
      return refs;
    };

    /* 
     Clones the schema. Necessary for the dictionary
    */


    Schema.prototype.clone = function() {
      return new Schema(this.definition, this.options);
    };

    /* 
     Stores information about all registered schemas
    */


    Schema.prototype.dictionary = function(value) {
      if (!arguments.length) {
        return this._dictionary;
      }
      this._dictionary = value;
      return this;
    };

    /*
     synonym for test
    */


    Schema.prototype.validate = function(target, next) {
      return this.test(target, next);
    };

    /*
    */


    Schema.prototype.build = function() {
      var flattenedDefinitions, key, _results;

      flattenedDefinitions = utils.flattenDefinitions(this.definition);
      this.definitions = [];
      _results = [];
      for (key in flattenedDefinitions) {
        _results.push(this.definitions.push(this._definitionsByKey[key] = new PropertyDefinition(this, key, flattenedDefinitions[key])));
      }
      return _results;
    };

    return Schema;

  })();

}).call(this);


    return module.exports;
});