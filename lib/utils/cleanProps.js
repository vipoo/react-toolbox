"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanProps;
var keys = {
  limit: true,
  composeTheme: true,
  showSuggestionsWhenValueIsSet: true,
  source: true,
  selectedPosition: true,
  suggestionMatch: true
};

function cleanProps(props) {

  var newProps = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      if (!keys[k]) {
        newProps[k] = props[k];
      }
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

  return newProps;
}