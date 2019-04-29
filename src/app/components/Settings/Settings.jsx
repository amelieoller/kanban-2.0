import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FiX, FiTrash2 } from 'react-icons/fi';
import Categories from '../Categories/Categories';
import ToolTip from '../ToolTip/ToolTip';
import ButtonStyles from '../styles/ButtonStyles';
import ExpandingInput from '../ExpandingInput/ExpandingInput';

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
  }
`;

class Settings extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ boardId: PropTypes.string })
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    eventCalendarId: PropTypes.string,
    eventFilter: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      eventCalendarId: props.eventCalendarId || '',
      eventFilter: props.eventFilter || ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { match, dispatch } = this.props;
    const { eventCalendarId, eventFilter } = this.state;
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

  handleDeleteBoard = () => {
    const { dispatch, match, history } = this.props;
    const { boardId } = match.params;
    dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
    history.push('/');
  };

  render = () => {
    const { dispatch, closeMenu } = this.props;
    const { eventCalendarId, eventFilter } = this.state;

    return (
      <SettingsStyles>
        <FiX className="close-button" onClick={closeMenu} />
        <h1>Settings</h1>
        <Categories dispatch={dispatch} />
        <hr />
        <h2>Events:</h2>
        <h2>Change Event Calendar</h2>
        <p>This is your email address associate with a google calendar</p>
        <form action="" onSubmit={this.handleSubmit}>
          <ExpandingInput
            placeholder="Event Calendar"
            name="eventCalendarId"
            value={eventCalendarId}
            onChange={this.handleChange}
          />
          <ButtonStyles>Change Calendar</ButtonStyles>
        </form>

        <h3>Add a Keyword By Which to Filter Events:</h3>
        <form action="" onSubmit={this.handleSubmit}>
          <ExpandingInput
            placeholder="Event Filter"
            name="eventFilter"
            value={eventFilter}
            onChange={this.handleChange}
          />
          <ButtonStyles>Change Filter</ButtonStyles>
        </form>

        <hr />
        <h2>Delete this board:</h2>
        <ToolTip
          message="Are you sure?"
          button={<button onClick={this.handleDeleteBoard}>Delete</button>}
        >
          <ButtonStyles>
            <FiTrash2 />
          </ButtonStyles>
        </ToolTip>
      </SettingsStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    eventCalendarId: state.boardsById[boardId].settings.eventCalendarId,
    eventFilter: state.boardsById[boardId].settings.eventFilter
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
