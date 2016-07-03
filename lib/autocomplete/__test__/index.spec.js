'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _theme = require('../theme.scss');

var _theme2 = _interopRequireDefault(_theme);

var _Autocomplete = require('../Autocomplete');

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stubSource = [[0, 'zero'], [1, 'one']];

describe('Autocomplete', function () {
  describe('#render', function () {
    it('does not raise any react warnings', function () {

      var comp = _react2.default.createElement(_Autocomplete2.default, {
        limit: 100,
        showSuggestionsWhenValueIsSet: false,
        theme: _theme2.default,
        label: 'Label',
        filter: _Autocomplete2.default.caseInsensitiveFilter,
        source: stubSource,
        multiple: false,
        value: null,
        hint: 'hint text'
      });

      var mounting = _reactAddonsTestUtils2.default.renderIntoDocument(comp);
      var html = _reactDom2.default.findDOMNode(mounting).innerHTML;

      (0, _expect2.default)(html).toContain('hint text');
      (0, _expect2.default)(html).toContain('label');
    });
  });
});