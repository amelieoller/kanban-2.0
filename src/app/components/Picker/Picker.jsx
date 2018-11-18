import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ClickOutside from "../ClickOutside/ClickOutside";
import "./Picker.scss";

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
    const { isPickerOpen, togglePicker, type, children, icon } = this.props;

    return (
      <div className="modal-color-picker-wrapper">
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
          {type}
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
      </div>
    );
  }
}

export default connect()(Picker);
