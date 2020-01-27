import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FiClock, FiCoffee } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ProgressCircle from './ProgressCircle';
import Icon from '../Atoms/Icon';

const StyledPomodoro = styled.div`
  color: ${props => props.theme.colors.text};
  position: relative;
  z-index: 2;
  max-width: 200px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 1.2rem;

  @media ${props => props.theme.media.phone} {
    max-width: 180px;
  }

  .pomodoro-inside {
    position: absolute;
    width: 100%;
    top: 30%;

    .countdown-timer {
      font-weight: 200;
      font-size: 3rem;
    }

    .current-pomodoro-icon {
      margin-top: 0.5rem;
    }

    .pomodoro-footer {
      display: flex;
      justify-content: center;
      align-items: flex-end;

      .session-text {
        cursor: pointer;
      }

      .done-wrapper {
        font-style: italic;
        font-family: 'Pacifico', cursive;
        padding-right: 10px;

        .done {
          color: ${props => props.theme.colors.textSecondary};
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
    }
  }
`;

const setFocus = () => {
  window.open('', 'pomodoroPopOut').focus();
};

const Pomodoro = ({
  timeInterval,
  pomodoriDone,
  sessionLength,
  timePaused,
  timePassedMs,
  stopCountdown,
  startCountdown,
  formatType,
  toggleOpened,
  opened
}) => {
  const time = timePassedMs !== 0 ? timePassedMs : sessionLength * 60 * 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);

  useEffect(() => {
    if (timePassedMs !== 0) {
      document.title = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
  }, [seconds]);

  return (
    <StyledPomodoro className="bar-wrapper focus-mode">
      <div className="pomodoro-inside">
        <span className="countdown-timer">{`${minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</span>
        <div className="current-pomodoro-icon">
          {sessionLength === 25 ? (
            <Icon
              onClick={() => startCountdown()}
              fontSize={3}
              color="primary"
              fill="#8686863d"
              round
            >
              <FiClock />
            </Icon>
          ) : (
            <Icon
              onClick={() => startCountdown()}
              fontSize={3}
              color="primary"
              fill="#8686863d"
              round
            >
              <FiCoffee />
            </Icon>
          )}
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
                onKeyDown={e => e.keyCode === 13 && stopCountdown(5)}
                tabIndex={0}
              />
            ) : (
              <FiClock
                className="small-button"
                onClick={() => stopCountdown(25)}
                onKeyDown={e => e.keyCode === 13 && stopCountdown(25)}
                tabIndex={0}
              />
            )}
          </div>
        ) : (
          <div className="pomodoro-footer">
            <span
              className="cursive-header session-text"
              role="button"
              onKeyDown={opened ? setFocus : () => toggleOpened(true)}
              onClick={opened ? setFocus : () => toggleOpened(true)}
              tabIndex={0}
            >
              {formatType(sessionLength)}
            </span>
          </div>
        )}
      </div>
      <ProgressCircle time={time} sessionLength={sessionLength} degrees={269} />
    </StyledPomodoro>
  );
};

Pomodoro.propTypes = {
  timeInterval: PropTypes.number,
  pomodoriDone: PropTypes.number,
  sessionLength: PropTypes.number,
  timePaused: PropTypes.bool,
  timePassedMs: PropTypes.number,
  stopCountdown: PropTypes.func,
  startCountdown: PropTypes.func,
  formatType: PropTypes.func,
  toggleOpened: PropTypes.func,
  opened: PropTypes.bool
};

export default Pomodoro;
