import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FiSettings } from "react-icons/fi";
import CheeseburgerMenu from "../Settings/CheeseburgerMenu";
import HeaderButtonStyles from "../styles/HeaderButtonStyles";
import Settings from "../Settings/Settings";

class BoardSettings extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ boardId: PropTypes.string })
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  render = () => (
    <>
      <CheeseburgerMenu
        isOpen={this.state.menuOpen}
        closeCallback={this.closeMenu}
        right
        width={350}
      >
        <Settings closeMenu={this.closeMenu} />
      </CheeseburgerMenu>
      <HeaderButtonStyles onClick={this.openMenu}>
        <FiSettings />
      </HeaderButtonStyles>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title
  };
};

export default withRouter(connect(mapStateToProps)(BoardSettings));
