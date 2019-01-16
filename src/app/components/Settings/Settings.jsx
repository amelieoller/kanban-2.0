import PropTypes from "prop-types";
import styled from "styled-components";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FiX, FiTrash2 } from "react-icons/fi";
import Categories from "../Categories/Categories";
import ToolTip from "../ToolTip/ToolTip";
import ButtonStyles from "../styles/ButtonStyles";

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
    eventCalendarId: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      eventCalendarId: this.props.eventCalendarId || ""
    };
  }

  handleChange = e => {
    this.setState({
      eventCalendarId: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { match, dispatch } = this.props;
    const { eventCalendarId } = this.state;
    const { boardId } = match.params;

    dispatch({
      type: "CHANGE_EVENT_CALENDAR_ID",
      payload: { boardId, eventCalendarId }
    });
  };

  handleDeleteBoard = () => {
    const { dispatch, match, history } = this.props;
    const { boardId } = match.params;
    dispatch({ type: "DELETE_BOARD", payload: { boardId } });
    history.push("/");
  };

  render = () => {
    const { dispatch, closeMenu } = this.props;
    const { eventCalendarId } = this.state;

    return (
      <SettingsStyles>
        <FiX className="close-button" onClick={closeMenu} />
        <h1>Settings</h1>
        <Categories dispatch={dispatch} />
        <h2>Change Event Calendar:</h2>
        <p>This is your email address associate with a google calendar</p>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="event-calendar-input"
            value={eventCalendarId}
            onChange={this.handleChange}
          />
          <ButtonStyles>Change Calendar</ButtonStyles>
        </form>
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
    eventCalendarId: state.boardsById[boardId].settings.eventCalendarId
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
