import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledIconButton = styled.button`
  flex: 0 0 auto;
  color: ${props => props.theme.colors[props.color] || props.color};
  padding: 8px;
  overflow: visible;
  font-size: ${props => `${props.fontSize}rem`};
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: ${props =>
    props.round ? '50%' : props.theme.sizes.borderRadius};
  border: 0;
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const IconButton = props => {
  const { children, onClick } = props;

  return (
    <StyledIconButton role="button" tabIndex={0} onClick={onClick} {...props}>
      {children}
    </StyledIconButton>
  );
};

IconButton.defaultProps = {
  fontSize: 1,
  color: 'text',
  className: '',
  round: false
};

IconButton.propTypes = {
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  round: PropTypes.bool
};

export default IconButton;
