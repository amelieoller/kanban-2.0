import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import styled from "styled-components";

const LightDarkModeStyles = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 10px 8px 10px;
  border-radius: 3px;
  color: $white;
  transition: background 0.1s;
  cursor: pointer;
`;

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
      <LightDarkModeStyles>
        {boardColor === "light" ? (
          <FiMoon onClick={this.changeBoardColor} />
        ) : (
          <FiSun onClick={this.changeBoardColor} />
        )}
      </LightDarkModeStyles>
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
