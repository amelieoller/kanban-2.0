import React, { Component } from 'react';
import styled from 'styled-components';
import { FiClock, FiCoffee } from 'react-icons/fi';
import PropTypes from 'prop-types';
import Alarm from '../../../assets/sounds/alarm.mp3';
import Coffee from '../../../assets/images/coffee.png';
import Code from '../../../assets/images/code.png';

const StyledPomodoro = styled.div`
  text-align: center;
  font-weight: 200;
  color: ${props => props.theme.colors.text};

  .bar-wrapper {
    position: relative;
    cursor: pointer;
    z-index: 2;
    margin-bottom: 15px;

    .pomodoro-inside {
      position: absolute;
      width: 100%;
      top: 50%;
      text-align: center;
      font-size: 3em;
      margin-top: -1.6rem;

      .start-countdown-wrapper {
        .current-pomodoro-icon {
          margin-top: 0.5rem;
        }
      }

      .pomodoro-footer {
        .done-wrapper {
          font-style: italic;
          font-family: 'Pacifico', cursive;
          padding-right: 10px;

          .done {
            color: ${props => props.theme.colors.mainAccent};
            font-size: 25px;
            padding-right: 2px;
          }

          .done-text {
            font-size: 12px;
          }
        }

        .switch-icon {
          margin-top: -1.6rem;
          display: flex;
          justify-content: center;
          align-items: flex-end;

          svg {
            font-size: 1.5rem;
            background-color: transparent;
            padding: 3px 4px;
            border-radius: 3px;
            border: 1px solid ${props => props.theme.colors.borderColor};
            transition: background 0.5s;

            &:hover {
              background-color: ${props => props.theme.colors.mainAccent};
              color: ${props => props.theme.colors.white};
            }
          }
        }
      }
    }
  }

  & .background {
    stroke: ${props => props.theme.colors.mainBackground};
  }

  & .bar {
    transition: stroke-dashoffset 1s cubic-bezier(0.6, 0, 0.4, 1);
    stroke: ${props => props.theme.colors.mainAccent};
    stroke-dashoffset: ${props => props.percentage};
  }
`;

