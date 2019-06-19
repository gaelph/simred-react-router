"use strict";

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createConnectedRouter: true,
  createRouterReducer: true
};
Object.defineProperty(exports, "createConnectedRouter", {
  enumerable: true,
  get: function get() {
    return _ConnectedRouter.createConnectedRouter;
  }
});
Object.defineProperty(exports, "createRouterReducer", {
  enumerable: true,
  get: function get() {
    return _reducer.createRouterReducer;
  }
});

var _ConnectedRouter = require("./ConnectedRouter");

var _reducer = require("./reducer");

var _history = require("history");

Object.keys(_history).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _history[key];
    }
  });
});