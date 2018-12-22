'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConnectedRouter = require('./ConnectedRouter');

Object.defineProperty(exports, 'createConnectedRouter', {
  enumerable: true,
  get: function get() {
    return _ConnectedRouter.createConnectedRouter;
  }
});

var _reducer = require('./reducer');

Object.defineProperty(exports, 'createRouterReducer', {
  enumerable: true,
  get: function get() {
    return _reducer.createRouterReducer;
  }
});

var _history = require('history');

Object.keys(_history).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _history[key];
    }
  });
});