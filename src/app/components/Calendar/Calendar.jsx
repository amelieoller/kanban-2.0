import React, { Component } from "react";
import moment from "moment";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "806477119130-crbjurmijtem862kr6qq8c9l2jgog3dc.apps.googleusercontent.com",
  "GfeiulhRKrL0zHpoS1qDcKxl",
  "http://127.0.0.1:1337/auth/google/callback"
);

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount = () => {
    this.fetchEvents();
  };

  fetchEvents = () => {
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/amelie.oller@flatironschool.com/events?access_token=${
        this.props.user.accessToken
      }&timeMin=${new Date().toISOString()}&showDeleted=false&singleEvents=true&maxResults=5&orderBy=startTime`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          events: data.items
        });
      });
  };

  render() {
    const { events } = this.state;
    const { user } = this.props;

    if (
      moment()
        .subtract(user.expiryDate, "s")
        .format("X") > -300
    ) {
      oauth2Client.setCredentials({
        access_token: user.accessToken,
        refresh_token: user.refreshToken
      });

      oauth2Client.refreshAccessToken((err, tokens) => {
				if (err) return next(err);
				debugger

        // // save the new token and expiry_date
        // User.findOneAndUpdate(
        //   { "google.id": req.user.google.id },
        //   {
        //     "google.token": tokens.access_token,
        //     "google.expiry_date": tokens.expiry_date
        //   },
        //   {
        //     new: true,
        //     runValidators: true
        //   },
        //   (err, doc) => {
        //     if (err) return next(err);
        //     next();
        //   }
        // );
      });
    }

    return (
      <>
        <h3>Calendar</h3>
        <ul>
          {events &&
            events.map(event => <li key={event.id}>{event.summary}</li>)}
        </ul>
      </>
    );
  }
}

export default Calendar;
