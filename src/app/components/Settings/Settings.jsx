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
  history
}) => {
  const [state, setState] = useState({
    eventCalendarId: eventCalendarId || '',
    eventFilter: eventFilter || ''
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { boardId } = match.params;

    if (e.target.name === 'eventCalendarId') {
      dispatch({
        type: 'CHANGE_EVENT_CALENDAR_ID',
        payload: { boardId, eventCalendarId }
      });
    } else {
      dispatch({
        type: 'CHANGE_EVENT_CALENDAR_FILTER',
        payload: { boardId, eventFilter }
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
      <form action="" onSubmit={handleSubmit}>
        <ExpandingInput
          placeholder="Event Calendar"
          name="eventCalendarId"
          value={eventCalendarId}
          onChange={handleChange}
        />
        <ButtonStyles>Change Calendar</ButtonStyles>
      </form>

      <h3>Add a Keyword By Which to Filter Events:</h3>
      <form action="" onSubmit={handleSubmit}>
        <ExpandingInput
          placeholder="Event Filter"
          name="eventFilter"
          value={eventFilter}
          onChange={handleChange}
        />
        <ButtonStyles>Change Filter</ButtonStyles>
      </form>

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
  closeMenu: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    eventCalendarId: state.boardsById[boardId].settings.eventCalendarId,
    eventFilter: state.boardsById[boardId].settings.eventFilter
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
