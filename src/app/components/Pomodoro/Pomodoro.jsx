import React, { Component } from 'react';
import styled from 'styled-components';

const StyledPomodoro = styled.div`
  text-align: center;

  & .background {
    stroke: #1C1C20;
  }

  & .bar-wrapper {
    position: relative;
  }

  & .number-left {
    position: absolute;
    width: 100%;
    top: 50%;
    text-align: center;
    font-size: 4em;
    margin-top: -0.5em;
  }

  & .bar {
    transition: stroke-dashoffset 1s cubic-bezier(0.6, 0, 0.4, 1);
    stroke: #C6C7C6;
    stroke-dashoffset: ${props => props.percentage};
  }
`;

class Pomodoro extends Component {
  constructor() {
    super();

    this.state = {
      percentage: 70
    };
  }

  render() {
    const { percentage } = this.state;

    return (
      <StyledPomodoro percentage={269 * (1 - percentage / 100)}>
        <div className="bar-wrapper">
          <div className="number-left" data-num-left>
            3
          </div>
          <svg
            viewBox="0 0 130 117"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="dropshadow" height="130%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" result="offsetblur" />
                <feComponentTransfer xmlns="http://www.w3.org/2000/svg">
                  <feFuncA type="linear" slope="0.2" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(5,-397.02499)">
              <path
                className="background"
                d="M 23.740374,504.26854 C 12.067324,494.12718 4.6867337,479.17383 4.6867337,462.49666 c 0,-30.54868 24.7645903,-55.31327 55.3132603,-55.31327 30.54868,0 55.313266,24.76459 55.313266,55.31327 0,16.69132 -7.39313,31.65589 -19.083366,41.79769"
                style={{
                  fill: 'none',
                  strokeWidth: 5,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeMiterlimit: 2,
                  strokeDasharray: 269,
                  strokeDashoffset: 0,
                  strokeOpacity: 1
                }}
              />
              <path
                className="bar"
                d="M 23.740374,504.26854 C 12.067324,494.12718 4.6867337,479.17383 4.6867337,462.49666 c 0,-30.54868 24.7610903,-55.31327 55.3132603,-55.31327 30.54868,0 55.313266,24.76459 55.313266,55.31327 0,16.69132 -7.39313,31.65589 -19.083366,41.79769"
                style={{
                  fill: 'none',
                  strokeWidth: 5,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeMiterlimit: 2,
                  strokeDasharray: 269,
                  strokeOpacity: 1
                }}
                data-percent={percentage}
              />
            </g>
          </svg>
        </div>

        <input
          type="number"
          id="percentage"
          onChange={e => this.setState({ percentage: e.target.value })}
          value={percentage}
        />
      </StyledPomodoro>
    );
  }
}

export default Pomodoro;
