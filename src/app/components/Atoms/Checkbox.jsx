import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-left: 3px;
  }

  svg {
    color: ${props => props.theme.colors.textDisabled};
  }

  svg.selected {
    color: ${props => props.theme.colors[props.color]};
  }
`;

const Checkbox = ({ label, onChange, checked, name, color }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheck = e => {
    onChange(e, !checked, 'pomodoroFocusMode');
    setIsChecked(!checked);
  };

  return (
    <StyledCheckbox className="checkbox" color={color}>
      {isChecked ? (
        <FiCheckSquare onClick={handleCheck} name={name} className="selected" />
      ) : (
        <FiSquare onClick={handleCheck} name={name} />
      )}
      {label && (
        <label htmlFor="checkbox" onClick={handleCheck}>
          {label}
        </label>
      )}
    </StyledCheckbox>
  );
};

Checkbox.defaultProps = {
  color: 'secondary'
};

Checkbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default Checkbox;
