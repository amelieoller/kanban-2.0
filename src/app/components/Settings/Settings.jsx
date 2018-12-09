import PropTypes from "prop-types";
import styled from "styled-components";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import slugify from "slugify";
import Categories from "../Categories/Categories";

const SettingsStyles = styled.div`
  background-color: ${props => props.theme.lightGrey};
  width: 100%;
  padding: 40px;
  button {
    padding: 5px 10px;
    color: ${props => props.theme.white};
    background: ${props => props.theme.grey};
    cursor: pointer;
    border-radius: ${props => props.theme.borderRadius};
  }
`;

class Settings extends Component {
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
      })}`
    );
  };

  render = () => (
    <SettingsStyles>
      <button onClick={this.handleSelection}>Back</button>
      <h1>Settings</h1>
			<Categories dispatch={this.props.dispatch} />
    </SettingsStyles>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
