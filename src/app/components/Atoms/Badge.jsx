import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { darken } from 'polished';

const StyledBadge = styled.button`
  flex: 0 0 auto;
  color: ${props => props.theme.colors.background};
  padding: 2px 4px;
  overflow: visible;
  font-size: ${props => `${props.fontSize}rem`};
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: ${props => props.theme.sizes.borderRadius};
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
  background-color: ${props => props.background};
  margin-right: 5px;
  font-weight: 500;

  &:hover,
  &:focus {
    background-color: ${props => darken(0.1, props.background)};
  }
`;

const Badge = ({
  children,
  onClick,
  fontSize,
  className,
  style,
  background
}) => (
  <StyledBadge
    fontSize={fontSize}
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={e => e.keyCode === 13 && onClick()}
    className={className}
    style={style}
    background={background}
  >
    {children}
  </StyledBadge>
);

Badge.defaultProps = {
  fontSize: 0.9
};

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  fontSize: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.string,
  background: PropTypes.string
};

export default Badge;
