import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTooltip = styled.div`
  /* Tooltip container */
  position: relative;
  display: inline-block;

  /* Tooltip text */
  .tooltip {
    visibility: hidden;
    position: absolute;
    width: fit-content;
    background-color: ${props => props.theme.colors.toolTipBackground};
    color: ${props => props.theme.colors.toolTipText};
    text-align: center;
    padding: 5px 10px;
    border-radius: ${props => props.theme.sizes.borderRadius};
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 13px;
    white-space: nowrap;

    &::after {
      content: '';
      position: absolute;
      border-width: 5px;
      border-style: solid;
    }

    /* Bottom Tooltip */
    &.bottom {
      top: 135%;
      left: 50%;
      margin-left: ${props => `-${props.width / 2}px`};

      &::after {
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-color: ${props =>
          `transparent transparent ${
            props.theme.colors.toolTipBackground
          } transparent`};
      }
    }

    /* Top Tooltip */
    &.top {
      bottom: 125%;
      left: 50%;
      margin-left: ${props => `-${props.width / 2}px`};

      &::after {
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-color: ${props =>
          `${
            props.theme.colors.toolTipBackground
          } transparent transparent transparent`};
      }
    }

    /* Right Tooltip */
    &.right {
      top: -5px;
      left: 125%;

      &::after {
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-color: ${props =>
          `transparent ${
            props.theme.colors.toolTipBackground
          } transparent transparent`};
      }
    }

    /* Left Tooltip */
    &.left {
      top: -5px;
      bottom: auto;
      right: 128%;

      &::after {
        top: 50%;
        left: 100%;
        margin-top: -5px;
        border-color: ${props =>
          `transparent transparent transparent ${
            props.theme.colors.toolTipBackground
          }`};
      }
    }
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = ({ tooltipText, children, position }) => {
  const [width, setWidth] = useState(100);
  const inputEl = useRef(null);

  useEffect(() => setWidth(inputEl.current.offsetWidth), []);

  return (
    <StyledTooltip width={width}>
      {children}
      <span className={`tooltip ${position}`} ref={inputEl}>
        {tooltipText}
      </span>
    </StyledTooltip>
  );
};

Tooltip.defaultProps = {
  tooltipText: 'Tooltip',
  position: 'bottom'
};

Tooltip.propTypes = {
  tooltipText: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  position: PropTypes.string
};

export default Tooltip;
