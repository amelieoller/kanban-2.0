import React, { Component } from 'react';
import styled from 'styled-components';
import { FiClock, FiCoffee, FiSun } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ProgressCircle from './ProgressCircle';
import pomodoroAlert from './pomodoroAlert';

const StyledPomodoro = styled.div`
  text-align: center;
  font-weight: 200;
  color: ${props => props.theme.colors.text};

  .bar-wrapper {
    position: relative;
    z-index: 2;
    margin-bottom: 35px;
    max-width: 200px;
    margin: 0 auto 1rem auto;

    .pomodoro-inside {
      position: absolute;
      width: 100%;
      top: 50%;
      text-align: center;
      font-size: 3em;
      margin-top: -1.6rem;

      .start-countdown-wrapper {
        cursor: pointer;

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

          svg:not(:last-child) {
            margin-right: 2px;
          }

          svg {
            font-size: 1.5rem;
            background-color: transparent;
            padding: 3px 4px;
            border-radius: 3px;
            border: 1px solid ${props => props.theme.colors.borderColor};
            transition: background 0.5s;

            &.selected {
              background-color: ${props => props.theme.colors.mainAccent};
              color: ${props => props.theme.colors.white};
            }

            &:hover {
              background-color: ${props => props.theme.colors.mainAccent};
              color: ${props => props.theme.colors.white};
            }
          }
        }

        .pomodori-increase {
          input[type='number'] {
            border: 1px solid #f4f3f3;
            height: 22px;
            width: 30px;
            text-align: center;
            border-radius: 3px;
          }
        }
      }
    }
  }
`;

class Pomodoro extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    pomodoro: PropTypes.shape({
      audio: PropTypes.bool,
      notification: PropTypes.bool,
      pomodori: PropTypes.number,
      showDayPomo: PropTypes.bool
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
      timePassedMs: false,
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

  formatType = timeType =>
    this.getFormatTypes().filter(
      timeObj => timeObj.sessionLength === timeType
    )[0].type;

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
    const { endTime } = this.state;

    // Get difference between the current time and the
    // end time in milliseconds. difference = remaining time
    const difference = endTime - new Date().getTime();

    // Display remaining minutes and seconds, unless there is less than 1 second
    // left on timer. Then change to next session.
    if (difference > 1000) {
      this.setState({
        timePassedMs: difference
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
    const {
      pomodoro: { audio, notification }
    } = this.props;
    pomodoroAlert(sessionLength, audio, notification);

    if (sessionLength === 25) {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;

      const pomodoriDoneObject = {
        [date]: pomodoriDone + 1
      };

      this.handleSettingsChange('pomodoriDone', pomodoriDoneObject);

      this.setState({
        sessionLength: 5,
        pomodoriDone: pomodoriDone + 1,
        timePassedMs: false
      });
    } else {
      this.setState({
        sessionLength: 25,
        timePassedMs: false
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

  handleSettingsChange = (type, value) => {
    const { dispatch, boardId } = this.props;

    dispatch({
      type: 'CHANGE_POMODORO_SETTING',
      payload: { boardId, type, value }
    });
  };

  stopCountdown(newTime) {
    this.resetInterval();
    this.setState({
      sessionLength: newTime,
      pausedTime: 0,
      timePaused: false,
      endTime: 0,
      timePassedMs: false
    });
  }

  render() {
    const {
      timeInterval,
      pomodoriDone,
      sessionLength,
      timePaused,
      pomodori,
      timePassedMs
    } = this.state;
    const { pomodoro } = this.props;
    const time =
      timePassedMs !== false ? timePassedMs : sessionLength * 60 * 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);

    return (
      <StyledPomodoro>
        <div className="bar-wrapper focus-mode">
          <div className="pomodoro-inside">
            <div
              className="start-countdown-wrapper"
              onClick={() => this.startCountdown()}
              onKeyDown={() => this.startCountdown()}
              tabIndex={0}
              role="button"
            >
              <span>{`${minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`}</span>
              <div className="current-pomodoro-icon">
                {sessionLength === 25 ? (
                  <FiClock
                    className="pomodoro-icon"
                  />
                ) : (
                  <FiCoffee
                    className="pomodoro-icon"
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
                  <FiSun
                    className={
                      pomodoro.showDayPomo
                        ? 'pomodoro-icon selected'
                        : 'pomodoro-icon'
                    }
                    onClick={() =>
                      this.handleSettingsChange(
                        'showDayPomo',
                        !pomodoro.showDayPomo
                      )
                    }
                  />
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      this.handleSettingsChange('pomodori', pomodori);
                    }}
                    className="pomodori-increase"
                  >
                    <input
                      type="number"
                      id="pomodori"
                      placeholder="Pomodori"
                      value={pomodori}
                      onChange={e =>
                        this.setState({
                          pomodori: parseInt(e.target.value, 10)
                        })
                      }
                    />
                  </form>
                </div>
              ) : (
                <div className="cursive-header">
                  {this.formatType(sessionLength)}
                </div>
              )}
            </div>
          </div>
          <ProgressCircle
            time={time}
            sessionLength={sessionLength}
            degrees={269}
          />
        </div>
      </StyledPomodoro>
    );
  }
}

export default Pomodoro;
