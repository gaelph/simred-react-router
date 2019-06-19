"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouterReducer = void 0;

var _simred = require("simred");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducerFunctions = function reducerFunctions(history) {
  var locationChange = function locationChange() {
    return function (location, action) {
      return {
        location: location,
        action: action
      };
    };
  };

  var callHistoryMethod = function callHistoryMethod(state) {
    return function (method) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      history[method].apply(history, args);
      return state;
    };
  };

  var push = function push(state) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return callHistoryMethod(state).apply(void 0, ['push'].concat(args));
    };
  };

  var replace = function replace(state) {
    return function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return callHistoryMethod(state).apply(void 0, ['replace'].concat(args));
    };
  };

  var go = function go(state) {
    return function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return callHistoryMethod(state).apply(void 0, ['go'].concat(args));
    };
  };

  var goBack = function goBack(state) {
    return function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return callHistoryMethod(state).apply(void 0, ['goBack'].concat(args));
    };
  };

  var goForward = function goForward(state) {
    return function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return callHistoryMethod(state).apply(void 0, ['goForward'].concat(args));
    };
  };

  return {
    locationChange: locationChange,
    callHistoryMethod: callHistoryMethod,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward
  };
};

var createRouterReducer = function createRouterReducer(history) {
  return (0, _simred.createReducer)(_objectSpread({}, reducerFunctions(history)), {
    location: history.location,
    action: history.action
  });
};

exports.createRouterReducer = createRouterReducer;