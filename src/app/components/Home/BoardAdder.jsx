import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import slugify from 'slugify';
import shortid from 'shortid';
import ClickOutside from '../ClickOutside';

const BoardAdder = ({ dispatch, history, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    // Dispatch action to put new empty board in redux store and db + push new url to history
    e.preventDefault();

    if (title === '') {
      return;
    }
    const boardId = shortid.generate();
    const completedListId = shortid.generate();
    const habitsListId = shortid.generate();
    const categoryId = shortid.generate();

    dispatch({
      type: 'ADD_BOARD',
      payload: {
        boardTitle: title,
        boardId,
        userId,
        completedListId,
        habitsListId,
        categoryId
      }
    });
    dispatch({
      type: 'ADD_LIST',
      payload: {
        listTitle: 'Habits',
        listId: habitsListId,
        boardId,
        special: 'habits'
      }
    });

    dispatch({
      type: 'ADD_LIST',
      payload: {
        listTitle: 'Completed',
        listId: completedListId,
        boardId,
        special: 'completed'
      }
    });

    const urlSlug = slugify(title, { lower: true });
    history.push(`/b/${boardId}/${urlSlug}`);

    setIsOpen(false);
    setTitle('');
  };

  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <ClickOutside toggleOpen={toggleOpen}>
      <form onSubmit={handleSubmit} className="board-adder">
        <input
          autoFocus
          className="submit-board-input"
          type="text"
          value={title}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          spellCheck={false}
        />
        <input
          type="submit"
          value="Create"
          className="submit-board-button"
          disabled={title === ''}
        />
      </form>
    </ClickOutside>
  ) : (
    <button type="submit" onClick={toggleOpen} className="add-board-button">
      Add a new board...
    </button>
  );
};

BoardAdder.propTypes = {
  userId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.user ? state.user._id : 'guest'
});

export default connect(mapStateToProps)(BoardAdder);
