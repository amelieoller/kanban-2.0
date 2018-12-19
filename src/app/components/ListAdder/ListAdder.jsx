import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";
import styled from "styled-components";

const ListAdderButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  width: ${props => props.theme.listWidth};
  margin: 0 5px 0 5px;
  padding: 10px;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.backgroundAccent};
  background: rgba(0, 0, 0, 0.15);
  font-size: 14px;
  transition: background 0.2s;
  user-select: none;
  cursor: pointer;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.25);
  }
`;

const ListAdderTextArea = styled.div`
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  width: ${props => props.theme.listWidth};
  min-height: 0px;
  max-height: 100%;
  margin: 0 5px 0 5px;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 14px;
  transition: box-shadow 0.15s, background 0.3s;
  box-shadow: ${props => props.theme.bs};

  .list-adder-textarea {
    float: left;
    box-sizing: border-box;
    width: 100%;
    padding: 6px 10px;
    border: 0;
    border-radius: 3px;
    color: ${props => props.theme.text};
    font-family: inherit;
    font-size: 18px;
    font-weight: 700;
    overflow: hidden;
    resize: none;
  }
`;

class ListAdder extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      isOpen: false,
      listTitle: ""
    };
  }

  handleBlur = () => {
    this.setState({ isOpen: false });
  };

  handleChange = e => {
    this.setState({ listTitle: e.target.value });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSubmit();
    } else if (e.keyCode === 27) {
      this.setState({ isOpen: false, listTitle: "" });
    }
  };

  handleSubmit = () => {
    const { dispatch, boardId } = this.props;
    const { listTitle } = this.state;
    const listId = shortid.generate();
    if (listTitle === "") return;
    dispatch({
      type: "ADD_LIST",
      payload: { listTitle, listId, boardId }
    });
    this.setState({ isOpen: false, listTitle: "" });
  };

  render = () => {
    const { isOpen, listTitle } = this.state;
    if (!isOpen) {
      return (
        <ListAdderButton
          type="submit"
          onClick={() => this.setState({ isOpen: true })}
        >
          Add a new list...
        </ListAdderButton>
      );
    }
    return (
      <ListAdderTextArea>
        <Textarea
          autoFocus
          useCacheForDOMMeasurements
          value={listTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="list-adder-textarea"
          onBlur={this.handleBlur}
          spellCheck={false}
        />
      </ListAdderTextArea>
    );
  };
}

export default connect()(ListAdder);
