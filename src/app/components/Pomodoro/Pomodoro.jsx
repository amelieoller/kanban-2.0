import React from "react";
import PropTypes from "prop-types";
import {
  FiMessageSquare,
  FiBellOff,
  FiSun,
  FiCode,
  FiTv,
  FiBell,
  FiPauseCircle,
  FiPlayCircle
} from "react-icons/fi";
import Alarm from "../../../assets/sounds/alarm.mp3";
import PomodoroStyles from "../styles/PomodoroStyles";
import Coffee from "../../../assets/images/coffee.png";
import Code from "../../../assets/images/code.png";

export default class Pomodoro extends React.Component {
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
      countdownDisplay: "25:00",
      endTime: 0,
      pomodoriDone: pomodoriDone || 0,
      pomodori: pomodoro.pomodori || 0
    };
  }

  componentDidMount() {
    Notification.requestPermission();
  }

  getFormatTypes = () => [
    { type: "Code", sessionLength: 25 },
    { type: "Coffee", sessionLength: 5 },
    { type: "Walk", sessionLength: 15 }
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
    const { endTime } = this.state;

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
        countdownDisplay: `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
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

      this.handleSettingsChange("pomodoriDone", pomodoriDoneObject);

      this.setState({
        countdownDisplay: "5:00",
        sessionLength: 5,
        pomodoriDone: pomodoriDone + 1
      });
    } else {
      this.setState({
        countdownDisplay: "25:00",
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
        const notification = new Notification("Relax :)", {
          icon: Coffee,
          lang: "en",
          body: "Go talk or drink a coffee."
        });
      } else {
        const notification = new Notification("The time is over!", {
          icon: Code,
          lang: "en",
          body: "Hey, back to code!"
        });
      }
    }
  };

  handleSettingsChange = (type, value) => {
    const { dispatch, boardId } = this.props;

    dispatch({
      type: "CHANGE_POMODORO_SETTING",
      payload: { boardId, type, value }
    });
  };

  render = () => {
    const { timeInterval, pomodoriDone, countdownDisplay } = this.state;
    const { pomodoro } = this.props;

    return (
      <PomodoroStyles>
        <div>
          <span className="header">Pomodoro: </span>
          <span className="cursive-header">{`${this.formatType(
            this.state.sessionLength
          )} Time!`}</span>
        </div>
        <hr />
        <div>
          <div className="timer">
            <span className="time">{countdownDisplay}</span>
          </div>

          <div className="container-controls">
            <div className="time-switcher">
              <button
                type="submit"
                className="btn code"
                onClick={() => this.stopCountdown(25)}
              >
                <FiCode />
              </button>
              <button
                type="submit"
                className="btn social"
                onClick={() => this.stopCountdown(5)}
              >
                <FiTv />
              </button>
              <button
                type="submit"
                className="btn coffee"
                onClick={() => this.stopCountdown(15)}
              >
                <FiSun />
              </button>
            </div>
            <div className="play-count">
              {timeInterval ? (
                <FiPauseCircle
                  className="pause btnIcon"
                  onClick={() => this.startCountdown()}
                />
              ) : (
                <FiPlayCircle
                  className="play btnIcon"
                  onClick={() => this.startCountdown()}
                />
              )}
              <span className="done">{pomodoriDone !== 0 && pomodoriDone}</span>
            </div>
          </div>
        </div>

        <div className="settings">
          <span className="check">
            <input
              type="checkbox"
              ref="notification"
              id="notification"
              defaultChecked={pomodoro.notification}
              onChange={() =>
                this.handleSettingsChange(
                  "notification",
                  !pomodoro.notification
                )
              }
            />
            <label htmlFor="notification" />
            <span className="checkTitle">
              <FiMessageSquare />
            </span>
          </span>

          <span className="check">
            <input
              type="checkbox"
              id="audio"
              defaultChecked={pomodoro.audio}
              onChange={() =>
                this.handleSettingsChange("audio", !pomodoro.audio)
              }
            />
            <label htmlFor="audio" />
            <span className="checkTitle">
              <FiBell />
            </span>
          </span>

          <span className="check">
            <input
              type="checkbox"
              id="showDayPomo"
              defaultChecked={pomodoro.showDayPomo}
              onChange={() =>
                this.handleSettingsChange("showDayPomo", !pomodoro.showDayPomo)
              }
            />
            <label htmlFor="showDayPomo" />
            <span className="checkTitle">
              <FiBellOff />
            </span>
          </span>

          <span className="check">
            <form
              onSubmit={e => {
                e.preventDefault();
                this.handleSettingsChange("pomodori", this.state.pomodori);
              }}
            >
              <input
                type="number"
                id="pomodori"
                placeholder="Pomodori"
                value={this.state.pomodori}
                onChange={e =>
                  this.setState({
                    pomodori: parseInt(e.target.value)
                  })
                }
              />
            </form>
          </span>
        </div>
      </PomodoroStyles>
    );
  };
}
