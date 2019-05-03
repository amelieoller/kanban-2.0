import React from 'react';
import styled from 'styled-components';
import { FiClock, FiCoffee, FiSun, FiExternalLink } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ProgressCircle from './ProgressCircle';

const StyledPomodoro = styled.div`
  color: ${props => props.theme.colors.text};
  position: relative;
  z-index: 2;
  max-width: 200px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 1.5rem;

  .pomodoro-inside {
    position: absolute;
    width: 100%;
    top: 30%;

    .start-countdown-wrapper {
      cursor: pointer;
      font-size: 3rem;

      .countdown-timer {
        font-weight: 200;
      }

      .current-pomodoro-icon {
        margin-top: 0.5rem;
      }
    }

    .pomodoro-footer {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-top: 0.2rem;

      .pop-out-button {
        font-size: 0.9rem;
        margin-left: 0.3rem;
        cursor: pointer;
      }

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

      svg:not(:last-child) {
        margin-right: 2px;
      }

      .pomodori-increase-input {
        border: 1px solid #f4f3f3;
        width: 30px;
        text-align: center;
        border-radius: 3px;
        padding: 4.5px 0px;
      }
    }
  }
`;

const Pomodoro = ({
  pomodoro,
  timeInterval,
  pomodoriDone,
  sessionLength,
  timePaused,
  pomodori,
  timePassedMs,
  stopCountdown,
  handleSettingsChange,
  startCountdown,
  handlePomodoriChange,
  formatType,
  toggleOpened,
  opened
}) => {
  const time = timePassedMs !== 0 ? timePassedMs : sessionLength * 60 * 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);

  return (
    <StyledPomodoro className="bar-wrapper focus-mode">
      <div className="pomodoro-inside">
        <div
          className="start-countdown-wrapper"
          onClick={() => startCountdown()}
          onKeyDown={() => startCountdown()}
          tabIndex={0}
          role="button"
        >
          <span className="countdown-timer">{`${minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`}</span>
          <div className="current-pomodoro-icon">
            {sessionLength === 25 ? <FiClock /> : <FiCoffee />}
          </div>
        </div>

        {timePaused || !timeInterval ? (
          <div className="pomodoro-footer">
            <span className="done-wrapper">
              <span className="done">{pomodoriDone}</span>
              <span className="done-text">done</span>
            </span>
            {sessionLength === 25 ? (
              <FiCoffee
                className="small-button"
                onClick={() => stopCountdown(5)}
              />
            ) : (
              <FiClock
                className="small-button"
                onClick={() => stopCountdown(25)}
              />
            )}
            <FiSun
              className={
                pomodoro.showDayPomo ? 'small-button selected' : 'small-button'
              }
              onClick={() =>
                handleSettingsChange('showDayPomo', !pomodoro.showDayPomo)
              }
            />
            <input
              className="pomodori-increase-input"
              type="number"
              id="pomodori"
              placeholder="Pomodori"
              value={pomodori}
              onChange={e => {
                handlePomodoriChange(e);
                handleSettingsChange('pomodori', parseInt(e.target.value, 10));
              }}
            />
          </div>
        ) : (
          <div className="pomodoro-footer">
            <span className="cursive-header">{formatType(sessionLength)}</span>
            {!opened && (
              <FiExternalLink
                className="pop-out-button"
                onClick={() => toggleOpened(true)}
              />
            )}
          </div>
        )}
      </div>
      <ProgressCircle time={time} sessionLength={sessionLength} degrees={269} />
    </StyledPomodoro>
  );
};

Pomodoro.propTypes = {
  pomodoro: PropTypes.shape({
    audio: PropTypes.bool,
    notification: PropTypes.bool,
    pomodori: PropTypes.number,
    showDayPomo: PropTypes.bool
  }).isRequired,
  timeInterval: PropTypes.number,
  pomodoriDone: PropTypes.number,
  sessionLength: PropTypes.number,
  timePaused: PropTypes.bool,
  pomodori: PropTypes.number,
  timePassedMs: PropTypes.number,
  stopCountdown: PropTypes.func,
  handleSettingsChange: PropTypes.func,
  startCountdown: PropTypes.func,
  handlePomodoriChange: PropTypes.func,
  formatType: PropTypes.func,
  toggleOpened: PropTypes.func,
  opened: PropTypes.bool
};

export default Pomodoro;
