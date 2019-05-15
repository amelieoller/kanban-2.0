import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FiUser, FiLogOut, FiLogIn } from 'react-icons/fi';
import styled from 'styled-components';
import kanbanLogo from '../../../assets/images/logo.png';
import HeaderButtonStyles from '../styles/HeaderButtonStyles';
import BoardHeader from './BoardHeader';

const HeaderStyles = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100vw;
  height: ${props => `${props.theme.sizes.headerHeight}px`};
  padding: 5px;
  z-index: 2;
  transition: background 0.3s;
  box-shadow: ${props => props.theme.common.boxShadowThree};
  background: ${props => props.theme.colors.headerBackground};
  position: fixed;

  .header-title {
    display: inline-flex;
    align-items: center;
    color: white;
    font-size: 22px;
    font-weight: 100;
    text-decoration: none;
    font-family: 'Pacifico', cursive;

    @media ${props => props.theme.media.tablet} {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .header-title img {
    height: 30px;
  }

  .header-right-side {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    color: white;
  }

  .user-thumbnail {
    height: 100%;
    border-radius: ${props => props.theme.sizes.borderRadius};
    margin: 0 6px;
  }

  .guest-icon {
    padding-top: 2px;
    font-size: 24px;
  }

  .signout-link {
    padding: 3px 5px 1px 5px;
    margin-left: 12px;
    color: white;
    text-decoration: none;
  }

  .signout-link:focus,
  .signout-link:hover {
    color: ${props => props.theme.colors.transparentBlack};
  }

  .signout-icon {
    padding-bottom: 2px;
    font-size: 22px;
  }

  .user-thumbnail,
  .guest-icon {
    @media ${props => props.theme.media.tablet} {
      display: none;
    }
  }

  .signout-link {
    @media ${props => props.theme.media.tablet} {
      margin-left: 0px;
    }
  }
`;

const Header = ({
  user,
  homePage,
  changeTheme,
  setBoardColor,
  focusMode,
  changeFocusMode
}) => (
  <HeaderStyles>
    <Link to="/" className="header-title no-focus-mode">
      <img src={kanbanLogo} alt="Logo - Navigate Back to Board Overview" />
      &nbsp;Kanban 2.0
    </Link>
    <div className="header-right-side">
      {!homePage && (
        <BoardHeader
          changeTheme={changeTheme}
          setBoardColor={setBoardColor}
          focusMode={focusMode}
          changeFocusMode={changeFocusMode}
        />
      )}
      {user ? (
        <img
          src={user.imageUrl}
          alt={user.name}
          className="user-thumbnail no-focus-mode"
          title={user.name}
        />
      ) : (
        <FiUser className="guest-icon no-focus-mode" />
      )}
      {user ? (
        <a href="/auth/signout" className="no-focus-mode">
          <HeaderButtonStyles>
            <FiLogOut />
          </HeaderButtonStyles>
        </a>
      ) : (
        <a href="/" className="no-focus-mode">
          <HeaderButtonStyles>
            <FiLogIn />
            &nbsp;Sign in
          </HeaderButtonStyles>
        </a>
      )}
    </div>
  </HeaderStyles>
);

Header.propTypes = {
  user: PropTypes.object,
  homePage: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func,
  setBoardColor: PropTypes.func,
  focusMode: PropTypes.bool,
  changeFocusMode: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  const { params } = ownProps.match;
  const homePage =
    Object.keys(params).length === 0 && params.constructor === Object;

  return {
    user,
    homePage
  };
};

export default withRouter(connect(mapStateToProps)(Header));
