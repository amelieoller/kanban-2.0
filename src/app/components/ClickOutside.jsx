import { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

// Wrap component in this component to handle click outisde of that component
class ClickOutsideWrapper extends Component {
  static propTypes = {
    toggleOpen: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  };

  handleClickOutside = () => this.props.toggleOpen();

  render = () => this.props.children;
}

export default onClickOutside(ClickOutsideWrapper);
