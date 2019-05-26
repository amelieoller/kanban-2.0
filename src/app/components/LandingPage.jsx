import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from 'react-head';
import { FiUser, FiGithub } from 'react-icons/fi';
import styled from 'styled-components';
import googleLogo from '../../assets/images/google-logo.svg';
import backgroundImageLarge from '../../assets/images/background-image-large.jpg';
import backgroundImageSmall from '../../assets/images/background-image-small.jpg';

const LandingPageStyles = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 35% auto;

  .login-area {
    padding: 15vh 30px 42vh 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .landing-page-heading {
      font-family: 'Pacifico';
      color: ${props => props.theme.colors.primary};
      font-size: 30px;
    }

    .signin-buttons {
      display: flex;
      /* justify-content: space-between; */
      max-width: 400px;
      flex-wrap: wrap;

      button,
      a {
        height: 40px;
        border-width: 0;
        background: white;
        color: #737373;
        border-radius: 5px;
        white-space: nowrap;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
          0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        padding: 0;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        margin-right: 10px;

        &:hover,
        &:focus {
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
            0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
          background: ${props => props.theme.colors.lightestGrey};
        }

        &:active {
          background-color: #e5e5e5;
          box-shadow: none;
          transition-duration: 10ms;
        }
      }

      .button-icon {
        display: inline-block;
        vertical-align: middle;
        margin: 8px 0 8px 8px;
        width: 18px;
        height: 18px;
        box-sizing: border-box;
      }

      .button-text {
        display: inline-block;
        vertical-align: middle;
        padding: 0 24px;
        font-size: 14px;
        font-weight: bold;
        font-family: 'Roboto', arial, sans-serif;
      }
    }
  }

  .image-area {
    background-image: url(${backgroundImageLarge});
    background-size: cover;
    background-position: 55% 100%;

    @media ${props => props.theme.media.tablet} {
      background-image: url(${backgroundImageSmall});
    }

    .github-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 10px 15px;
      font-size: 25px;

      svg {
        stroke: ${props => props.theme.colors.white};
        transition: stroke 0.28s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover,
        &:focus {
          stroke: ${props => props.theme.colors.primary};
        }
      }
    }
  }

  @media ${props => props.theme.media.tablet} {
    grid-template-columns: auto;
    grid-template-rows: 50% auto;
    .login-area {
      padding: 50px 30px;
      justify-content: flex-start;
    }
  }
`;

const LandingPage = ({ dispatch }) => (
  <LandingPageStyles>
    <Title>Sign in | React Kanban</Title>
    <div className="login-area">
      <h1 className="landing-page-heading">Kanban 2.0</h1>
      <div className="signin-buttons">
        <a href="/auth/google" className="google-button">
          <img className="button-icon" src={googleLogo} alt="google logo" />
          <span className="button-text">Sign in with Google</span>
        </a>
        <button
          type="submit"
          onClick={() => dispatch({ type: 'ENTER_AS_GUEST' })}
          className="guest-button"
        >
          <FiUser className="button-icon" />
          <span className="button-text">Try It Out</span>
        </button>
      </div>
    </div>
    <div className="image-area">
      <a
        href="https://github.com/amelieoller/kanban-2.0"
        target="_blank"
        rel="noopener noreferrer"
        className="github-icon"
      >
        <FiGithub />
      </a>
    </div>
  </LandingPageStyles>
);

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(LandingPage);
