import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slider from '../Molecules/Slider';

const StyledPomodoroEventSettings = styled.div`
  margin-top: 2rem;
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

const PomodoroEventSettings = ({ pomodoro, handleSettingsChange }) => (
  <StyledPomodoroEventSettings>
    <Slider
      value={pomodoro.pomodori}
      checkValue={pomodoro.showDayPomo}
      onDragEnd={value => {
        handleSettingsChange('pomodori', parseInt(value, 10));
      }}
      onCheckClick={value => handleSettingsChange('showDayPomo', value)}
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
  handleSettingsChange: PropTypes.func.isRequired
};

export default PomodoroEventSettings;
