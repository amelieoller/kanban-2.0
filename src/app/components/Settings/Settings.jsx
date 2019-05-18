import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  FiX,
  FiTrash2,
  FiEye,
  FiCalendar,
  FiAlertCircle,
  FiHeart,
  FiList
} from 'react-icons/fi';
import Categories from '../Categories/Categories';
import Dropdown from '../Dropdown';
import SaveButton from '../styles/SaveButton';
import Checkbox from '../styles/Checkbox';

const SettingsStyles = styled.div`
  background-color: ${props => props.theme.colors.background};
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
    background: ${props => props.theme.colors.background};
  }

  h1,
  h2,
  h3 {
    font-weight: 400;
  }

  h1 {
    margin: 0;
  }

  h2 {
    margin-bottom: 0.5rem;
    margin-top: 2.3rem;
    display: flex;

    svg {
      margin-right: 0.5rem;
    }
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
  lists,
  defaultCardTime,
  categories,
  defaultCategory,
  pomodoroFocusMode,
  toggleChangesPending,
  changesPending
}) => {
  const [state, setState] = useState({
    eventCalendarId: eventCalendarId || '',
    eventFilter: eventFilter || '',
    defaultList: defaultList || '',
    defaultCardTime: defaultCardTime || 0,
    pomodoroFocusMode: pomodoroFocusMode || false,
    defaultCategory: defaultCategory || ''
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDeleteBoard = () => {
    const { boardId } = match.params;
    dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
    history.push('/');
  };

  const handleSave = () => {
    const { boardId } = match.params;

    const changeObject = {
      eventCalendarId: state.eventCalendarId,
      eventFilter: state.eventFilter,
      defaultList: state.defaultList,
      defaultCardTime: state.defaultCardTime,
      pomodoroFocusMode: state.pomodoroFocusMode,
      defaultCategory: state.defaultCategory
    };

    dispatch({
      type: 'CHANGE_SETTINGS',
      payload: { boardId, changeObject }
    });

    toggleChangesPending(false);
  };

  const changedObject = {
    eventCalendarId,
    eventFilter,
    defaultList,
    defaultCardTime,
    pomodoroFocusMode,
    defaultCategory
  };
  
  const changesBoolean =
    JSON.stringify(state) !== JSON.stringify(changedObject);

  if (changesBoolean) {
    toggleChangesPending(changesBoolean);
  }

  return (
    <SettingsStyles>
      <FiX className="close-button" onClick={closeMenu} />
      <h1>
        Settings{' '}
        <SaveButton
          changed={changesPending}
          onClick={() => changesPending && handleSave()}
        />
      </h1>
      <h2>
        <FiHeart />
        Card Presets
      </h2>
      <p>Default category to be added to each new card:</p>
      <Dropdown
        name="defaultCategory"
        value={state.defaultCategory}
        onChange={handleChange}
        items={categories}
      >
        {categories.map(category => (
          <option value={category._id} key={category._id}>
            {category.name}
          </option>
        ))}
      </Dropdown>
      <p>Default time to be added to each new card:</p>
      <input
        className="styled-input"
        placeholder="Minutes"
        name="defaultCardTime"
        value={state.defaultCardTime}
        onChange={e =>
          setState({ ...state, [e.target.name]: parseInt(e.target.value, 10) })
        }
        type="number"
      />

      <h2>
        <FiList />
        Categories
      </h2>
      <Categories dispatch={dispatch} />
      <h2>
        <FiCalendar />
        Events
      </h2>
      <p>
        Events calendar (email address associated with your google calendar):
      </p>
      <input
        className="styled-input"
        placeholder="Event Calendar"
        name="eventCalendarId"
        value={state.eventCalendarId}
        onChange={handleChange}
      />
      <p>Keyword by which to filter events:</p>
      <input
        className="styled-input"
        placeholder="Event Filter"
        name="eventFilter"
        value={state.eventFilter}
        onChange={handleChange}
      />

      <h2>
        <FiEye /> Focus Mode
      </h2>
      <p>Default list to focus on:</p>
      <Dropdown
        name="defaultList"
        value={state.defaultList}
        onChange={handleChange}
      >
        {lists
          .filter(l => !l.special)
          .map(list => (
            <option value={list._id} key={list._id}>
              {list.title}
            </option>
          ))}
      </Dropdown>
      <Checkbox
        label="Activate when time starts"
        onChange={() =>
          setState({ ...state, pomodoroFocusMode: !state.pomodoroFocusMode })
        }
        checked={state.pomodoroFocusMode}
        name="pomodoroFocusMode"
      />
      <h2>
        <FiAlertCircle />
        Danger Zone
      </h2>
      <p>
        Delete this board:{' '}
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
  defaultCardTime: PropTypes.number,
  lists: PropTypes.array,
  categories: PropTypes.array,
  defaultCategory: PropTypes.string,
  pomodoroFocusMode: PropTypes.bool,
  toggleChangesPending: PropTypes.func,
  changesPending: PropTypes.bool
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
          defaultCategory,
          pomodoroFocusMode
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
    defaultCategory,
    pomodoroFocusMode
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