class Pomodoro extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    pomodoro: PropTypes.shape({
      audio: PropTypes.boolean,
      notification: PropTypes.boolean,
      pomodori: PropTypes.number,
      showDayPomo: PropTypes.boolean
    }).isRequired
  };

  constructor(props) {
    super(props);
    const { pomodoro } = props;
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    const pomodoriDone = pomodoro.pomodoriDone && pomodoro.pomodoriDone[date];

    this.state = {
      sessionLength: 25,
      timeInterval: false,
      pausedTime: 0,
      timePaused: false,
      countdownDisplay: '25:00',
      circleDisplay: 269,
      endTime: 0,
      pomodoriDone: pomodoriDone || 0,
      pomodori: pomodoro.pomodori || 0
    };
  }

  componentDidMount() {
    Notification.requestPermission();
  }

  getFormatTypes = () => [
    { type: 'Work', sessionLength: 25 },
    { type: 'Coffee', sessionLength: 5 }
  ];

  formatType = timeType => {
    const timeTypes = this.getFormatTypes();
    for (let i = 0; i < timeTypes.length; i += 1) {
      const timeObj = timeTypes[i];
      if (timeObj.sessionLength === timeType) {
        return timeObj.type;
      }
    }
    return null;
  };

  startCountdown = () => {
    const { timeInterval, timePaused, pausedTime } = this.state;
    // Pause pomodoro if countdown is currently running, otherwise start
    // countdown
    if (timeInterval !== false) {
      this.pauseCountdown();
    } else {
      // Set start and end time with system time and convert to
      // milliseconds to correctly measure time elapsed
      const newStartTime = new Date().getTime();
      this.setState({
        startTime: newStartTime
      });
      // Check if pomodoro has just been un-paused
      if (timePaused === false) {
        // First time starting pomodoro
        this.unPauseCountdown();
      } else {
        // At first pause and every pause afterwards
        this.setState({
          endTime: newStartTime + pausedTime,
          timePaused: false
        });
      }
      // Run updateCountdown every 990ms to avoid lag with 1000ms,
      // Update countdown checks time against system time and updates
      // #countdown display
      this.setState({
        timeInterval: setInterval(this.updateCountdown, 990)
      });
    }
  };

  updateCountdown = () => {
    const { endTime, sessionLength } = this.state;

    // Get difference between the current time and the
    // end time in milliseconds. difference = remaining time
    const difference = endTime - new Date().getTime();
    // Convert remaining milliseconds into minutes and seconds
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    // Display remaining minutes and seconds, unless there is less than 1 second
    // left on timer. Then change to next session.
    if (difference > 1000) {
      this.setState({
        countdownDisplay: `${minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`,
        circleDisplay: ((minutes * 60 + seconds) / (60 * sessionLength)) * 269
      });
    } else {
      this.changeSessions();
    }
  };

  resetInterval = () => {
    const { timeInterval } = this.state;

    clearInterval(timeInterval);
    this.setState({
      timeInterval: false
    });
  };

  changeSessions = () => {
    const { sessionLength, pomodoriDone } = this.state;

    this.resetInterval();

    // Notification
    this.alert();

    if (sessionLength === 25) {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;

      const pomodoriDoneObject = {
        [date]: pomodoriDone + 1
      };

      this.handleSettingsChange('pomodoriDone', pomodoriDoneObject);

      this.setState({
        countdownDisplay: '5:00',
        sessionLength: 5,
        pomodoriDone: pomodoriDone + 1
      });
    } else {
      this.setState({
        countdownDisplay: '25:00',
        sessionLength: 25
      });
    }
  };

  pauseCountdown = () => {
    const { endTime } = this.state;

    this.resetInterval();
    this.setState({
      pausedTime: endTime - new Date().getTime(),
      timePaused: true
    });
  };

  unPauseCountdown = () => {
    const { sessionLength } = this.state;

    this.setState({
      endTime: new Date().getTime() + sessionLength * 60000
    });
  };

  stopCountdown(newTime) {
    this.resetInterval();
    this.setState({
      sessionLength: newTime,
      pausedTime: 0,
      timePaused: false,
      endTime: 0,
      countdownDisplay: `${newTime}:00`
    });
  }

  alert = () => {
    // audio
    if (this.props.pomodoro.audio) {
      const audio = new Audio(Alarm);
      const playPromise = audio.play();

      // In browsers that don’t yet support this functionality,
      // playPromise won’t be defined.
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Automatic playback started!
            setTimeout(() => audio.pause(), 2500);
          })
          .catch(error => {
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
          });
      }
    }
    // notification
    if (this.props.pomodoro.notification) {
      if (this.state.sessionLength === 25) {
        const notification = new Notification('Relax :)', {
          icon: Coffee,
          lang: 'en',
          body: 'Go talk or drink a coffee.'
        });
      } else {
        const notification = new Notification('The time is over!', {
          icon: Code,
          lang: 'en',
          body: 'Hey, back to work!'
        });
      }
    }
  };

  handleSettingsChange = (type, value) => {
    const { dispatch, boardId } = this.props;

    dispatch({
      type: 'CHANGE_POMODORO_SETTING',
      payload: { boardId, type, value }
    });
  };

  render() {
    const {
      timeInterval,
      pomodoriDone,
      countdownDisplay,
      circleDisplay,
      sessionLength,
      timePaused
    } = this.state;

    return (
      <StyledPomodoro percentage={circleDisplay}>
        <div className="bar-wrapper focus-mode">
          <div className="pomodoro-inside">
            <div className="start-countdown-wrapper">
              <span onClick={() => this.startCountdown()}>
                {countdownDisplay}
              </span>
              <div className="current-pomodoro-icon">
                {sessionLength === 25 ? (
                  <FiClock
                    className="pomodoro-icon"
                    onClick={() => this.startCountdown()}
                  />
                ) : (
                  <FiCoffee
                    className="pomodoro-icon"
                    onClick={() => this.startCountdown()}
                  />
                )}
              </div>
            </div>

            <div className="pomodoro-footer">
              {timePaused || !timeInterval ? (
                <div className="switch-icon">
                  <span className="done-wrapper">
                    <span className="done">{pomodoriDone}</span>
                    <span className="done-text">done</span>
                  </span>
                  {sessionLength === 25 ? (
                    <FiCoffee
                      className="pomodoro-icon"
                      onClick={() => this.stopCountdown(5)}
                    />
                  ) : (
                    <FiClock
                      className="pomodoro-icon"
                      onClick={() => this.stopCountdown(25)}
                    />
                  )}
                </div>
              ) : (
                <div className="cursive-header">
                  {this.formatType(this.state.sessionLength)}
                </div>
              )}
            </div>
          </div>
          <svg
            viewBox="0 0 130 117"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="dropshadow" height="130%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" result="offsetblur" />
                <feComponentTransfer xmlns="http://www.w3.org/2000/svg">
                  <feFuncA type="linear" slope="0.2" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(5,-397.02499)">
              <path
                className="background"
                d="M 23.740374,504.26854 C 12.067324,494.12718 4.6867337,479.17383 4.6867337,462.49666 c 0,-30.54868 24.7645903,-55.31327 55.3132603,-55.31327 30.54868,0 55.313266,24.76459 55.313266,55.31327 0,16.69132 -7.39313,31.65589 -19.083366,41.79769"
                style={{
                  fill: 'none',
                  strokeWidth: 5,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeMiterlimit: 2,
                  strokeDasharray: 269,
                  strokeDashoffset: 0,
                  strokeOpacity: 1
                }}
              />
              <path
                className="bar"
                d="M 23.740374,504.26854 C 12.067324,494.12718 4.6867337,479.17383 4.6867337,462.49666 c 0,-30.54868 24.7610903,-55.31327 55.3132603,-55.31327 30.54868,0 55.313266,24.76459 55.313266,55.31327 0,16.69132 -7.39313,31.65589 -19.083366,41.79769"
                style={{
                  filter: 'url(#dropshadow)',
                  fill: 'none',
                  strokeWidth: 5,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeMiterlimit: 2,
                  strokeDasharray: 269,
                  strokeOpacity: 1
                }}
                data-percent={circleDisplay}
              />
            </g>
          </svg>
        </div>
      </StyledPomodoro>
    );
  }
}

export default Pomodoro;
