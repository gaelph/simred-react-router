"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnectedRouter = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactSimred = require("react-simred");

var _context = _interopRequireDefault(require("react-simred/lib/context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createConnectedRouter = function createConnectedRouter(nameInState) {
  var ConnectedRouter = function (_React$Component) {
    _inherits(ConnectedRouter, _React$Component);

    function ConnectedRouter(props) {
      var _this;

      _classCallCheck(this, ConnectedRouter);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ConnectedRouter).call(this, props));
      _this.state = {
        inTimeTravelling: false
      };

      _this.handleLocationChange = function (location, action) {
        if (!this.state.inTimeTravelling && props.onLocationChanged) {
          props.onLocationChanged(location, action);
        } else {
          this.setState({
            inTimeTravelling: false
          });
        }
      }.bind(_assertThisInitialized(_this));

      _this.unlisten = props.history.listen(_this.handleLocationChange);
      return _this;
    }

    _createClass(ConnectedRouter, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var history = this.props.history;
        this.handleLocationChange(history.location, history.action);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unlisten();
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            history = _this$props.history,
            children = _this$props.children;
        return React.createElement(_reactRouter.Router, {
          history: history
        }, children);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        var location = props.location,
            history = props.history;
        if (!location || !history) return state;
        var pathnameInStore = location.pathname,
            searchInStore = location.search,
            hashInStore = location.hash;
        var _history$location = history.location,
            pathnameInHistory = _history$location.pathname,
            searchInHistory = _history$location.search,
            hashInHistory = _history$location.hash;

        if (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore) {
          state.inTimeTravelling = true;
          props.history.push({
            pathname: pathnameInStore,
            search: searchInStore,
            hash: hashInStore
          });
        }

        return state;
      }
    }]);

    return ConnectedRouter;
  }(React.Component);

  var mapStateToProps = function mapStateToProps(state) {
    var routerState = state[nameInState];
    var location = routerState.location,
        action = routerState.action;
    return {
      location: location,
      action: action
    };
  };

  var mapActionsToProps = function mapActionsToProps(actions) {
    var locationChange = actions[nameInState].locationChange;
    return {
      onLocationChanged: locationChange
    };
  };

  var ConnectedRouterWithContext = function ConnectedRouterWithContext(props) {
    var ContextToUse = props.context || _context.default;

    if (ContextToUse == null) {
      throw new Error('Conext cannot be null');
    }

    return React.createElement(ContextToUse.Consumer, null, function (ctx) {
      return ctx ? React.createElement(ConnectedRouter, _extends({
        store: ctx.store
      }, props)) : React.createElement(React.Fragment, null);
    });
  };

  return (0, _reactSimred.connect)(mapStateToProps, mapActionsToProps)(ConnectedRouter);
};

exports.createConnectedRouter = createConnectedRouter;