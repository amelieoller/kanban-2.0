import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FiSettings } from "react-icons/fi";
import slugify from "slugify";
import HeaderButtonStyles from "../styles/HeaderButtonStyles";

class BoardSettings extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ boardId: PropTypes.string })
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleSelection = () => {
    const { match, history, boardTitle } = this.props;
    const { boardId } = match.params;

    history.push(
      `/b/${boardId}/${slugify(boardTitle, {
        lower: true
      })}/settings`
    );
  };

  render = () => (
    <HeaderButtonStyles onClick={this.handleSelection}>
      <div className="modal-icon">
        <FiSettings />
      </div>
    </HeaderButtonStyles>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title
  };
};

export default withRouter(connect(mapStateToProps)(BoardSettings));
