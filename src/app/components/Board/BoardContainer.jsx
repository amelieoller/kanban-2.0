import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';

// This components only purpose is to redirect requests for board pages that don't exist
// or which the user is not authorized to visit, in order to prevent errors
const BoardContainer = ({
  board,
  changeTheme,
  setBoardColor,
  focusMode,
  changeFocusMode
}) =>
  board ? (
    <Board
      board={board}
      changeTheme={changeTheme}
      setBoardColor={setBoardColor}
      focusMode={focusMode}
      changeFocusMode={changeFocusMode}
    />
  ) : (
    <Redirect to="/" />
  );

BoardContainer.propTypes = {
  board: PropTypes.object,
  changeTheme: PropTypes.func.isRequired,
  setBoardColor: PropTypes.func.isRequired,
  focusMode: PropTypes.bool.isRequired,
  changeFocusMode: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const board = state.boardsById[boardId];
  return { board };
};

export default connect(mapStateToProps)(BoardContainer);
