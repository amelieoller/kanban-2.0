import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

function createCSS() {
  let styles = '';

  for (let i = 0; i < 35; i += 1) {
    styles += `
			@keyframes particles-${i} {
				from {
					transform: scale(1);
					visibility: visible;
				}
				to {
					left: ${Math.random() * 500 - 250 + 0}px;
					top: ${Math.random() * 500 - 250 + 0}px;
					transform: scale(0);
					visibility: hidden;
				}
			}

			&.active .hero-btn .particles-circle:nth-of-type(${i}) {
				animation: particles-${i} 1.5s ${i / 40 + 0}s;
			}
		`;
  }

  return css`
    ${styles}
  `;
}

const StyledButtonBubbles = styled.div`
  display: inline-block;

  .hero-btn {
    position: relative;
    width: 100%;
    margin: auto;
    height: 100%;

    .btn {
      background-color: ${props => props.theme.colors.primary};
      color: #fff;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      cursor: pointer;
      transform: perspective(600px) rotateX(0deg) scale(1);
      -o-transition: all 0.2s linear;
      transition: all 0.2s linear;
      font-family: 'Roboto', sans-serif;
      padding: 2px 3px;
      font-weight: 600;
      font-size: 13px;
      display: inline-block;
      vertical-align: top;
    }
  }

  .hero-btn .particles-circle {
    position: absolute;
    background-color: ${props => props.theme.colors.primary};
    width: 20px;
    height: 20px;
    top: 0px;
    left: 80%;
    margin-left: -15px;
    z-index: -1;
    border-radius: 50%;
    transform: scale(0);
    visibility: hidden;
  }

  .hero-btn .particles-circle:nth-of-type(odd) {
    border: solid 2px ${props => props.theme.colors.primary};
    background-color: transparent;
  }

  ${createCSS()}

  .wrap__sparks {
    transform: translateZ(-100px);
  }
`;

const ButtonBubbles = ({ count }) => {
  const [isActive, setIsActive] = useState(false);
  const [taskCount, setTaskCount] = useState(count);

  useEffect(() => {
    setTaskCount(count);

    if (!isActive && count > taskCount) {
      setIsActive(true);

      setTimeout(function() {
        setIsActive(false);
      }, 2000);
    }
  }, [count]);

  return (
    <StyledButtonBubbles className={isActive ? 'active' : ''}>
      <div className="hero-btn">
        <button className="btn">{taskCount}</button>
        {[...Array(35)].map((e, i) => (
          <span key={i} className="particles-circle" />
        ))}
      </div>
    </StyledButtonBubbles>
  );
};

export default ButtonBubbles;
