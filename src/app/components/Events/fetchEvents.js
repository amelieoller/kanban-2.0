export const filterEvents = (events, eventFilter) => {
  // Filter all day events
  let filteredEvents = events.filter(event => event.start.dateTime);

  // Filter by eventFilter keyword
  if (eventFilter) {
    filteredEvents = filteredEvents.filter(
      event => event.summary !== eventFilter
    );
  }

  // Filter declined events
  filteredEvents = filteredEvents.filter(
    event =>
      !event.attendees ||
      !event.attendees.every(att => att.responseStatus === 'declined')
  );

  return filteredEvents;
};

export const fetchEvents = async (accessToken, eventCalendarId) => {
  // await response of fetch call
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${eventCalendarId}/events?access_token=${accessToken}&timeMin=${new Date().toISOString()}&showDeleted=false&singleEvents=true&maxResults=15&orderBy=startTime`
  );
  // only proceed once promise is resolved
  const data = await response.json();
  // only proceed once second promise is resolved
  return data;
};

export const refreshAccessToken = async refreshToken => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v4/token?client_id=${
      process.env.GOOGLE_CLIENT_ID
    }&client_secret=${
      process.env.GOOGLE_CLIENT_SECRET
    }&refresh_token=${refreshToken}&grant_type=refresh_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );
  const data = await response.json();

  return data;
};

export const calculateNextEventTime = events => {
  const today = new Date();
  let nextNextEventTime = 0;

  for (let i = 0; i < events.length; i += 1) {
    nextNextEventTime = events[i].start.dateTime;
    const diffInMin = (new Date(nextNextEventTime) - today) / 60000;

    if (diffInMin > 0) {
      break;
    }
  }

  return nextNextEventTime;
};
