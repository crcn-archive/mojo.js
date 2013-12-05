
var expect = require("expect.js"),
mojo       = require("../.."),
bindable   = require("bindable"),
nofactor   = require("nofactor");

describe("deorators/events#", function () {

  var app;

  before(function () {
    app = new mojo.Application({ nodeFactory: nofactor.dom })
  })

  /**
   */


  it("capture a bubbled event", function (next) {

    var view = new mojo.View({
      events: {
        "test": function (event, v) {
          expect(v).to.be("v");
          next();
        }
      }
    }, app);

    view.__decorators = undefined;

    view.render();
    view.emit("test", "v");
  });

  /**
   */

  it("can call a ref to a view method", function (next) {

    var view = new mojo.View({
      events: {
        "test": "onTest"
      },
      onTest: function (event, v) {
        expect(v).to.be("v");
        next();
      }
    }, app);

    view.__decorators = undefined;

    view.render();
    view.emit("test", "v");
  });

  /**
   */

  it("lowercases events", function () {
    var emits = 0;
    var view = new mojo.View({
      events: {
        "camelEvent": function () {
          emits++;
        }
      }
    }, app);

    view.__decorators = undefined;

    view.render();
    view.emit("camelEvent");
    view.emit("camelevent");
    expect(emits).to.be(1);
  })

  /**
   */

  it("can listen on a DOM element", function (next) {
    var view = new mojo.View({
      events: {
        "click .button": function() {
          next();
        }
      },
      _onRender: function() {
        mojo.View.prototype._onRender.call(this);
        this.section.append($("<div><a href='#' class='button'>button</a></div>")[0]);
      },
      click: function() {  
        this.$(".button").click();
      }
    }, app);
    view.__decorators = undefined;
    view.render();
    view.click();
  });

  /**
   */

  it("can listen to multiple elements", function () {
    var clicks = 0;
    var view = new mojo.View({
      events: {
        "click .button .button2": function() {
          clicks++;
        },
        "camelEvent": function () {
          clicks++;
        }
      },
      _onRender: function() {
        mojo.View.prototype._onRender.call(this);
        this.section.append($("<div><a href='#' class='button button2'>button</a></div>")[0]);
      },
      click: function() {  
        this.$(".button").click();
        this.$(".button2").click();
        this.emit("camelevent")
      }
    }, app);
    view.__decorators = undefined;
    view.render();
    view.click();
    expect(clicks).to.be(3);
  })

  /**
   */

  it("removes the events decorator once the view has been disposed", function () {
    var emitted = false;
    var view = new mojo.View({
      events: {
        "click .button": function() {
          emitted = true;
        },
        "camelEvent": function () {
          emitted = true;
        }
      },
      _render: function (section) {
        section.append($("<div><a href='#' class='button'>button</a></div>")[0]);
        return section;
      }
      click: function() {  
        this.$(".button").click();
        this.emit("camelevent");
      }
    }, app);
    view.__decorators = undefined;
    view.render();
    view.dispose();
    view.click();
    expect(emitted).to.be(false);
  });
});