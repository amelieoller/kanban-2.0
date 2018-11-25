import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FaUserSecret from "react-icons/lib/fa/user-secret";
import FaSignOut from "react-icons/lib/fa/sign-out";
import FaSignIn from "react-icons/lib/fa/sign-in";
import kanbanLogo from "../../../assets/images/logo.png";
import BoardHeader from "../BoardHeader/BoardHeader";
import { withRouter } from "react-router-dom";
import HeaderStyles from "../styles/HeaderStyles";

class Header extends Component {
  static propTypes = { user: PropTypes.object };

  render = () => {
    const { user, homePage } = this.props;

    return (
      <HeaderStyles>
        <Link to="/" className="header-title">
          <img src={kanbanLogo} alt="React Kanban logo" />
          &nbsp;Kanban 2.0
        </Link>
        <div className="header-right-side">
          {!homePage && <BoardHeader />}
          {user ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="user-thumbnail"
              title={user.name}
            />
          ) : (
            <FaUserSecret className="guest-icon" />
          )}
          {user ? (
            <a className="signout-link" href="/auth/signout">
              <FaSignOut className="signout-icon" />
            </a>
          ) : (
            <a className="signout-link" href="/">
              <FaSignIn className="signout-icon" />
              &nbsp;Sign in
            </a>
          )}
        </div>
      </HeaderStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const params = ownProps.match.params;
  return {
    user: state.user,
    homePage: Object.keys(params).length === 0 && params.constructor === Object
  };
};

export default withRouter(connect(mapStateToProps)(Header));
