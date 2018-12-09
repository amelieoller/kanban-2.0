import PropTypes from "prop-types";
import styled from "styled-components";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import slugify from "slugify";
import Categories from "../Categories/Categories";

const SettingsStyles = styled.div`
  background-color: ${props => props.theme.lightGrey};
  width: 100%;
  padding: 40px;
  button {
    padding: 5px 10px;
    color: ${props => props.theme.white};
    background: ${props => props.theme.grey};
    cursor: pointer;
    border-radius: ${props => props.theme.borderRadius};
  }
  .eventCalendarInput {
    width: 200px;
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

  handleSelection = () => {
    const { match, history, boardTitle } = this.props;
    const { boardId } = match.params;

    history.push(
      `/b/${boardId}/${slugify(boardTitle, {
        lower: true
      })}`
    );
  };

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

  render = () => {
    const { dispatch } = this.props;
    const { eventCalendarId } = this.state;

    return (
      <SettingsStyles>
        <button onClick={this.handleSelection}>Back</button>
        <h1>Settings</h1>
        <Categories dispatch={dispatch} />
        <h2>Change Event Calendar:</h2>
				<p>This is your email address associate with a google calendar</p>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="eventCalendarInput"
            value={eventCalendarId}
            onChange={this.handleChange}
          />
          <input type="submit" value="Change Calendar" />
        </form>
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
