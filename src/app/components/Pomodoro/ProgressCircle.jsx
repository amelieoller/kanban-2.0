import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledProgressCircle = styled.path`
  fill: none;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 2;
  stroke-dasharray: ${props => props.degrees};
  stroke-opacity: 1;
`;

const ProgressBar = styled(StyledProgressCircle).attrs(props => ({
  strokeDashoffset: props.percentage
}))`
  transition: stroke-dashoffset 1s cubic-bezier(0.6, 0, 0.4, 1);
  stroke: ${props => props.theme.colors.primary};
`;

const ProgressBackground = styled(StyledProgressCircle)`
  stroke: ${props => props.theme.colors.background};
  stroke-dashoffset: 0;
`;

const ProgressCircle = ({ time, sessionLength, degrees }) => (
  <svg viewBox="0 0 130 117" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5,-402)">
      <ProgressBackground
        degrees={degrees}
        d="M 23.740374,504.26854 C 12.067324,494.12718 4.6867337,479.17383 4.6867337,462.49666 c 0,-30.54868 24.7645903,-55.31327 55.3132603,-55.31327 30.54868,0 55.313266,24.76459 55.313266,55.31327 0,16.69132 -7.39313,31.65589 -19.083366,41.79769"
      />
      <ProgressBar
        percentage={(time / 1000 / (60 * sessionLength)) * degrees}
        degrees={degrees}
        d="M 23.740374,504.26854 C 12.067324,494.12718 4.6867337,479.17383 4.6867337,462.49666 c 0,-30.54868 24.7610903,-55.31327 55.3132603,-55.31327 30.54868,0 55.313266,24.76459 55.313266,55.31327 0,16.69132 -7.39313,31.65589 -19.083366,41.79769"
      />
    </g>
  </svg>
);

ProgressCircle.defaultProps = {
  degrees: 100
};

ProgressCircle.propTypes = {
  time: PropTypes.number.isRequired,
  sessionLength: PropTypes.number.isRequired,
  degrees: PropTypes.number
};

export default ProgressCircle;
