import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";
import "./ListAdder.scss";

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
        <button
          type="submit"
          onClick={() => this.setState({ isOpen: true })}
          className="add-list-button"
        >
          Add a new list...
        </button>
      );
    }
    return (
      <div className="list">
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
      </div>
    );
  };
}

export default connect()(ListAdder);
