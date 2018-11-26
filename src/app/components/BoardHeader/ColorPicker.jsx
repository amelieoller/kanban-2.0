import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import classnames from "classnames";
import { FiCheck, FiDroplet } from "react-icons/fi";
import "./ColorPicker.scss";

class ColorPicker extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    boardColor: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleSelection = color => {
    const { dispatch, boardId, boardColor } = this.props;
    // Dispatch update only if selected color is not the same as current board color.
    if (color !== boardColor) {
      dispatch({ type: "CHANGE_BOARD_COLOR", payload: { boardId, color } });
    }
  };

  render() {
    const { boardColor } = this.props;
    const colors = ["blue", "light", "dark"];
    return (
      <Wrapper
        className="color-picker-wrapper"
        onSelection={this.handleSelection}
      >
        <Button className="color-picker">
          <FiDroplet />
          <div className="board-header-right-text">&nbsp;&#9662;</div>
        </Button>
        <Menu className="color-picker-menu">
          {colors.map(color => (
            <MenuItem
              value={color}
              className={classnames("color-picker-item", color)}
              key={color}
            >
              {color === boardColor && <FiCheck />}
            </MenuItem>
          ))}
        </Menu>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;

  return {
    boardColor: state.boardsById[boardId].settings.color,
    boardId
  };
};

export default withRouter(connect(mapStateToProps)(ColorPicker));
