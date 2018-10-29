import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";
import ClickOutside from "../ClickOutside/ClickOutside";
import "./CardAdder.scss";

class CardAdder extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      newText: "",
      isOpen: false
    };
  }

  toggleCardComposer = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleChange = e => {
    this.setState({ newText: e.target.value });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.handleSubmit(e);
    } else if (e.keyCode === 27) {
      this.toggleCardComposer();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newText } = this.state;
    const { listId, dispatch } = this.props;
    if (newText === "") return;

    const cardId = shortid.generate();
    const createdAt = Date.now();
    dispatch({
      type: "ADD_CARD",
      payload: { cardText: newText, cardId, listId, createdAt }
    });
    this.setState({ newText: "" });
  };

  render() {
    const { newText, isOpen } = this.state;
    return isOpen ? (
      <ClickOutside handleClickOutside={this.toggleCardComposer}>
        <form
          onSubmit={this.handleSubmit}
          className="card-adder-textarea-wrapper"
        >
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            minRows={1}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={newText}
            className="card-adder-textarea"
            placeholder="Add a new card..."
            spellCheck={false}
            onBlur={this.toggleCardComposer}
          />
        </form>
      </ClickOutside>
    ) : (
      <button
        type="submit"
        onClick={this.toggleCardComposer}
        className="add-card-button"
      >
        +
      </button>
    );
  }
}

export default connect()(CardAdder);
