import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const shuffleOne = keyframes`
	0% {
		transform: translateX(20px);
	}
   
	50% {
		transform: translateX(-20px);
	}
	
	100% {
		transform: translateX(20px);
		z-index: 200;
	}
`;

const shuffleTwo = keyframes`
	0% {
		transform: translateX(-20px);
		z-index: 200;
	}

	50% {
		transform: translateX(20px);
	}

	100% {
		transform: translateX(-20px);
	}
`;

const LoadingStyles = styled.div`
  margin: 20px auto;

  h1 {
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 200;
    text-align: center;
  }

  span {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -10px;
  }

  span:nth-child(2) {
    background: ${props => props.theme.colors.primary};
    animation: ${shuffleTwo} 1.2s infinite linear;
  }

  span:nth-child(3) {
    background: ${props => props.theme.colors.neutral};
    z-index: 100;
  }

  span:nth-child(4) {
    background: ${props => props.theme.colors.success};
    animation: ${shuffleOne} 1.2s infinite linear;
  }
`;

const Loading = ({ text }) => (
  <LoadingStyles>
    <h1>{text}</h1>
    <span />
    <span />
    <span />
  </LoadingStyles>
);

Loading.defaultProps = {
  text: 'Loading'
};

Loading.propTypes = {
  text: PropTypes.string
};

export default Loading;
