import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";

const CalendarStyles = styled.div`
  .event-title {
    font-size: 14px;
    color: ${props => props.theme.colors.text};
    padding-bottom: 8px;
    line-height: 15px;
  }

  .next-meeting {
    margin-top: 5px;
  }

  .pomodori-left {
    color: ${props => props.theme.colors.monotoneAccent};
    font-size: 15px;
  }
`;

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      nextEventTime: ""
    };
  }

  componentDidMount = () => {
    const { user } = this.props;
    // If access token is expired use refresh token to get new access token
    if (
      moment()
        .subtract(user.expiryDate, "s")
        .format("X") > -300
    ) {
      this.refreshAccessToken();
    } else {
      this.fetchEvents();
    }
  };

  fetchEvents = () => {
    const { eventCalendarId } = this.props;
    if (!eventCalendarId) return;

    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${eventCalendarId}/events?access_token=${
        this.props.user.accessToken
      }&timeMin=${new Date().toISOString()}&showDeleted=false&singleEvents=true&maxResults=5&orderBy=startTime`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          events: data.items.filter(item => item.start.dateTime)
        });
      })
      .then(() => {
        this.nextEventTime();
        setInterval(this.nextEventTime, 55 * 1000);
      });
  };

  refreshAccessToken = () => {
    fetch(
      `https://www.googleapis.com/oauth2/v4/token?client_id=${
        process.env.GOOGLE_CLIENT_ID
      }&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&refresh_token=${
        this.props.user.refreshToken
      }&grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        const expiryDate = moment()
          .add(data.expires_in, "s")
          .format("X");

        this.props.dispatch({
          type: "UPDATE_USER",
          payload: {
            accessToken: data.access_token,
            expiryDate
          }
        });
      })
      .then(() => this.fetchEvents());
  };

  nextEventTime = () => {
    const { events } = this.state;
    const today = new Date();

    events.some(event => {
      const nextEventTime = event.start.dateTime;
      const diffInMin = (new Date(nextEventTime) - today) / 60000;

      if (diffInMin > 0) {
        this.setState({ nextEventTime });
        return true;
      }
    });
  };

  render() {
    const { events, nextEventTime } = this.state;
    const pomodoriToEvent = Math.floor(
      (new Date(nextEventTime) - new Date()) / 60000 / 30
    );
    const nextEventText = moment(nextEventTime).fromNow();

    return (
      <CalendarStyles className="no-focus-mode">
        <span className="header">Events </span>
        {events.length !== 0 && (
          <span className="cursive-header pomodori-left">
            {pomodoriToEvent === 1
              ? ` · ${pomodoriToEvent} Pomodoro`
              : ` · ${pomodoriToEvent} Pomodori`}
          </span>
        )}
        <hr />
        {events.length !== 0 && (
          <div className="cursive-header next-meeting">{`Next meeting is ${nextEventText}.`}</div>
        )}
        <ul>
          {events &&
            events.map(event => (
              <li key={event.id} className="event-title">
                {event.summary} - {moment(event.start.dateTime).format("LT")}
              </li>
            ))}
        </ul>
      </CalendarStyles>
    );
  }
}

export default Calendar;
