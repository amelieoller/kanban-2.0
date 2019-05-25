import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';
import IconButton from '../Atoms/IconButton';

const ListHeaderStyles = styled.div`
  .shared-styles {
    font-size: 1rem;
    font-weight: 400;
    border: none;
    text-transform: uppercase;

    @media ${props => props.theme.media.tablet} {
      font-size: 1.2rem;
    }
  }

  .list-title-button {
    flex-grow: 1;
    min-width: 50%;
    padding: 12px 0 11px 0;
    border-top-left-radius: inherit;
    color: ${props => props.theme.colors.text};
    overflow-wrap: break-word;
    cursor: pointer !important;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    button {
      position: absolute;
      right: 0;
      margin-right: 5px;
    }

    &:focus {
      color: ${props => props.theme.colors.textDisabled};
    }
  }

  .list-title-textarea-wrapper {
    width: 100%;
  }

  .list-title-textarea {
    float: left;
    box-sizing: border-box;
    width: 100%;
    color: ${props => props.theme.colors.grey};
    text-transform: uppercase;
    overflow: hidden;
    resize: none;
    text-align: center;
    background: transparent;
    padding: 10px 0 11px 0;
  }
`;

const ListTitle = ({
  listTitle,
  dragHandleProps,
  listId,
  dispatch,
  cards,
  boardId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(listTitle);

  const handleChange = e => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (newTitle === '') return;
    if (newTitle !== listTitle) {
      dispatch({
        type: 'CHANGE_LIST_TITLE',
        payload: { listTitle: newTitle, listId }
      });
    }
    setIsOpen(false);
  };

  const revertTitle = () => {
    setNewTitle(listTitle);
    setIsOpen(false);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    } else if (e.keyCode === 27) {
      revertTitle();
    }
  };

  const deleteList = () => {
    dispatch({
      type: 'DELETE_LIST',
      payload: { cards, listId, boardId }
    });
  };

  const openTitleEditor = () => {
    setIsOpen(true);
  };

  const handleButtonKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      openTitleEditor();
    }
  };

  return (
    <ListHeaderStyles>
      {isOpen ? (
        <div className="list-title-textarea-wrapper">
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            value={newTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="shared-styles list-title-textarea"
            onBlur={handleSubmit}
            spellCheck={false}
          />
        </div>
      ) : (
        <div
          {...dragHandleProps}
          role="button"
          tabIndex={0}
          onClick={openTitleEditor}
          onKeyDown={event => {
            handleButtonKeyDown(event);
            dragHandleProps.onKeyDown(event);
          }}
          className="shared-styles list-title-button"
        >
          {listTitle}
          <IconButton
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete the list "${listTitle.toUpperCase()}"?`
                )
              )
                deleteList();
            }}
            color="textDisabled"
          >
            <FiTrash2 />
          </IconButton>
        </div>
      )}
    </ListHeaderStyles>
  );
};

ListTitle.propTypes = {
  listTitle: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  dragHandleProps: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ListTitle);
