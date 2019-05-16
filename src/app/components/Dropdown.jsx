import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDropdown = styled.div`
  position: relative;

  &:after {
    position: absolute;
    top: 0.75em;
    right: 0.5em;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 0.25em solid transparent;
    border-right: 0.25em solid transparent;
    border-top: 0.375em solid ${props => props.theme.colors.monotoneAccent};
    pointer-events: none;
  }

  select {
    appearance: none;
    font-family: inherit;
    background-color: transparent;
    width: 100%;
    padding: 4px 0;
    font-size: 1rem;
    color: ${props => props.theme.colors.text};
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.monotoneAccent};
    border-radius: 0;
  }
`;

const Dropdown = ({ name, value, onChange, children }) => (
  <StyledDropdown>
    <select
      className="browser-default"
      name={name}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  </StyledDropdown>
);

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
};

export default Dropdown;
