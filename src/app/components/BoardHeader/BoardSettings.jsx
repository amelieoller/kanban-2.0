import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FiSettings } from 'react-icons/fi';
import SlideOutMenu from '../Settings/SlideOutMenu';
import HeaderButtonStyles from '../styles/HeaderButtonStyles';
import Settings from '../Settings/Settings';

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
      <SlideOutMenu
        isOpen={this.state.menuOpen}
        closeCallback={this.closeMenu}
        right
        width={350}
      >
        <Settings closeMenu={this.closeMenu} listsById={this.props.listsById} />
      </SlideOutMenu>
      <HeaderButtonStyles onClick={this.openMenu} className="no-focus-mode">
        <FiSettings />
      </HeaderButtonStyles>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;

  return {
    boardTitle: state.boardsById[boardId].title,
    listsById: state.listsById,
  };
};

export default withRouter(connect(mapStateToProps)(BoardSettings));
