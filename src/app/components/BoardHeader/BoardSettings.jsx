import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import { FiSettings } from "react-icons/fi";
import styled from "styled-components";
import slugify from "slugify";

const BoardSettingsStyles = styled.button`
  color: ${props => props.theme.white};
  background: transparent;
  cursor: pointer;
  padding: 8px 10px 8px 10px;
  border-radius: 3px;
  transition: background 0.1s;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

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
    <BoardSettingsStyles onClick={this.handleSelection}>
      <div className="modal-icon">
        <FiSettings />
      </div>
    </BoardSettingsStyles>
  );
}

const mapStateToProps = (state, ownProps) => {
	const { boardId } = ownProps.match.params;
	return {
		boardTitle: state.boardsById[boardId].title
	};
};

export default withRouter(connect(mapStateToProps)(BoardSettings));
