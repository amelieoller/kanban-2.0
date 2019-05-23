import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FiUser, FiLogOut, FiLogIn } from 'react-icons/fi';
import styled from 'styled-components';
import kanbanLogo from '../../../assets/images/logo.png';
import kanbanLogoWhite from '../../../assets/images/logo-white.png';
import IconButton from '../Atoms/IconButton';
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
  background: ${props =>
    props.isHome ? 'rgba(0, 0, 0, 0.7)' : props.theme.colors.headerBackground};
  position: fixed;

  @media ${props => props.theme.media.tablet} {
    height: ${props => `${props.theme.sizes.headerHeightMobile}px`};
  }

  .header-title {
    display: inline-flex;
    align-items: center;
    color: ${props =>
      props.isHome ? '#EEEEEE' : props.theme.colors.headerText};
    font-size: 22px;
    font-weight: 100;
    text-decoration: none;
    font-family: 'Pacifico', cursive;
  }

  .header-title img {
    height: 25px;
  }

  .header-right-side {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    color: ${props =>
      props.isHome ? '#EEEEEE' : props.theme.colors.headerText};
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

  .user-thumbnail,
  .guest-icon {
    @media ${props => props.theme.media.tablet} {
      display: none;
    }
  }
`;

const Header = ({ user, homePage, boardColor }) => (
  <HeaderStyles isHome={homePage}>
    <Link to="/" className="header-title no-focus-mode">
      <img
        src={homePage || boardColor === 'light' ? kanbanLogoWhite : kanbanLogo}
        alt="Logo - Navigate Back to Board Overview"
      />
      &nbsp;Kanban 2.0
    </Link>
    <div className="header-right-side">
      {!homePage && <BoardHeader />}
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
        <IconButton
          onClick={() => (window.location.href = '/auth/signout')}
          className="no-focus-mode"
        >
          <FiLogOut />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => (window.location.href = '/')}
          className="no-focus-mode"
        >
          <FiLogIn />
          &nbsp;Sign in
        </IconButton>
      )}
    </div>
  </HeaderStyles>
);

Header.propTypes = {
  user: PropTypes.object,
  homePage: PropTypes.bool.isRequired,
  boardColor: PropTypes.string
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
