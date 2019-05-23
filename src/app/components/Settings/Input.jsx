import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #c6c7c6;
  padding: 2px;
  font-size: 16px;
  background: transparent;
  outline: none;
  color: ${props => props.theme.colors.text};
  width: 100%;
`;

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  className
}) => (
  <StyledInput
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    className={className}
  />
);

Input.defaultProps = {
  type: 'text',
  placeholder: ''
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string
};

export default Input;
