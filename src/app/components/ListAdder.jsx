import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import shortid from 'shortid';
import styled from 'styled-components';

const ListAdderButton = styled.div`
  margin: 10px 0;

  button {
    display: inline-flex;
    flex-shrink: 0;
    width: ${props => props.theme.sizes.listWidth};
    margin: 0 5px 0 5px;
    padding: 13.5px 10px;
    border: none;
    border-radius: ${props => props.theme.sizes.borderRadius};
    color: ${props => props.theme.colors.backgroundAccent};
    background: rgba(0, 0, 0, 0.15);
    font-size: 14px;
    transition: background 0.2s;
    user-select: none;
    cursor: pointer;

    &:hover,
    &:focus {
      background: rgba(0, 0, 0, 0.25);
    }
  }
`;

const ListAdderTextArea = styled.div`
  margin: 10px 5px;
  width: ${props => props.theme.sizes.listWidth};
  min-height: 0px;
  max-height: 100%;
  border-radius: ${props => props.theme.sizes.borderRadius};
  font-size: 14px;
  transition: box-shadow 0.15s, background 0.3s;

  .list-adder-textarea {
    float: left;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 0;
    border-radius: 3px;
    color: ${props => props.theme.colors.text};
    font-family: inherit;
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;
    resize: none;
    text-transform: uppercase;
    background: ${props => props.theme.colors.listBackground};
  }
`;

const ListAdder = ({ dispatch, boardId }) => {
  const [state, setState] = useState({
    isOpen: false,
    listTitle: ''
  });

  const handleBlur = () => {
    setState({ ...state, isOpen: false });
  };

  const handleChange = e => {
    setState({ ...state, listTitle: e.target.value });
  };

  const handleSubmit = () => {
    const { listTitle } = state;
    const listId = shortid.generate();
    if (listTitle === '') return;
    dispatch({
      type: 'ADD_LIST',
      payload: { listTitle, listId, boardId }
    });
    setState({ ...state, isOpen: false, listTitle: '' });
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    } else if (e.keyCode === 27) {
      setState({ ...state, isOpen: false, listTitle: '' });
    }
  };

  const { isOpen, listTitle } = state;

  if (!isOpen) {
    return (
      <ListAdderButton className="no-focus-mode">
        <button
          type="submit"
          onClick={() => setState({ ...state, isOpen: true })}
        >
          Add a new list...
        </button>
      </ListAdderButton>
    );
  }

  return (
    <ListAdderTextArea>
      <Textarea
        autoFocus
        useCacheForDOMMeasurements
        value={listTitle}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="list-adder-textarea"
        onBlur={handleBlur}
        spellCheck={false}
      />
    </ListAdderTextArea>
  );
};

ListAdder.propTypes = {
  boardId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ListAdder);
