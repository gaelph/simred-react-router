'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouterReducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _simred = require('simred');

var reducerFunctions = function reducerFunctions(history) {
  var locationChange = function locationChange() {
    return function (location, action) {
      return { location: location, action: action };
    };
  };

  var callHistoryMethod = function callHistoryMethod(state) {
    return function (method) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      history[method].apply(history, args);

      return state;
    };
  };

  var push = function push(state) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return callHistoryMethod(state).apply(undefined, ['push'].concat(args));
    };
  };
  var replace = function replace(state) {
    return function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return callHistoryMethod(state).apply(undefined, ['replace'].concat(args));
    };
  };
  var go = function go(state) {
    return function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return callHistoryMethod(state).apply(undefined, ['go'].concat(args));
    };
  };
  var goBack = function goBack(state) {
    return function () {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return callHistoryMethod(state).apply(undefined, ['goBack'].concat(args));
    };
  };
  var goForward = function goForward(state) {
    return function () {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return callHistoryMethod(state).apply(undefined, ['goForward'].concat(args));
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

var createRouterReducer = exports.createRouterReducer = function createRouterReducer(history) {
  return (0, _simred.createReducer)(_extends({}, reducerFunctions(history)), {
    location: history.location,
    action: history.action
  });
};