import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FiX, FiTrash2 } from 'react-icons/fi';
import Categories from '../Categories/Categories';
import ExpandingInput from '../ExpandingInput';
import Dropdown from '../Dropdown';
import SaveButton from '../styles/SaveButton';
import Checkbox from '../styles/Checkbox';

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
    font-size: 28px;
    color: ${props => props.theme.colors.monotoneAccent};
    cursor: pointer;
    padding: 4px;
    background: ${props => props.theme.colors.mainBackground};
  }

  h1 {
    margin: 0;
  }

  h2 {
    margin-bottom: 0.5rem;
    margin-top: 2rem;
  }

  p {
    font-style: italic;
    font-size: 0.9rem;
    line-height: 1rem;
    margin-top: 1.2rem;
    margin-bottom: 0.2rem;
  }

  h2 + p {
    margin-top: 0.3rem;
  }

  .event-calendar-input {
    width: 200px;
  }

  .delete-button {
    width: 18px;
    cursor: pointer;
  }

  form button {
    margin-left: 0.5rem;
  }

  .check-box {
    margin-top: 1rem;
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
    } else if (type === 'defaultCardTime') {
      const newDefaultCardTime = state.defaultCardTime;

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

  const handleDefaultListChange = e => {
    const { boardId } = match.params;
    const newDefaultList = e.target.value;

    dispatch({
      type: 'CHANGE_DEFAULT_LIST',
      payload: { boardId, newDefaultList }
    });
  };

  return (
    <SettingsStyles>
      <FiX className="close-button" onClick={closeMenu} />
      <h1>Settings</h1>
      <h2>Card Defaults</h2>
      <p>Choose a default category to be added to each new card</p>
      <Dropdown
        name="defaultCategory"
        value={defaultCategory}
        onChange={handleDefaultCategoryChange}
        items={categories}
      >
        {categories.map(category => (
          <option value={category._id} key={category._id}>
            {category.name}
          </option>
        ))}
      </Dropdown>
      <p>Choose a default time to be added to each new card</p>
      <form action="" onSubmit={e => handleSubmit(e, 'defaultCardTime')}>
        <ExpandingInput
          placeholder="Minutes"
          name="defaultCardTime"
          value={state.defaultCardTime}
          onChange={handleChange}
          type="number"
        />
        <SaveButton changed={defaultCardTime !== state.defaultCardTime} />
      </form>
      <Categories dispatch={dispatch} />
      <h2>Events</h2>
      <p>
        Change your event calendar (enter email address associate with your
        google calendar)
      </p>
      <form action="" onSubmit={e => handleSubmit(e, 'eventCalendarId')}>
        <ExpandingInput
          placeholder="Event Calendar"
          name="eventCalendarId"
          value={state.eventCalendarId}
          onChange={handleChange}
        />
        <SaveButton changed={eventCalendarId !== state.eventCalendarId} />
      </form>
      <p>Add a keyword by which to filter events</p>
      <form action="" onSubmit={e => handleSubmit(e, 'eventFilter')}>
        <ExpandingInput
          placeholder="Event Filter"
          name="eventFilter"
          value={state.eventFilter}
          onChange={handleChange}
        />
        <SaveButton changed={eventFilter !== state.eventFilter} />
      </form>
      <h2>Focus Mode</h2>
      <p>Choose a default list to focus on</p>
      <Dropdown
        name="defaultList"
        value={defaultList}
        onChange={handleDefaultListChange}
        items={categories}
      >
        {Object.keys(listsById).map(list => (
          <option value={listsById[list]._id} key={listsById[list]._id}>
            {listsById[list].title}
          </option>
        ))}
      </Dropdown>
      <Checkbox label="Activate focus mode when time starts" />

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
