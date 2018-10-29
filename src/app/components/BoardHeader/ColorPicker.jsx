import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import classnames from "classnames";
import Done from "react-icons/lib/md/done";
import Label from "react-icons/lib/md/label";
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
    const colors = ["blue", "green", "red", "grey"];
    return (
      <Wrapper
        className="color-picker-wrapper"
        onSelection={this.handleSelection}
      >
        <Button className="color-picker">
          <Label />
          <div className="board-header-right-text">
            &nbsp;Color &nbsp;&#9662;
          </div>
        </Button>
        <Menu className="color-picker-menu">
          {colors.map(color => (
            <MenuItem
              value={color}
              className={classnames("color-picker-item", color)}
              key={color}
            >
              {color === boardColor && <Done />}
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
