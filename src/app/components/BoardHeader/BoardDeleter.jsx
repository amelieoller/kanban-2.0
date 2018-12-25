import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import ToolTip from "../ToolTip/ToolTip";
import HeaderButtonStyles from "../styles/HeaderButtonStyles";

class BoardDeleter extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ boardId: PropTypes.string })
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleSelection = () => {
    const { dispatch, match, history } = this.props;
    const { boardId } = match.params;
    dispatch({ type: "DELETE_BOARD", payload: { boardId } });
    history.push("/");
  };

  render = () => (
    <ToolTip
      message="Are you sure?"
      button={<button onClick={this.handleSelection}>Delete</button>}
    >
      <HeaderButtonStyles>
        <FiTrash2 />
      </HeaderButtonStyles>
    </ToolTip>
  );
}

export default withRouter(connect()(BoardDeleter));
