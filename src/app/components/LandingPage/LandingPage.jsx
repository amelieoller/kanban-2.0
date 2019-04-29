import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Title } from "react-head";
import { FiUser, FiGithub } from "react-icons/fi";
import styled from "styled-components";
import googleLogo from "../../../assets/images/google-logo.svg";
import GoogleAuth from "../../../server/googleAuth";

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
      font-family: "Pacifico";
      color: ${props => props.theme.colors.mainAccent};
      font-size: 30px;
    }

    .signin-buttons {
      display: flex;
      justify-content: space-between;
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

        &:focus,
        &:hover {
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
        font-family: "Roboto", arial, sans-serif;
      }
    }
  }

  .image-area {
    background-image: url("https://images.unsplash.com/photo-1471455558438-c1e9d5854d85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
    background-size: cover;
    background-position: center;

    .github-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 10px 15px;
      font-size: 25px;

      svg {
        stroke: ${props => props.theme.colors.white};
        transition: stroke 0.28s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          stroke: ${props => props.theme.colors.mainAccent};
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

class LandingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  enterAsGuest = () => {
    const { dispatch } = this.props;
    dispatch({ type: "ENTER_AS_GUEST" });
  };

  render = () => (
    <LandingPageStyles>
      <Title>Sign in | React Kanban</Title>
      <div className="login-area">
        <h1 className="landing-page-heading">Kanban 2.0</h1>
        <div className="signin-buttons">
          <GoogleAuth />
          {/* <a href="/auth/google" className="google-button">
            <img className="button-icon" src={googleLogo} alt="google logo" />
            <span className="button-text">Sign in with Google</span>
          </a> */}
          <button
            type="submit"
            onClick={this.enterAsGuest}
            className="guest-button"
          >
            <FiUser className="button-icon" />
            <span className="button-text">Sign in as Guest</span>
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
}

export default connect()(LandingPage);
