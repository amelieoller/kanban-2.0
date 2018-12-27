import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const BoardTitleInput = styled.input`
  width: 100%;
  padding: 6px 10px 6px 10px;
  border: 0;
  color: inherit;
  background: inherit;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
`;

const BoardTitleButton = styled.button`
  display: flex;
  min-width: 0;
  padding: 6px 10px 6px 10px;
  border: 0;
  border-radius: 3px;
  background: transparent;
  transition: background 0.1s;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.transparentBlack};
  }

  @media ${props => props.theme.media.tablet} {
    display: none;
  }

  .board-title-text {
    margin: 0;
    color: ${props => props.theme.colors.white};
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    white-space: nowrap;
    font-weight: 300;
  }
`;

class BoardTitle extends Component {
  static propTypes = {
    boardTitle: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.boardTitle
    };
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleChange = e => {
    this.setState({ newTitle: e.target.value });
  };

  submitTitle = () => {
    const { dispatch, boardId, boardTitle } = this.props;
    const { newTitle } = this.state;
    if (newTitle === "") return;
    if (boardTitle !== newTitle) {
      dispatch({
        type: "CHANGE_BOARD_TITLE",
        payload: {
          boardTitle: newTitle,
          boardId
        }
      });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { boardTitle } = this.props;
    this.setState({ newTitle: boardTitle, isOpen: false });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.submitTitle();
    } else if (e.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleFocus = e => {
    e.target.select();
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { boardTitle } = this.props;
    return isOpen ? (
      <BoardTitleInput
        autoFocus
        value={newTitle}
        type="text"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        onBlur={this.revertTitle}
        onFocus={this.handleFocus}
        spellCheck={false}
      />
    ) : (
      <BoardTitleButton type="submit" onClick={this.handleClick}>
        <h1 className="board-title-text">{boardTitle}</h1>
      </BoardTitleButton>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    boardId
  };
};

export default withRouter(connect(mapStateToProps)(BoardTitle));
