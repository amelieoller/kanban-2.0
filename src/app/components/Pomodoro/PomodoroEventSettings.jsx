import React from 'react';
import styled from 'styled-components';
import { FiSun } from 'react-icons/fi';
import PropTypes from 'prop-types';

const StyledPomodoroEventSettings = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 1.8rem;

  *:not(:last-child) {
    margin-right: 0.2rem;
  }

  .pomodori-increase-input {
    border: 1px solid #f4f3f3;
    width: 30px;
    text-align: center;
    border-radius: 3px;
    padding: 4.5px 0px;
  }

  .pomodori-possible {
    font-size: 0.7rem;
    color: ${props => props.theme.colors.text};
    font-style: italic;
  }
`;

const PomodoriText = pomodoriToEvent => {
  let text = '';

  if (pomodoriToEvent) {
    text = 'Too many Pomodori to count...';
  } else if (pomodoriToEvent === 1) {
    text = `${pomodoriToEvent} Pomodoro before next meeting`;
  } else {
    text = `${pomodoriToEvent} Pomodori before next meeting`;
  }
  return text;
};

const PomodoroEventSettings = ({
  pomodoro,
  pomodori,
  handleSettingsChange,
  handlePomodoriChange,
  pomodoriToEvent
}) => (
  <StyledPomodoroEventSettings>
    <FiSun
      className={
        pomodoro.showDayPomo ? 'small-button selected' : 'small-button'
      }
      onClick={() => handleSettingsChange('showDayPomo', !pomodoro.showDayPomo)}
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

    <span className="pomodori-possible">
      {pomodoriToEvent && PomodoriText(pomodoriToEvent)}
    </span>
  </StyledPomodoroEventSettings>
);

PomodoroEventSettings.propTypes = {
  pomodoro: PropTypes.shape({
    audio: PropTypes.bool,
    notification: PropTypes.bool,
    pomodori: PropTypes.number,
    showDayPomo: PropTypes.bool
  }).isRequired,
  pomodori: PropTypes.number.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  handlePomodoriChange: PropTypes.func.isRequired,
  pomodoriToEvent: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

export default PomodoroEventSettings;
