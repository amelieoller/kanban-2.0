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

  button {
    padding: 5px 10px;
    color: ${props => props.theme.colors.backgroundAccent};
    background: ${props => props.theme.colors.monotoneAccent};
    cursor: pointer;
    border-radius: ${props => props.theme.sizes.borderRadius};
  }
  .event-calendar-input {
    width: 200px;
  }

  .delete-button {
    width: 30px;
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
  listsById
}) => {
  const [state, setState] = useState({
    eventCalendarId: eventCalendarId || '',
    eventFilter: eventFilter || '',
    defaultList: defaultList || ''
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
    }
  };

  const handleDeleteBoard = () => {
    const { boardId } = match.params;
    dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
    history.push('/');
  };

  return (
    <SettingsStyles>
      <FiX className="close-button" onClick={closeMenu} />
      <h1>Settings</h1>
      <Categories dispatch={dispatch} />
      <hr />
      <h2>Events:</h2>
      <h2>Change Event Calendar</h2>
      <p>This is your email address associate with a google calendar</p>
      <form action="" onSubmit={e => handleSubmit(e, 'eventCalendarId')}>
        <ExpandingInput
          placeholder="Event Calendar"
          name="eventCalendarId"
          value={state.eventCalendarId}
          onChange={handleChange}
        />
        <ButtonStyles>Change Calendar</ButtonStyles>
      </form>

      <h3>Add a Keyword By Which to Filter Events:</h3>
      <form action="" onSubmit={e => handleSubmit(e, 'eventFilter')}>
        <ExpandingInput
          placeholder="Event Filter"
          name="eventFilter"
          value={state.eventFilter}
          onChange={handleChange}
        />
        <ButtonStyles>Change Filter</ButtonStyles>
      </form>

      <h3>Choose a Default List:</h3>
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

      {/* <h3>Choose a Default List:</h3>
      <form action="" onSubmit={e => handleSubmit(e, 'defaultList')}>
        <ExpandingInput
          placeholder="Choose Default List"
          name="defaultList"
          value={state.defaultList}
          onChange={handleChange}
        />
        <ButtonStyles>Change List</ButtonStyles>
      </form> */}

      <hr />
      <h2>Delete this board:</h2>
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
  listsById: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    eventCalendarId: state.boardsById[boardId].settings.eventCalendarId,
    eventFilter: state.boardsById[boardId].settings.eventFilter,
    defaultList: state.boardsById[boardId].settings.defaultList
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
