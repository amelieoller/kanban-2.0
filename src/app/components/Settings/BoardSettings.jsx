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
  FiList,
  FiSettings
} from 'react-icons/fi';
import Categories from './Categories';
import Dropdown from '../Dropdown';
import Checkbox from '../Atoms/Checkbox';
import SlideOutMenu from './SlideOutMenu';
import IconButton from '../Atoms/IconButton';
import Input from './Input';

const StyledBoardSettings = styled.div`
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

  .delete-button {
    width: 18px;
    cursor: pointer;
  }

  form button {
    margin-left: 0.5rem;
  }

  .checkbox {
    margin-top: 1rem;
  }
`;

const BoardSettings = props => {
  const {
    eventCalendarId,
    eventFilter,
    match,
    dispatch,
    history,
    defaultList,
    lists,
    defaultCardTime,
    categories,
    defaultCategory,
    pomodoroFocusMode,
    title,
    settingsMenuOpen
  } = props;

  const initialState = {
    eventCalendarId: eventCalendarId || '',
    eventFilter: eventFilter || '',
    defaultList: defaultList || '',
    defaultCardTime: defaultCardTime || 0,
    pomodoroFocusMode: pomodoroFocusMode || false,
    defaultCategory: defaultCategory || ''
  };

  const [state, setState] = useState(initialState);
  const [settingsPending, setSettingsPending] = useState(false);

  const handleSave = () => {
    if (settingsPending) {
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

      setSettingsPending(false);
    }
  };

  const toggleSettingsMenu = bool => {
    if (bool === false) handleSave();

    dispatch({
      type: 'TOGGLE_SETTINGS_MENU',
      payload: { settingsMenuOpen: bool }
    });
  };

  const handleChange = (name, value) => {
    if (state[name] !== value) {
      // If state has changed set new state
      const newState = { ...state, [name]: value };
      setState(newState);

      if (
        JSON.stringify(newState) !== JSON.stringify(initialState) &&
        !settingsPending
      ) {
        // If state has changed for the first time
        setSettingsPending(true);
      } else if (
        JSON.stringify(newState) === JSON.stringify(initialState) &&
        settingsPending
      ) {
        // If state goes back to what it was before
        setSettingsPending(false);
      }
    }
  };

  const handleDeleteBoard = () => {
    const { boardId } = match.params;
    dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
    dispatch({
      type: 'TOGGLE_SETTINGS_MENU',
      payload: { settingsMenuOpen: false }
    });
    history.push('/');
  };

  return (
    <>
      <SlideOutMenu
        isOpen={settingsMenuOpen}
        closeCallback={() => toggleSettingsMenu(false)}
        right
        width={350}
      >
        <StyledBoardSettings>
          <FiX
            className="close-button"
            onClick={() => {
              toggleSettingsMenu(false);
              handleSave();
            }}
          />
          <h1>Settings</h1>
          <h2>
            <FiHeart />
            Card Presets
          </h2>
          <p>Default category to be added to each new card:</p>
          <Dropdown
            name="defaultCategory"
            value={state.defaultCategory}
            onChange={e => handleChange(e.target.name, e.target.value)}
            items={categories}
          >
            {categories.map(category => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </Dropdown>
          <p>Default time to be added to each new card:</p>

          <Input
            type="number"
            name="defaultCardTime"
            placeholder="Minutes"
            value={state.defaultCardTime === 0 ? '' : state.defaultCardTime}
            onChange={e => {
              const newMinutes = e.target.value === '' ? 0 : e.target.value;
              handleChange(e.target.name, parseInt(newMinutes, 10));
            }}
          />

          <h2>
            <FiList />
            Categories
          </h2>
          <Categories
            dispatch={dispatch}
            settingsPending={settingsPending}
            handleChange={handleChange}
          />
          <h2>
            <FiCalendar />
            Events
          </h2>
          <p>
            Events calendar (email address associated with your google
            calendar):
          </p>

          <Input
            name="eventCalendarId"
            placeholder="Event Calendar ID"
            value={state.eventCalendarId}
            onChange={e => handleChange(e.target.name, e.target.value)}
          />

          <p>Keyword by which to filter events:</p>

          <Input
            name="eventFilter"
            placeholder="Event Title Filter"
            value={state.eventFilter}
            onChange={e => handleChange(e.target.name, e.target.value)}
          />

          <h2>
            <FiEye /> Focus Mode
          </h2>
          <p>Default list to focus on:</p>
          <Dropdown
            name="defaultList"
            value={state.defaultList}
            onChange={e => handleChange(e.target.name, e.target.value)}
          >
            <option value="none">{'None'.toUpperCase()}</option>
            {lists
              .filter(l => !l.special)
              .map(list => (
                <option value={list._id} key={list._id}>
                  {list.title.toUpperCase()}
                </option>
              ))}
          </Dropdown>
          <Checkbox
            label="Activate when time starts"
            onChange={() =>
              handleChange('pomodoroFocusMode', !state.pomodoroFocusMode)
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
                if (
                  window.confirm(
                    `Are you sure you want to delete the board "${title}"?`
                  )
                )
                  handleDeleteBoard();
              }}
            />
          </p>
        </StyledBoardSettings>
      </SlideOutMenu>
      <IconButton
        onClick={() => toggleSettingsMenu(true)}
        color="background"
        className="no-focus-mode"
      >
        <FiSettings />
      </IconButton>
    </>
  );
};

BoardSettings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ boardId: PropTypes.string })
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  eventCalendarId: PropTypes.string,
  eventFilter: PropTypes.string,
  defaultList: PropTypes.string,
  defaultCardTime: PropTypes.number,
  lists: PropTypes.array,
  categories: PropTypes.array,
  defaultCategory: PropTypes.string,
  pomodoroFocusMode: PropTypes.bool,
  title: PropTypes.string,
  settingsMenuOpen: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const board = state.boardsById[boardId];
  const {
    title,
    settings: {
      eventCalendarId,
      eventFilter,
      defaultList,
      defaultCardTime,
      categories,
      defaultCategory,
      pomodoroFocusMode
    }
  } = board;
  const lists = board.lists.map(listId => state.listsById[listId]);
  const { settingsPending, settingsMenuOpen } = state.appState;

  return {
    eventCalendarId,
    eventFilter,
    defaultList,
    defaultCardTime,
    categories,
    defaultCategory,
    pomodoroFocusMode,
    lists,
    settingsPending,
    title,
    settingsMenuOpen
  };
};

export default withRouter(connect(mapStateToProps)(BoardSettings));
