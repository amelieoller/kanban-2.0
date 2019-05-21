import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import { useTransition, animated } from 'react-spring';

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  label {
    margin-left: 3px;
  }

  svg {
    color: ${props => props.theme.colors.textDisabled};
  }

  svg.selected {
    color: ${props => props.theme.colors[props.color]};
  }

  .check {
    width: 16px;
    position: relative;

    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      will-change: opacity;
    }
  }
`;

const boxes = [
  ({ style }) => (
    <animated.div style={{ ...style }}>
      <FiSquare />
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style }}>
      <FiCheckSquare className="selected" />
    </animated.div>
  )
];

const Checkbox = ({ label, onChange, checked, name, color }) => {
  const [isChecked, setIsChecked] = useState(checked ? 1 : 0);

  const onClick = useCallback(() => setIsChecked(state => (state + 1) % 2), []);

  const handleCheck = () => {
    onChange();
    onClick();
  };

  const transitions = useTransition(isChecked, p => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <StyledCheckbox className="checkbox" color={color} onClick={handleCheck}>
      <div className="check">
        {transitions.map(({ item, props, key }) => {
          const Page = boxes[item];
          return <Page key={key} style={props} />;
        })}
      </div>
      {label && (
        <label htmlFor="checkbox" name={name}>
          {label}
        </label>
      )}
    </StyledCheckbox>
  );
};

Checkbox.defaultProps = {
  color: 'secondary',
  checked: false
};

Checkbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default Checkbox;

// {isChecked ? (
//   <FiCheckSquare
//     onClick={handleCheck}
//     name={name}
//     className="selected"
//   />
// ) : (
//   <FiSquare onClick={handleCheck} name={name} />
// )}
