import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ClickOutside from './ClickOutside';

const PickerStyles = styled.div`
  position: relative;

  .modal-icon {
    flex-shrink: 0;
  }

  .picker-wrapper {
    z-index: 2;
    position: absolute;
    left: ${props => `${props.fromLeft}px`};
    left: 6px;
    padding: 0.3rem;
    display: grid;
    border-radius: ${props => props.theme.sizes.borderRadius};
    background: ${props => props.theme.colors.white};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .picker-button {
    width: ${props => props.isThinDisplay ? '50px' : '34px'};
    height: ${props => props.isThinDisplay ? '50px' : '34px'};
    margin: ${props => props.isThinDisplay ? '4px' : '2px'};
    border: 1px ${props => props.theme.colors.monotoneAccent} solid;
    border-radius: ${props => props.theme.sizes.borderRadius};
    color: ${props => props.theme.colors.backgroundAccent};
    cursor: pointer;
  }
`;

class Picker extends Component {
  static propTypes = {
    isPickerOpen: PropTypes.bool.isRequired,
    togglePicker: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isCalendarOpen: false
    };
  }

  handleKeyDown = e => {
    const { togglePicker, type } = this.props;

    if (e.keyCode === 27) {
      togglePicker(type);
      this.colorPickerButton.focus();
    }
  };

  handleClickOutside = () => {
    const { togglePicker, type } = this.props;
    togglePicker(type);
    this.colorPickerButton.focus();
  };

  render() {
    const {
      isPickerOpen,
      togglePicker,
      type,
      children,
      icon,
      text,
      className,
      boundingRect,
      isThinDisplay
    } = this.props;

    return (
      <PickerStyles boundingRect={boundingRect} isThinDisplay={isThinDisplay}>
        <button
          type="submit"
          className={className}
          onClick={() => togglePicker(type)}
          onKeyDown={this.handleKeyDown}
          ref={ref => {
            this.colorPickerButton = ref;
          }}
          aria-haspopup
          aria-expanded={isPickerOpen}
        >
          {icon}
          &nbsp;
          {text}
        </button>
        {isPickerOpen && (
          <ClickOutside
            eventTypes="click"
            handleClickOutside={this.handleClickOutside}
          >
            <div className="picker-wrapper" onKeyDown={this.handleKeyDown}>
              {children}
            </div>
          </ClickOutside>
        )}
      </PickerStyles>
    );
  }
}

export default connect()(Picker);
