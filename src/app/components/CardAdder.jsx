import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import shortid from 'shortid';
import styled from 'styled-components';
import ClickOutside from './ClickOutside';

const CardAdderStyles = styled.div`
  margin-top: 6px;
  min-height: 33px;

  .card-adder-textarea {
    float: right;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 8px;
    border: 0;
    border-radius: 3px;
    color: ${props => props.theme.colors.textSecondary};
    font-family: inherit;
    font-size: 15px;
    resize: none;
    background: ${props => props.theme.colors.elevatedFour};
  }

  .add-card-button {
    align-self: center;
    flex-shrink: 0;
    width: 100%;
    height: 39px;
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
  openCardAdder,
  toggleKeyboard,
  placeholder
}) => {
  const [newText, setNewText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (openCardAdder) setIsOpen(true);
    return () => {};
  }, [openCardAdder]);

  const toggleIsKeyboardOpen = bool => {
    dispatch({
      type: 'TOGGLE_KEYBOARD_OPEN',
      payload: { isKeyboardOpen: bool }
    });
  };

  const toggleCardComposer = () => {
    if (toggleKeyboard) toggleIsKeyboardOpen(!isOpen);
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
              placeholder={placeholder}
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
  defaultCardTime: PropTypes.number,
  openCardAdder: PropTypes.bool,
  toggleKeyboard: PropTypes.bool,
  placeholder: PropTypes.string
};

export default connect()(CardAdder);
