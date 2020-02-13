function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var App =
/*#__PURE__*/
function (_React$PureComponent) {
  "use strict";

  _inherits(App, _React$PureComponent);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      opened: false,
      messages: [],
      errors: []
    };
    _this.onOpen = _this.onOpen.bind(_assertThisInitialized(_this));
    _this.onMessage = _this.onMessage.bind(_assertThisInitialized(_this));
    _this.onError = _this.onError.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var websocket = new WebSocket("wss://server.lucasholten.com:12121");
      websocket.onopen = this.onOpen;
      websocket.onmessage = this.onMessage;
      websocket.onerror = this.onError;
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      this.setState({
        opened: true
      });
    }
  }, {
    key: "onMessage",
    value: function onMessage(message) {
      // console.log(message)
      var data = JSON.parse(message.data);
      this.setState(function (state) {
        return {
          messages: [].concat(_toConsumableArray(state.messages), _toConsumableArray(data))
        };
      });
    }
  }, {
    key: "onError",
    value: function onError(message) {
      this.setState(function (state) {
        return {
          errors: [].concat(_toConsumableArray(state.errors), [message])
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var status = this.state.opened ? "Connected" : "Not connected";
      var listGroup = React.createElement("ul", {
        className: "list-group list-group-flush"
      }, this.state.messages.map(function (message, i) {
        return React.createElement("li", {
          className: "list-group-item d-flex justify-content-between align-items-center",
          key: JSON.stringify(message)
        }, React.createElement("span", {
          style: {
            width: 30,
            flexGrow: 0
          }
        }, i + 1, "."), message.name, React.createElement("span", {
          style: {
            flexGrow: 1
          }
        }), React.createElement("span", {
          class: "badge badge-info badge-pill",
          style: {
            backgroundColor: "#1a5aa2"
          }
        }, message.score));
      }));
      var table = React.createElement("table", {
        className: "table table-hover"
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
        scope: "col",
        style: {
          width: 50
        }
      }, "#"), React.createElement("th", {
        scope: "col"
      }, "User"), React.createElement("th", {
        scope: "col"
      }, "Score"))), React.createElement("tbody", null, this.state.messages.map(function (message, i) {
        return React.createElement("tr", {
          key: JSON.stringify(message)
        }, React.createElement("th", {
          scope: "row"
        }, i + 1), React.createElement("td", null, message.name), React.createElement("td", null, message.score));
      })));
      return React.createElement("div", {
        className: "card",
        style: {
          width: 300
        }
      }, React.createElement("div", {
        className: "card-body"
      }, React.createElement("h5", {
        className: "card-title"
      }, "High Scores")), !this.state.opened && React.createElement("div", {
        className: "card-body d-flex justify-content-center"
      }, React.createElement("progress", {
        className: "pure-material-progress-circular"
      })), listGroup, React.createElement("div", {
        className: "card-footer text-muted"
      }, status));
    }
  }]);

  return App;
}(React.PureComponent);

ReactDOM.render(React.createElement(App, null), document.querySelector("#app"));