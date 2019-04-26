import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import HeaderButtonStyles from "../styles/HeaderButtonStyles";

class LightDarkMode extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    boardColor: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { boardColor, setBoardColor } = this.props;
    setBoardColor(boardColor);
  }

  changeBoardColor = () => {
    const { dispatch, boardId, boardColor, changeTheme } = this.props;
    changeTheme();

    dispatch({
      type: "CHANGE_BOARD_COLOR",
      payload: { boardId, color: boardColor === "light" ? "dark" : "light" }
    });
  };

  render() {
    const { boardColor } = this.props;
    return (
      <HeaderButtonStyles onClick={this.changeBoardColor} className="no-focus-mode">
        {boardColor === "light" ? <FiMoon /> : <FiSun />}
      </HeaderButtonStyles>
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

export default withRouter(connect(mapStateToProps)(LightDarkMode));
