'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnectedRouter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactRouter = require('react-router');

var _reactSimred = require('react-simred');

var _context = require('react-simred/lib/context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createConnectedRouter = exports.createConnectedRouter = function createConnectedRouter(nameInState) {
  var ConnectedRouter = function (_React$Component) {
    _inherits(ConnectedRouter, _React$Component);

    function ConnectedRouter(props) {
      _classCallCheck(this, ConnectedRouter);

      var _this = _possibleConstructorReturn(this, (ConnectedRouter.__proto__ || Object.getPrototypeOf(ConnectedRouter)).call(this, props));

      _this.inTimeTravelling = false;

      var history = props.history,
          store = props.store;


      store.subscribe(function (state) {
        var routerState = state[nameInState];

        var _routerState$location = routerState.location,
            pathnameInStore = _routerState$location.pathname,
            searchInStore = _routerState$location.search,
            hashInStore = _routerState$location.hash;
        var _history$location = history.location,
            pathnameInHistory = _history$location.pathname,
            searchInHistory = _history$location.search,
            hashInHistory = _history$location.hash;

        // If we do time travelling, the location in store is changed but location in history is not changed

        if (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore) {
          _this.inTimeTravelling = true;
          // Update history's location to match store's location
          props.history.push({
            pathname: pathnameInStore,
            search: searchInStore,
            hash: hashInStore
          });
        }
      });

      var handleLocationChange = function handleLocationChange(location, action) {
        // Dispatch onLocationChanged except when we're in time travelling
        if (!_this.inTimeTravelling) {
          props.onLocationChanged(location, action);
        } else {
          _this.inTimeTravelling = false;
        }
      };

      // Listen to history changes
      _this.unlisten = props.history.listen(handleLocationChange);
      // Dispatch a location change action for the initial location
      handleLocationChange(props.history.location, props.history.action);
      return _this;
    }

    _createClass(ConnectedRouter, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unlisten();
        // this.unsubscribe()
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            history = _props.history,
            children = _props.children;


        return React.createElement(
          _reactRouter.Router,
          { history: history },
          children
        );
      }
    }]);

    return ConnectedRouter;
  }(React.Component);

  var mapStateToProps = function mapStateToProps(state) {
    var routerState = state[nameInState];

    var location = routerState.location,
        action = routerState.action;


    return { location: location, action: action };
  };

  var mapActionsToProps = function mapActionsToProps(actions) {
    var locationChange = actions[nameInState].locationChange;


    return { onLocationChanged: locationChange };
  };

  var ConnectedRouterWithContext = function ConnectedRouterWithContext(props) {
    var ContextToUse = props.context || _context2.default;

    /* istanbul ignore if */
    if (ContextToUse == null) {
      throw new Error('Conext cannot be null');
    }

    return React.createElement(
      ContextToUse.Consumer,
      null,
      function (_ref) {
        var store = _ref.store;
        return React.createElement(ConnectedRouter, _extends({ store: store }, props));
      }
    );
  };

  return (0, _reactSimred.connect)(mapStateToProps, mapActionsToProps)(ConnectedRouterWithContext);
};