import React from "react";
import "./Pomodoro.scss";
import Play from "react-icons/lib/md/play-circle-outline";
import Pause from "react-icons/lib/md/pause-circle-outline";
import PropTypes from "prop-types";
import Alarm from "../../../assets/sounds/alarm.mp3";
import Coffee from "../../../assets/images/coffee.png";
import Code from "../../../assets/images/code.png";

export default class Pomodoro extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    pomodoro: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      time: 1500,
      play: false,
      timeType: 1500,
      pomodori: this.props.pomodoro.pomodori || 0
    };
    // Bind early, avoid function creation on render loop
    this.setTimeForCode = this.setTime.bind(this, 1500);
    this.setTimeForSocial = this.setTime.bind(this, 300);
    this.setTimeForCoffee = this.setTime.bind(this, 900);
    this.reset = this.reset.bind(this);
    this.play = this.play.bind(this);
    this.elapseTime = this.elapseTime.bind(this);
  }

  componentDidMount() {
    this.setDefaultTime();
    // this.startShortcuts();
    Notification.requestPermission();
  }

  getFormatTypes() {
    return [
      { type: "Code", time: 1500 },
      { type: "Social", time: 300 },
      { type: "Coffee", time: 900 }
    ];
  }

  setTime(newTime) {
    this.restartInterval();

    this.setState({
      time: newTime,
      timeType: newTime,
      play: true
    });
  }

  setDefaultTime() {
    const defaultTime = 1500;

    this.setState({
      time: defaultTime,
      timeType: defaultTime,
      play: false
    });
  }

  handleSettingsChange = (type, value) => {
    const { dispatch, boardId } = this.props;

    dispatch({
      type: "CHANGE_POMODORO_SETTING",
      payload: { boardId, type, value }
    });
  };

  format(seconds) {
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const timeFormated = `${(m < 10 ? "0" : "") + m}:${s < 10 ? "0" : ""}${s}`;
    return timeFormated;
  }

  elapseTime() {
    if (this.state.time === 0) {
      this.reset(0);
      this.alert();
    }
    if (this.state.play === true) {
      const newState = this.state.time - 1;
      this.setState({ time: newState });
    }
  }

  formatType(timeType) {
    const timeTypes = this.getFormatTypes();
    for (let i = 0; i < timeTypes.length; i += 1) {
      const timeObj = timeTypes[i];
      if (timeObj.time === timeType) {
        return timeObj.type;
      }
    }
    return null;
  }

  restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  play() {
    if (this.state.play === true) return;

    this.restartInterval();

    this.setState({
      play: true
    });
  }

  reset(resetFor = this.state.time) {
    clearInterval(this.interval);
    const time = this.format(resetFor);
    this.setState({ play: false });
  }

  togglePlay() {
    if (this.state.play === true) return this.reset();

    return this.play();
  }

  toggleMode(gotoDirection) {
    const timeTypes = this.getFormatTypes();
    let currentPosition = -1;

    for (let i = 0; i < timeTypes.length; i += 1) {
      if (timeTypes[i].time === this.state.timeType) {
        currentPosition = i;
        break;
      }
    }

    if (currentPosition !== -1) {
      const newMode = timeTypes[currentPosition + gotoDirection];
      if (newMode) this.setTime(newMode.time);
    }
  }

  alert() {
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
      if (this.state.timeType === 1500) {
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
  }

  render() {
    const { pomodoro } = this.props;

    return (
      <div className="pomodoro">
        <div className="header">
          Pomodoro:{" "}
          <span className="timeName">{`${this.formatType(
            this.state.timeType
          )} Time!`}</span>
        </div>
        <hr />
        {/* Main section
        ------------------------------- */}
        <div className="main">
          <div className="container display timer">
            <span className="time">{this.format(this.state.time)}</span>
          </div>

          <div className="container display types">
            <button
              type="submit"
              className="btn code"
              onClick={this.setTimeForCode}
            >
              Code
            </button>
            <button
              type="submit"
              className="btn social"
              onClick={this.setTimeForSocial}
            >
              Social
            </button>
            <button
              type="submit"
              className="btn coffee"
              onClick={this.setTimeForCoffee}
            >
              Coffee
            </button>
          </div>

          <div className="container">
            <div className="controlsPlay">
              <Play className="play btnIcon" onClick={this.play} />
              <Pause className="pause btnIcon" onClick={this.reset} />
            </div>
          </div>
        </div>{" "}
        {/* main */}
        {/* Bottom section
        ------------------------------- */}
        <div className="bottomBar">
          <div className="controls">
            <div className="container">
              <div className="controlsCheck">
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
                  <span className="checkTitle">Notification</span>
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
                  <span className="checkTitle">Sound</span>
                </span>
                <span className="check">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      this.handleSettingsChange(
                        "pomodori",
                        this.state.pomodori
                      );
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
									<span className="checkTitle">Show</span>
								</span>
              </div>
              {/* controlsCheck */}
            </div>
            {/* container */}
          </div>
          {/* controls */}
        </div>
        {/* bottomBar */}
      </div> /* bottomBar */
    );
  }
}
