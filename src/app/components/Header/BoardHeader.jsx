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
  boardId,
  title,
  dispatch,
  color,
  isInFocusMode,
  defaultList
}) => (
  <BoardHeaderStyles>
    <BoardTitle boardTitle={title} boardId={boardId} dispatch={dispatch} />
    <div className="board-header-right">
      <FocusMode
        isInFocusMode={isInFocusMode}
        defaultList={defaultList}
        dispatch={dispatch}
      />
      <BoardSettings />
      <LightDarkMode dispatch={dispatch} boardId={boardId} boardColor={color} />
    </div>
  </BoardHeaderStyles>
);

BoardHeader.propTypes = {
  boardId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  isInFocusMode: PropTypes.bool.isRequired,
  defaultList: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  const {
    params,
    params: { boardId }
  } = ownProps.match;
  const homePage =
    Object.keys(params).length === 0 && params.constructor === Object;
  const {
    boardsById: {
      [boardId]: {
        settings: { color, defaultList },
        title
      }
    }
  } = state;
  const { isInFocusMode } = state.appState;

  return {
    user,
    homePage,
    title,
    boardId,
    color,
    isInFocusMode,
    defaultList
  };
};

export default withRouter(connect(mapStateToProps)(BoardHeader));
