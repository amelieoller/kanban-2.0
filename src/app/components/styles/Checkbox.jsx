import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledCheckbox = styled.div`
  color: ${props => props.theme.colors.text};
  position: relative;

  label {
    color: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    user-select: none;
    font-weight: 400;

    &:before {
      width: 1.2rem;
      height: 1.2rem;
      border: 0.1rem solid rgba(0, 0, 0, 0.45);
      margin: 0;
      content: '';
      display: inline-block;
      transition: all 0.3s ease;
      user-select: none;
      will-change: background-color, border-color;
      margin-right: calc(1rem / 2);
      border-radius: ${props => props.theme.sizes.borderRadius};
      vertical-align: middle;
      background-color: white;
    }

    &:after {
      top: calc(1.1rem / 2);
      left: calc(1rem / 2);
      width: 0.8rem;
      border: 0.1rem solid white;
      height: calc(0.8rem / 2);
      content: '';
      position: absolute;
      transform: scale(0, 0) rotate(-90deg) translateZ(0);
      transition: all 0.2s ease;
      will-change: transform;
      transform-origin: bottom left;
      border-top-style: none;
      border-right-style: none;
    }
  }

  input[type='checkbox'] {
    display: none;
    &:checked {
      + label {
        &:before {
          background-color: ${props => props.theme.colors.mainAccent};
          border-color: ${props => props.theme.colors.mainAccent};
        }
        &:after {
          transform: scale(1, 1) rotate(-45deg) translateZ(0);
        }
      }
    }
  }
`;

const Checkbox = ({ label, onChange, checked, name }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheck = e => {
    onChange(e, !checked, 'pomodoroFocusMode');
    setIsChecked(!checked);
  };

  return (
    <StyledCheckbox className="check-box">
      <input
        type="checkbox"
        name={name}
        onClick={handleCheck}
        defaultChecked={isChecked}
      />
      <label htmlFor="checkbox" onClick={handleCheck}>
        {label}
      </label>
    </StyledCheckbox>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default Checkbox;
