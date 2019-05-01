import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";
import styled from "styled-components";
import ClickOutside from "./ClickOutside/ClickOutside";

const CardAdderStyles = styled.div`
  .card-adder-textarea-wrapper {
    margin-top: 6px;
  }

  .card-adder-textarea {
    float: right;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 8px;
    border: 0;
    border-radius: 3px;
    color: inherit;
    font-family: inherit;
    font-size: 15px;
    resize: none;
  }

  .add-card-button {
    align-self: center;
    flex-shrink: 0;
    width: 100%;
    height: 39px;
    margin-top: 6px;
    border: none;
    border-radius: ${props => props.theme.sizes.borderRadius};
    color: ${props => props.theme.colors.backgroundAccent};
    background: transparent;
    font-size: 28px;
    transition: background 0.1s;
    cursor: pointer;
  }

  .add-card-button:hover,
  .add-card-button:focus {
    color: ${props => props.theme.colors.cardButtonHover};
  }
`;

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
    const { listId, dispatch, defaultCategory } = this.props;
    if (newText === "") return;

    const cardId = shortid.generate();
    const createdAt = Date.now();
    const categoryId = defaultCategory;

    dispatch({
      type: "ADD_CARD",
      payload: { cardText: newText, cardId, listId, createdAt, categoryId }
    });
    this.setState({ newText: "" });

    console.log("If you're getting an error here it has to do with LastPass.")
  };

  render() {
    const { newText, isOpen } = this.state;
    return (
      <CardAdderStyles>
        {isOpen ? (
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
        )}
      </CardAdderStyles>
    );
  }
}

export default connect()(CardAdder);
