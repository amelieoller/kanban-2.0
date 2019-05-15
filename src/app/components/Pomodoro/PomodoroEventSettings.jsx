import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SimpleSlider from '../Molecules/SimpleSlider';

const StyledPomodoroEventSettings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.8rem;

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

  button.small-button {
    font-size: 14px;
    margin-right: 8px;
  }
`;

// const PomodoriText = pomodoriToEvent => {
//   let text = '';

//   if (pomodoriToEvent) {
//     text = 'Too many Pomodori to count...';
//   } else if (pomodoriToEvent === 1) {
//     text = `${pomodoriToEvent} Pomodoro before next meeting`;
//   } else {
//     text = `${pomodoriToEvent} Pomodori before next meeting`;
//   }
//   return text;
// };

const PomodoroEventSettings = ({
  pomodoro,
  pomodori,
  handleSettingsChange,
  handlePomodoriChange,
  pomodoriToEvent
}) => (
  <StyledPomodoroEventSettings>
    <button
      className={
        pomodoro.showDayPomo ? 'small-button selected' : 'small-button'
      }
      onClick={() => handleSettingsChange('showDayPomo', !pomodoro.showDayPomo)}
      type="button"
    >
      {pomodori}
    </button>

    <SimpleSlider
      value={pomodori}
      onChange={(e, value) => {
        handlePomodoriChange(parseInt(value, 10));
      }}
      onDragEnd={value => {
        handleSettingsChange('pomodori', parseInt(value, 10));
      }}
    />
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
