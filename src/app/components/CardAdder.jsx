import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import shortid from 'shortid';
import styled from 'styled-components';
import ClickOutside from './ClickOutside';

const CardAdderStyles = styled.div`
  .card-adder-textarea-wrapper {
    margin-top: 6px;
  }

  .card-adder-textarea {
    float: right;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 8px;
    border: 0;
    border-radius: 3px;
    color: inherit;
    font-family: inherit;
    font-size: 15px;
    resize: none;
  }

  .add-card-button {
    align-self: center;
    flex-shrink: 0;
    width: 100%;
    height: 39px;
    margin-top: 6px;
    border: none;
    border-radius: ${props => props.theme.sizes.borderRadius};
    color: ${props => props.theme.colors.backgroundAccent};
    background: transparent;
    font-size: 28px;
    transition: background 0.1s;
    cursor: pointer;
  }

  .add-card-button:hover,
  .add-card-button:focus {
    color: ${props => props.theme.colors.cardButtonHover};
  }
`;

const CardAdder = ({
  listId,
  dispatch,
  defaultCategory,
  defaultCardTime,
  toggleIsKeyboardOpen
}) => {
  const [newText, setNewText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleCardComposer = () => {
    toggleIsKeyboardOpen(!isOpen);
    setIsOpen(!isOpen);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (newText === '') return;

    const cardId = shortid.generate();
    const createdAt = Date.now();
    const categoryId = defaultCategory;
    const minutes = defaultCardTime;

    dispatch({
      type: 'ADD_CARD',
      payload: {
        cardText: newText,
        cardId,
        listId,
        createdAt,
        categoryId,
        minutes
      }
    });
    setNewText('');

    console.log("If you're getting an error here it has to do with LastPass.");
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSubmit(e);
    } else if (e.keyCode === 27) {
      toggleCardComposer();
    }
  };

  return (
    <CardAdderStyles>
      {isOpen ? (
        <ClickOutside toggleOpen={toggleCardComposer}>
          <form onSubmit={handleSubmit} className="card-adder-textarea-wrapper">
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              minRows={1}
              onChange={e => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
              value={newText}
              className="card-adder-textarea"
              placeholder="Add a new list item..."
              spellCheck={false}
              onBlur={toggleCardComposer}
            />
          </form>
        </ClickOutside>
      ) : (
        <button
          type="submit"
          onClick={toggleCardComposer}
          className="add-card-button"
        >
          +
        </button>
      )}
    </CardAdderStyles>
  );
};

CardAdder.propTypes = {
  listId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  defaultCategory: PropTypes.string,
  defaultCardTime: PropTypes.number
};

export default connect()(CardAdder);
