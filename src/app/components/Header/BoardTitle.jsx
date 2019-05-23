import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExpandingInput from '../ExpandingInput';

const BoardTitleInput = styled.input`
  width: 100%;
  padding: 6px 0px;
  border: 0;
  color: inherit;
  background: inherit;
  font-size: 18px;
  font-weight: 400;
`;

const BoardTitleButton = styled.button`
  display: flex;
  min-width: 0;
  padding: 6px 10px 6px 10px;
  border: 0;
  border-radius: 3px;
  background: transparent;
  transition: background 0.1s;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.18);
  }

  @media ${props => props.theme.media.tablet} {
    display: none;
  }

  .board-title-text {
    margin: 0;
    color: ${props => props.theme.colors.headerText};
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    white-space: nowrap;
    font-weight: 400;
    line-height: normal;
  }
`;

const BoardTitle = ({ boardTitle, dispatch, boardId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(boardTitle);

  const submitTitle = () => {
    if (newTitle === '') return;
    if (boardTitle !== newTitle) {
      dispatch({
        type: 'CHANGE_BOARD_TITLE',
        payload: {
          boardTitle: newTitle,
          boardId
        }
      });
    }
    setIsOpen(false);
  };

  const revertTitle = () => {
    setIsOpen(false);
    setNewTitle(boardTitle);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      submitTitle();
    } else if (e.keyCode === 27) {
      revertTitle();
    }
  };

  return isOpen ? (
    <ExpandingInput
      placeholder="Board Title"
      name="name"
      value={newTitle}
      onChange={e => setNewTitle(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={revertTitle}
      max="300"
      className="no-focus-mode board-title-input"
      fontSize={18}
    />
  ) : (
    <BoardTitleButton
      type="submit"
      onClick={() => setIsOpen(true)}
      className="no-focus-mode"
    >
      <h1 className="board-title-text">{boardTitle}</h1>
    </BoardTitleButton>
  );
};

BoardTitle.propTypes = {
  boardTitle: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default BoardTitle;
