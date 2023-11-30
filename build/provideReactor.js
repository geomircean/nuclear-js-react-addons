'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = provideReactor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function createComponent(Component, additionalContextTypes) {
  var componentName = Component.displayName || Component.name;
  var childContextTypes = _objectAssign2['default']({
    reactor: _propTypes2['default'].object.isRequired
  }, additionalContextTypes || {});

  var ReactorProvider = (function (_React$Component) {
    _inherits(ReactorProvider, _React$Component);

    function ReactorProvider() {
      _classCallCheck(this, ReactorProvider);

      _React$Component.apply(this, arguments);
    }

    ReactorProvider.prototype.getChildContext = function getChildContext() {
      var childContext = {
        reactor: this.props.reactor
      };
      if (additionalContextTypes) {
        Object.keys(additionalContextTypes).forEach(function (key) {
          childContext[key] = this.props[key];
        }, this);
      }
      return childContext;
    };

    ReactorProvider.prototype.render = function render() {
      return _react2['default'].createElement(Component, this.props);
    };

    _createClass(ReactorProvider, null, [{
      key: 'displayName',
      value: 'ReactorProvider(' + componentName + ')',
      enumerable: true
    }, {
      key: 'propTypes',
      value: {
        reactor: _propTypes2['default'].object.isRequired
      },
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: childContextTypes,
      enumerable: true
    }]);

    return ReactorProvider;
  })(_react2['default'].Component);

  _hoistNonReactStatics2['default'](ReactorProvider, Component);

  return ReactorProvider;
}

/**
 * Provides reactor prop to all children as React context
 *
 * Example:
 *   var WrappedComponent = provideReactor(Component, {
 *     foo: React.PropTypes.string
 *   });
 *
 * Also supports the decorator pattern:
 *   @provideReactor({
 *     foo: React.PropTypes.string
 *   })
 *   class BaseComponent extends React.Component {
 *     render() {
 *       return <div/>;
 *     }
 *   }
 *
 * @method provideReactor
 * @param {React.Component} [Component] component to wrap
 * @param {object} additionalContextTypes Additional contextTypes to add
 * @returns {React.Component|Function} returns function if using decorator pattern
 */

function provideReactor(Component, additionalContextTypes) {
  console.warn('`provideReactor` is deprecated, use `<Provider reactor={reactor} />` instead'); // eslint-disable-line
  // support decorator pattern
  if (arguments.length === 0 || typeof arguments[0] !== 'function') {
    additionalContextTypes = arguments[0];
    return function connectToReactorDecorator(ComponentToDecorate) {
      return createComponent(ComponentToDecorate, additionalContextTypes);
    };
  }

  return createComponent.apply(null, arguments);
}

module.exports = exports['default'];