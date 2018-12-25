import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { withRouter } from "react-router-dom";
import kanbanLogo from "../../../assets/images/logo.png";
import BoardHeader from "../BoardHeader/BoardHeader";
import HeaderStyles from "../styles/HeaderStyles";
import HeaderButtonStyles from "../styles/HeaderButtonStyles";

class Header extends Component {
  static propTypes = { user: PropTypes.object };

  render = () => {
    const { user, homePage, changeTheme, setBoardColor } = this.props;

    return (
      <HeaderStyles>
        <Link to="/" className="header-title">
          <img src={kanbanLogo} alt="React Kanban logo" />
          &nbsp;Kanban 2.0
        </Link>
        <div className="header-right-side">
          {!homePage && (
            <BoardHeader
              changeTheme={changeTheme}
              setBoardColor={setBoardColor}
            />
          )}
          {user ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="user-thumbnail"
              title={user.name}
            />
          ) : (
            <FiUser className="guest-icon" />
          )}
          {user ? (
            <a href="/auth/signout">
              <HeaderButtonStyles>
                <FiLogOut />
              </HeaderButtonStyles>
            </a>
          ) : (
            <a href="/">
              <HeaderButtonStyles>
                <FiLogIn />
                &nbsp;Sign in
              </HeaderButtonStyles>
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
