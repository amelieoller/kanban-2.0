import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import BoardTitle from './BoardTitle';
import BoardSettings from './BoardSettings';
import LightDarkMode from './LightDarkMode';
import FocusMode from './FocusMode';

const BoardHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  color: ${props => props.theme.colors.white};
  z-index: 1;
  position: relative;

  .board-header-right {
    display: flex;
    flex-shrink: 0;
  }

  .vertical-line {
    width: 1px;
    height: 15px;
    margin: 0 10px;
    background: ${props => props.theme.colors.transparentWhite};
  }
`;

const BoardHeader = ({
  toggleTheme,
  focusMode,
  changeFocusMode,
  boardId,
  title,
  dispatch,
  listsById,
  color
}) => (
  <BoardHeaderStyles>
    <BoardTitle boardTitle={title} boardId={boardId} dispatch={dispatch} />
    <div className="board-header-right">
      <FocusMode focusMode={focusMode} changeFocusMode={changeFocusMode} />
      <BoardSettings listsById={listsById} dispatch={dispatch} />
      <LightDarkMode toggleTheme={toggleTheme} boardColor={color} />
    </div>
  </BoardHeaderStyles>
);

BoardHeader.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  focusMode: PropTypes.bool.isRequired,
  changeFocusMode: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  listsById: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { user, listsById } = state;
  const {
    params,
    params: { boardId }
  } = ownProps.match;
  const homePage =
    Object.keys(params).length === 0 && params.constructor === Object;
  const {
    boardsById: {
      [boardId]: {
        settings: { color },
        title
      }
    }
  } = state;

  return {
    user,
    homePage,
    title,
    listsById,
    boardId,
    color
  };
};

export default withRouter(connect(mapStateToProps)(BoardHeader));
