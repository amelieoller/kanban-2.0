import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import styled from 'styled-components';

const StyledSimpleSlider = styled.div`
  width: 100%;

  .MuiSlider-track-3,
  button {
    background-color: ${props => props.theme.colors.secondary};
  }

  .MuiSlider-thumb-7:hover {
    box-shadow: 0px 0px 0px 9px rgba(60, 170, 160, 0.16);
  }

  .MuiSlider-thumb-7.MuiSlider-activated-13 {
    box-shadow: 0px 0px 0px 15px rgba(60, 170, 160, 0.16);
  }
`;

const SimpleSlider = ({ value, onChange, onDragEnd }) => (
  <StyledSimpleSlider>
    <Slider
      value={value}
      min={0}
      max={10}
      step={1}
      onChange={onChange}
      onDragEnd={() => onDragEnd(value)}
    />
  </StyledSimpleSlider>
);

SimpleSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired
};

export default SimpleSlider;
