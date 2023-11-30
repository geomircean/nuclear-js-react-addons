'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

exports['default'] = _propTypes.PropTypes.shape({
  dispatch: _propTypes.PropTypes.func.isRequired,
  evaluate: _propTypes.PropTypes.func.isRequired,
  evaluateToJS: _propTypes.PropTypes.func.isRequired,
  observe: _propTypes.PropTypes.func.isRequired
});
module.exports = exports['default'];