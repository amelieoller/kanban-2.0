import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClickOutside from "./ClickOutside/ClickOutside";

const PickerStyles = styled.div`
  position: relative;

  .options-list-button {
    display: flex;
    align-items: center;
    height: 33px;
    margin: 0 3px 4px 3px;
    padding: 0 6px;
    border: 0;
    border-radius: 3px;
    color: black;
    background: rgba(255, 255, 255, 0.8);
    font-size: inherit;
    cursor: pointer;
  }

  .options-list-button:hover,
  .options-list-button:focus {
    background: white;
  }

  .modal-icon {
    flex-shrink: 0;
  }

  .modal-color-picker {
    z-index: 2;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    width: 120px;
    margin-top: 4px;
    border-radius: 3px;
    color: black;
    background: white;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
    font-weight: 700;
    text-align: center;
  }

  .picker-button {
    background: ${props => props.theme.colors.monotoneAccent};
    border-radius: ${props => props.theme.sizes.borderRadius};
    padding: 5px 8px;
    margin: 5px;
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
      text
    } = this.props;

    return (
      <PickerStyles>
        <button
          type="submit"
          className="options-list-button"
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
            <div className="modal-color-picker" onKeyDown={this.handleKeyDown}>
              {children}
            </div>
          </ClickOutside>
        )}
      </PickerStyles>
    );
  }
}

export default connect()(Picker);
