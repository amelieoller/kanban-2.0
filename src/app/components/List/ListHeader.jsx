import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import { FiTrash2 } from "react-icons/fi";
import "./ListHeader.scss";

class ListTitle extends Component {
  static propTypes = {
    listTitle: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired,
    dragHandleProps: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.listTitle
    };
  }

  handleChange = e => {
    this.setState({ newTitle: e.target.value });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSubmit();
    } else if (e.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleSubmit = () => {
    const { newTitle } = this.state;
    const { listTitle, listId, dispatch } = this.props;
    if (newTitle === "") return;
    if (newTitle !== listTitle) {
      dispatch({
        type: "CHANGE_LIST_TITLE",
        payload: { listTitle: newTitle, listId }
      });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { listTitle } = this.props;
    this.setState({ newTitle: listTitle, isOpen: false });
  };

  deleteList = () => {
    const { listId, cards, boardId, dispatch } = this.props;
    dispatch({
      type: "DELETE_LIST",
      payload: { cards, listId, boardId }
    });
  };

  openTitleEditor = () => {
    this.setState({ isOpen: true });
  };

  handleButtonKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.openTitleEditor();
    }
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { dragHandleProps, listTitle } = this.props;
    return (
      <div className="list-header">
        {isOpen ? (
          <div className="list-title-textarea-wrapper">
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              value={newTitle}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              className="list-title-textarea"
              onBlur={this.handleSubmit}
              spellCheck={false}
            />
          </div>
        ) : (
          <div
            {...dragHandleProps}
            role="button"
            tabIndex={0}
            onClick={this.openTitleEditor}
            onKeyDown={event => {
              this.handleButtonKeyDown(event);
              dragHandleProps.onKeyDown(event);
            }}
            className="list-title-button"
          >
            {listTitle}
          </div>
        )}
        <Wrapper className="delete-list-wrapper" onSelection={this.deleteList}>
          <Button className="delete-list-button">
            <FiTrash2 />
          </Button>
          <Menu className="delete-list-menu">
            <div className="delete-list-header">Are you sure?</div>
            <MenuItem className="delete-list-confirm">Delete</MenuItem>
          </Menu>
        </Wrapper>
      </div>
    );
  }
}

export default connect()(ListTitle);
