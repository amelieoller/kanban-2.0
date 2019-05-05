import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FiX, FiTrash2 } from 'react-icons/fi';
import Categories from '../Categories/Categories';
import ButtonStyles from '../styles/ButtonStyles';
import ExpandingInput from '../ExpandingInput';

const SettingsStyles = styled.div`
  background-color: ${props => props.theme.colors.mainBackground};
  color: ${props => props.theme.colors.text};
  width: 100%;
  min-height: 100%;
  padding: 20px;

  .close-button {
    position: absolute;
    right: 0;
    top: 0;
    margin: 20px;
    font-size: 25px;
    color: ${props => props.theme.colors.monotoneAccent};
    cursor: pointer;
  }

  h1 {
    margin: 0;
  }

  .event-calendar-input {
    width: 200px;
  }

  .delete-button {
    width: 18px;
    cursor: pointer;
  }
`;

const Settings = ({
  eventCalendarId,
  eventFilter,
  match,
  dispatch,
  closeMenu,
  history,
  defaultList,
  listsById,
  defaultCardTime,
  categories,
  defaultCategory
}) => {
  const [state, setState] = useState({
    eventCalendarId: eventCalendarId || '',
    eventFilter: eventFilter || '',
    defaultList: defaultList || '',
    defaultCardTime: defaultCardTime || ''
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const { boardId } = match.params;

    if (type === 'eventCalendarId') {
      const newEventCalendarId = state.eventCalendarId;

      dispatch({
        type: 'CHANGE_EVENT_CALENDAR_ID',
        payload: { boardId, newEventCalendarId }
      });
    } else if (type === 'eventFilter') {
      const newEventFilter = state.eventFilter;

      dispatch({
        type: 'CHANGE_EVENT_CALENDAR_FILTER',
        payload: { boardId, newEventFilter }
      });
    } else if (type === 'defaultList') {
      const newDefaultList = e.target.value;

      dispatch({
        type: 'CHANGE_DEFAULT_LIST',
        payload: { boardId, newDefaultList }
      });
    } else if (type === 'defaultCardTime') {
      const newDefaultCardTime = parseInt(state.defaultCardTime, 10);

      dispatch({
        type: 'CHANGE_DEFAULT_CARD_TIME',
        payload: { boardId, newDefaultCardTime }
      });
    }
  };

  const handleDeleteBoard = () => {
    const { boardId } = match.params;
    dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
    history.push('/');
  };

  const handleDefaultCategoryChange = e => {
    const { boardId } = match.params;
    const categoryId = e.target.value;

    dispatch({
      type: 'CHANGE_DEFAULT_CATEGORY',
      payload: {
        boardId,
        categoryId
      }
    });
  };

  return (
    <SettingsStyles>
      <FiX className="close-button" onClick={closeMenu} />
      <h1>Settings</h1>
      <h2>Card Defaults</h2>
      Cateogory:
      <select
        name="defaultCategory"
        onChange={e => handleDefaultCategoryChange(e)}
        value={defaultCategory}
      >
        {categories.map(category => (
          <option value={category._id} key={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <form action="" onSubmit={e => handleSubmit(e, 'defaultCardTime')}>
        <ExpandingInput
          placeholder="Minutes"
          name="defaultCardTime"
          value={state.defaultCardTime}
          onChange={handleChange}
          type="number"
        />
        <ButtonStyles>Change Default Card Time</ButtonStyles>
      </form>
      <Categories dispatch={dispatch} />
      <hr />
      <h2>Events</h2>
      <p>
        Change your event calendar here (your email address associate with a
        google calendar)
      </p>
      <form action="" onSubmit={e => handleSubmit(e, 'eventCalendarId')}>
        <ExpandingInput
          placeholder="Event Calendar"
          name="eventCalendarId"
          value={state.eventCalendarId}
          onChange={handleChange}
        />
        <ButtonStyles>Change Calendar</ButtonStyles>
      </form>
      <p>Add a keyword By which to filter events</p>
      <form action="" onSubmit={e => handleSubmit(e, 'eventFilter')}>
        <ExpandingInput
          placeholder="Event Filter"
          name="eventFilter"
          value={state.eventFilter}
          onChange={handleChange}
        />
        <ButtonStyles>Change Filter</ButtonStyles>
      </form>
      <h2>Focus Mode</h2>
      <p>Choose a default list</p>
      <form>
        {Object.keys(listsById).map(list => (
          <label key={listsById[list]._id}>
            <input
              type="radio"
              name="defaultList"
              id={listsById[list]._id}
              onChange={e => handleSubmit(e, 'defaultList')}
              checked={defaultList === listsById[list]._id}
              value={listsById[list]._id}
            />
            {listsById[list].title}
          </label>
        ))}
        <label key="none">
          <input
            type="radio"
            value="none"
            checked={defaultList === 'none'}
            onChange={e => handleSubmit(e, 'defaultList')}
          />
          none
        </label>
      </form>
      <input type="checkbox" name="pomodoro-focus" id="pomodoro-focus" />
      <label htmlFor="pomodoro-focus">
        Turn on focus mode when Pomodoro starts
      </label>
      <hr />
      <h2>Danger Zone</h2>
      <p>
        Delete this board{' '}
        <FiTrash2
          role="button"
          tabIndex={0}
          className="delete-button"
          onClick={() => {
            if (window.confirm('Are you sure?')) handleDeleteBoard();
          }}
          onKeyDown={() => {
            if (window.confirm('Are you sure?')) handleDeleteBoard();
          }}
        />
      </p>
    </SettingsStyles>
  );
};

Settings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ boardId: PropTypes.string })
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  eventCalendarId: PropTypes.string,
  eventFilter: PropTypes.string,
  closeMenu: PropTypes.func,
  defaultList: PropTypes.string,
  defaultCardTime: PropTypes.string,
  listsById: PropTypes.object,
  categories: PropTypes.array,
  defaultCategory: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const {
    boardsById: {
      [boardId]: {
        settings: {
          eventCalendarId,
          eventFilter,
          defaultList,
          defaultCardTime,
          categories,
          defaultCategory
        }
      }
    }
  } = state;

  return {
    eventCalendarId,
    eventFilter,
    defaultList,
    defaultCardTime,
    categories,
    defaultCategory
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
