import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import objectAssign from 'object-assign';

function createComponent(Component, additionalContextTypes) {
  const componentName = Component.displayName || Component.name;
  const childContextTypes = objectAssign({
    reactor: PropTypes.object.isRequired,
  }, additionalContextTypes || {});

  class ReactorProvider extends React.Component {
    static displayName = 'ReactorProvider(' + componentName + ')';

    static propTypes = {
      reactor: PropTypes.object.isRequired,
    };

    static childContextTypes = childContextTypes;

    getChildContext() {
      const childContext = {
        reactor: this.props.reactor,
      };
      if (additionalContextTypes) {
        Object.keys(additionalContextTypes).forEach(function (key) {
          childContext[key] = this.props[key];
        }, this);
      }
      return childContext;
    }

    render() {
      return React.createElement(Component, this.props);
    }
  }

  hoistNonReactStatics(ReactorProvider, Component);

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
export default function provideReactor(Component, additionalContextTypes) {
  console.warn('`provideReactor` is deprecated, use `<Provider reactor={reactor} />` instead');  // eslint-disable-line
  // support decorator pattern
  if (arguments.length === 0 || typeof arguments[0] !== 'function') {
    additionalContextTypes = arguments[0];
    return function connectToReactorDecorator(ComponentToDecorate) {
      return createComponent(ComponentToDecorate, additionalContextTypes);
    };
  }

  return createComponent.apply(null, arguments);
}
