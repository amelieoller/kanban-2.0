import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import {
	fetchEvents,
	refreshAccessToken,
	filterEvents,
	calculateNextEventTime
} from './fetchEvents';

const EventsStyles = styled.div`
	color: ${props => props.theme.colors.text};
	font-size: 0.8rem;
	line-height: 0.9rem;

	.currently-in-meeting {
		color: ${props => props.theme.colors.primary};
		margin-bottom: 0.7rem;

		.meeting {
			font-weight: bold;
		}
	}

	.next-meeting {
		margin-bottom: 0.7rem;

		.meeting {
			font-weight: bold;
		}
	}

	.more-meetings {
		color: ${props => props.theme.colors.textSecondary};
		margin: 0;

		.meeting:not(:last-child) {
			padding-bottom: 0.5rem;
		}
	}
`;

class Events extends Component {
	constructor() {
		super();

		this.state = {
			events: [],
			nextEventTime: '',
			nextEventTimeInterval: '',
			error: ''
		};
	}

	componentDidMount = () => {
		const { user } = this.props;

		if (user) {
			// If access token is expired use refresh token to get new access token
			if (
				moment()
					.subtract(user.expiryDate, 's')
					.format('X') > -300
			) {
				this.callRefreshAccessToken();
			} else {
				this.callFetchEvents();
			}
		}
	};

	componentWillUnmount = () => {
		const { nextEventTimeInterval } = this.state;

		clearInterval(nextEventTimeInterval);
	};

	callRefreshAccessToken = () => {
		const {
			user: { refreshToken },
			dispatch
		} = this.props;

		refreshAccessToken(refreshToken)
			.then(data => {
				const expiryDate = moment()
					.add(data.expires_in, 's')
					.format('X');

				dispatch({
					type: 'UPDATE_USER',
					payload: {
						accessToken: data.access_token,
						expiryDate
					}
				});
			})
			.then(() => this.callFetchEvents());
	};

	callFetchEvents = () => {
		const {
			user: { accessToken },
			eventCalendarId,
			setPomodoriToEvent,
			eventFilter
		} = this.props;

		fetchEvents(accessToken, eventCalendarId)
			.then(data => {
				const events = filterEvents(data.items, eventFilter);
				const nextEventTime = calculateNextEventTime(events);
				const nextEventTimeInterval = setInterval(
					() => calculateNextEventTime(events),
					55 * 1000
				);

				setPomodoriToEvent(
					Math.floor((new Date(nextEventTime) - new Date()) / 60000 / 30)
				);

				this.setState({
					events,
					nextEventTime,
					nextEventTimeInterval
				});
			})
			.catch(error => {
				this.setState({
					error: error.message
				});
			});
	};

	render() {
		const { events, nextEventTime, error } = this.state;
		const nextEventText = moment(nextEventTime).fromNow();
		const { user, eventCalendarId, toggleSettingsMenu } = this.props;

		let eventInfo;

		if (!user || !eventCalendarId) {
			<div className="no-items" name="Events">
				To see your upcoming events, make sure you are signed in and have added
				a Calendar ID in the{' '}
				<span
					role="link"
					className="open-settings-link"
					onClick={toggleSettingsMenu}
					onKeyDown={toggleSettingsMenu}
					tabIndex={0}
				>
					settings panel
				</span>
				.
			</div>;
		} else if (error) {
			eventInfo = (
				<div className="alert alert-error">
					<strong>Error fetching events!</strong> Please try logging out and
					back in.
				</div>
			);
		} else if (events && events.length !== 0) {
			eventInfo = (
				<CSSTransitionGroup
					transitionName="fade"
					transitionAppear
					transitionAppearTimeout={500}
					transitionEnter={false}
					transitionLeave={false}
				>
					{events[0].start.dateTime !== nextEventTime && (
						<div className="currently-in-meeting">
							In meeting: <span className="meeting">{events[0].summary}</span>
						</div>
					)}

					<div className="next-meeting">
						<span className="meeting-prefix">
							{`Next meeting is ${nextEventText}: `}
						</span>

						<span className="meeting">
							{events[0].start.dateTime === nextEventTime
								? `${events[0].summary} -
                    ${moment(events[0].start.dateTime).format('LT')}`
								: `${events[1].summary} -
                    ${moment(events[1].start.dateTime).format('LT')}`}
						</span>
					</div>
					<ul className="more-meetings">
						{events &&
							events.slice(1, 3).map(event => (
								<li key={event.id} className="meeting">
									{event.summary} - {moment(event.start.dateTime).format('LT')}
								</li>
							))}
					</ul>
				</CSSTransitionGroup>
			);
		} else {
			eventInfo = <Loading text="Fetching Events" />;
		}

		return <EventsStyles className="focus-mode">{eventInfo}</EventsStyles>;
	}
}

Events.propTypes = {
	user: PropTypes.object,
	eventCalendarId: PropTypes.string,
	setPomodoriToEvent: PropTypes.func,
	eventFilter: PropTypes.string,
	dispatch: PropTypes.func
};

export default Events;
