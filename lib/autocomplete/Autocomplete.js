'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autocomplete = exports.autocompleteFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Chip = require('../chip/Chip.js');

var _Chip2 = _interopRequireDefault(_Chip);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

var _wuBabel = require('wu-babel');

var _wuBabel2 = _interopRequireDefault(_wuBabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up'
};

var factory = function factory(Chip, Input) {
  var Autocomplete = function (_Component) {
    _inherits(Autocomplete, _Component);

    function Autocomplete() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, Autocomplete);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Autocomplete)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        direction: _this.props.direction,
        focus: false,
        showAllSuggestions: _this.props.showSuggestionsWhenValueIsSet,
        query: _this.query(_this.props.value)
      }, _this.handleChange = function (keys, event) {
        var key = _this.props.multiple ? keys : keys[0];
        var query = _this.query(key);
        if (_this.props.onChange) _this.props.onChange(key, event);
        _this.setState({ focus: false, query: query, showAllSuggestions: _this.props.showSuggestionsWhenValueIsSet }, function () {
          _reactDom2.default.findDOMNode(_this).querySelector('input').blur();
        });
      }, _this.handleQueryBlur = function () {
        if (_this.state.focus) _this.setState({ focus: false });
      }, _this.handleQueryChange = function (value) {
        _this.setState({ query: value, showAllSuggestions: false });
      }, _this.handleQueryFocus = function () {
        _this.refs.suggestions.scrollTop = 0;
        _this.setState({ active: '', focus: true });
      }, _this.handleQueryKeyDown = function (event) {
        // Clear query when pressing backspace and showing all suggestions.
        var shouldClearQuery = event.which === 8 && _this.props.showSuggestionsWhenValueIsSet && _this.state.showAllSuggestions;
        if (shouldClearQuery) {
          _this.setState({ query: '' });
        }
      }, _this.handleQueryKeyUp = function (event) {
        if (event.which === 13) {
          var target = _this.state.active;
          if (!target) {
            target = [].concat(_toConsumableArray(_this.suggestions().keys()))[0];
            _this.setState({ active: target });
          }
          _this.select(target, event);
        }

        if (event.which === 27) _reactDom2.default.findDOMNode(_this).querySelector('input').blur();

        if ([40, 38].indexOf(event.which) !== -1) {
          var suggestionsKeys = [].concat(_toConsumableArray(_this.suggestions().keys()));
          var index = suggestionsKeys.indexOf(_this.state.active) + (event.which === 40 ? +1 : -1);
          if (index < 0) index = suggestionsKeys.length - 1;
          if (index >= suggestionsKeys.length) index = 0;
          _this.setState({ active: suggestionsKeys[index] });
        }
      }, _this.handleSuggestionHover = function (key) {
        _this.setState({ active: key });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Autocomplete, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.source = this.calculateSource(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.source = this.calculateSource(nextProps);
        if (!this.props.multiple) {
          this.setState({
            query: this.query(nextProps.value)
          });
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.focus && nextState.focus && this.props.direction === POSITION.AUTO) {
          var direction = this.calculateDirection();
          if (this.state.direction !== direction) {
            this.setState({ direction: direction });
            return false;
          }
        }
        return true;
      }
    }, {
      key: 'calculateDirection',
      value: function calculateDirection() {
        if (this.props.direction === 'auto') {
          var client = _reactDom2.default.findDOMNode(this.refs.input).getBoundingClientRect();
          var screen_height = window.innerHeight || document.documentElement.offsetHeight;
          var up = client.top > screen_height / 2 + client.height;
          return up ? 'up' : 'down';
        } else {
          return this.props.direction;
        }
      }
    }, {
      key: 'query',
      value: function query(key) {
        return !this.props.multiple && key ? this.source.find(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1);

          var k = _ref2[0];
          return key === k;
        })[1] : '';
      }
    }, {
      key: 'suggestions',
      value: function suggestions() {
        var _this2 = this;

        var query = this.state.query.toLowerCase().trim() || '';
        var values = this.values();
        var source = this.source;

        // Suggest any non-set value which matches the query
        if (this.props.multiple) {
          return (0, _wuBabel2.default)(source).filter(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2);

            var k = _ref4[0];
            var v = _ref4[1];
            return values.has(k) && _this2.matches(v.toLowerCase().trim(), query);
          });
        }

        // When multiple is false, suggest any value which matches the query if showAllSuggestions is false
        if (query && !this.state.showAllSuggestions) {
          return (0, _wuBabel2.default)(source).filter(function (kv) {
            return _this2.matches(kv[1].toLowerCase().trim(), query);
          }).take(this.props.limit);
        }

        // When multiple is false, suggest all values when showAllSuggestions is true
        return (0, _wuBabel2.default)(source).take(this.props.limit);
      }
    }, {
      key: 'matches',
      value: function matches(value, query) {
        var suggestionMatch = this.props.suggestionMatch;


        if (suggestionMatch === 'start') {
          return value.startsWith(query);
        } else if (suggestionMatch === 'anywhere') {
          return value.includes(query);
        } else if (suggestionMatch === 'word') {
          var re = new RegExp('\\b' + query, 'g');
          return re.test(value);
        }

        return false;
      }
    }, {
      key: 'calculateSource',
      value: function calculateSource(props) {
        var src = props.source;

        if (src.hasOwnProperty('length')) {
          var sourceArray = function sourceArray(item) {
            return Array.isArray(item) ? item : [item, item];
          };

          return src.map(sourceArray);
        } else {
          return Object.keys(src).map(function (key) {
            return [key, src[key]];
          });
        }
      }
    }, {
      key: 'values',
      value: function values() {
        var valueMap = new Map();
        var vals = this.props.multiple ? this.props.value : [this.props.value];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var k = _step$value[0];
            var v = _step$value[1];

            if (vals.indexOf(k) !== -1) valueMap.set(k, v);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return valueMap;
      }
    }, {
      key: 'select',
      value: function select(key, event) {
        _events2.default.pauseEvent(event);
        var values = this.values(this.props.value);
        this.handleChange([key].concat(_toConsumableArray(values.keys())), event);
      }
    }, {
      key: 'unselect',
      value: function unselect(key, event) {
        if (!this.props.disabled) {
          var values = this.values(this.props.value);
          values.delete(key);
          this.handleChange([].concat(_toConsumableArray(values.keys())), event);
        }
      }
    }, {
      key: 'renderSelected',
      value: function renderSelected() {
        var _this3 = this;

        if (this.props.multiple) {
          var selectedItems = [].concat(_toConsumableArray(this.values())).map(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2);

            var key = _ref6[0];
            var value = _ref6[1];

            return _react2.default.createElement(
              Chip,
              {
                key: key,
                className: _this3.props.theme.value,
                deletable: true,
                onDeleteClick: _this3.unselect.bind(_this3, key)
              },
              value
            );
          });

          return _react2.default.createElement(
            'ul',
            { className: this.props.theme.values },
            selectedItems
          );
        }
      }
    }, {
      key: 'renderSuggestions',
      value: function renderSuggestions() {
        var _this4 = this;

        var theme = this.props.theme;

        var suggestions = [].concat(_toConsumableArray(this.suggestions())).map(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2);

          var key = _ref8[0];
          var value = _ref8[1];

          var className = (0, _classnames5.default)(theme.suggestion, _defineProperty({}, theme.active, _this4.state.active === key));
          return _react2.default.createElement(
            'li',
            {
              key: key,
              className: className,
              onMouseDown: _this4.select.bind(_this4, key),
              onMouseOver: _this4.handleSuggestionHover.bind(_this4, key)
            },
            value
          );
        });

        var className = (0, _classnames5.default)(theme.suggestions, _defineProperty({}, theme.up, this.state.direction === 'up'));
        return _react2.default.createElement(
          'ul',
          { ref: 'suggestions', className: className },
          suggestions
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var error = _props.error;
        var label = _props.label;
        var source = _props.source;
        var suggestionMatch = _props.suggestionMatch;
        var //eslint-disable-line no-unused-vars
        selectedPosition = _props.selectedPosition;
        var showSuggestionsWhenValueIsSet = _props.showSuggestionsWhenValueIsSet;
        var //eslint-disable-line no-unused-vars
        theme = _props.theme;

        var other = _objectWithoutProperties(_props, ['error', 'label', 'source', 'suggestionMatch', 'selectedPosition', 'showSuggestionsWhenValueIsSet', 'theme']);

        var className = (0, _classnames5.default)(theme.autocomplete, _defineProperty({}, theme.focus, this.state.focus), this.props.className);

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'autocomplete', className: className },
          this.props.selectedPosition === 'above' ? this.renderSelected() : null,
          _react2.default.createElement(Input, _extends({}, other, {
            ref: 'input',
            className: theme.input,
            error: error,
            label: label,
            onBlur: this.handleQueryBlur,
            onChange: this.handleQueryChange,
            onFocus: this.handleQueryFocus,
            onKeyDown: this.handleQueryKeyDown,
            onKeyUp: this.handleQueryKeyUp,
            value: this.state.query
          })),
          this.renderSuggestions(),
          this.props.selectedPosition === 'below' ? this.renderSelected() : null
        );
      }
    }]);

    return Autocomplete;
  }(_react.Component);

  Autocomplete.propTypes = {
    className: _react.PropTypes.string,
    direction: _react.PropTypes.oneOf(['auto', 'up', 'down']),
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string,
    label: _react.PropTypes.string,
    limit: _react.PropTypes.number,
    multiple: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    selectedPosition: _react.PropTypes.oneOf(['above', 'below']),
    showSuggestionsWhenValueIsSet: _react.PropTypes.bool,
    source: _react.PropTypes.any,
    suggestionMatch: _react.PropTypes.oneOf(['start', 'anywhere', 'word']),
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      autocomplete: _react.PropTypes.string,
      focus: _react.PropTypes.string,
      input: _react.PropTypes.string,
      label: _react.PropTypes.string,
      suggestion: _react.PropTypes.string,
      suggestions: _react.PropTypes.string,
      up: _react.PropTypes.string,
      value: _react.PropTypes.string,
      values: _react.PropTypes.string
    }),
    value: _react.PropTypes.any
  };
  Autocomplete.defaultProps = {
    className: '',
    direction: 'auto',
    selectedPosition: 'above',
    multiple: true,
    showSuggestionsWhenValueIsSet: false,
    source: {},
    suggestionMatch: 'start',
    limit: 1000
  };


  return Autocomplete;
};

var Autocomplete = factory(_Chip2.default, _Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.AUTOCOMPLETE)(Autocomplete);
exports.autocompleteFactory = factory;
exports.Autocomplete = Autocomplete;