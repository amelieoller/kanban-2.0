import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";

class CardModal extends Component {
  static propTypes = {
    card: PropTypes.shape({
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      color: PropTypes.string
    }).isRequired,
    listId: PropTypes.string.isRequired,
    cardElement: PropTypes.shape({
      getBoundingClientRect: PropTypes.func.isRequired
    }),
    categoryModalIsOpen: PropTypes.bool.isRequired,
    toggleCategoryModal: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isCategoryPickerOpen: false,
      isDifficultyPickerOpen: false,
      isTextareaFocused: true
    };
    if (typeof document !== "undefined") {
      Modal.setAppElement("#app");
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ newText: nextProps.card.text });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.submitCard();
    }
  };

  submitCard = () => {
    const { card, listId, dispatch, toggleCategoryModal } = this.props;
    if (newText === "") {
      this.deleteCard();
    } else if (newText !== card.text) {
      dispatch({
        type: "CHANGE_CARD_TEXT",
        payload: {
          cardText: newText,
          cardId: card._id,
          listId
        }
      });
    }
    toggleCategoryModal();
  };

  handleChange = e => {
    this.setState({ newText: e.target.value });
  };

  togglePicker = type => {
    const picker = `is${type}PickerOpen`;

    this.setState({
      [picker]: !this.state[picker]
    });
  };

  handleRequestClose = () => {
    const { isCategoryPickerOpen, isDifficultyPickerOpen } = this.state;
    const { toggleCategoryModal } = this.props;
    if (!isCategoryPickerOpen || !isDifficultyPickerOpen) {
      toggleCategoryModal();
    }
  };

  changeCategory = category => {
    const { dispatch, card } = this.props;

    if (card.category !== category) {
      if (category.color === "white") {
        dispatch({
          type: "DELETE_CATEGORY",
          payload: { cardId: card._id }
        });
      } else {
        dispatch({
          type: "CHANGE_CARD_CATEGORY",
          payload: { category, cardId: card._id }
        });
      }
    }
    this.props.toggleCategoryModal();
  };

  render() {
    const { newText } = this.state;
    const {
      cardElement,
      card,
      listId,
      categoryModalIsOpen,
      toggleCategoryModal
    } = this.props;
    if (!cardElement) {
      return null;
    }

    /*
    Create style of modal in order to not clip outside the edges no matter what device.
    */

    // Get dimensions of the card to calculate dimensions of cardModal.
    const boundingRect = cardElement.getBoundingClientRect();

    // Check if the display is so thin that we need to trigger a centered, vertical layout
    // DO NOT CHANGE the number 550 without also changing related media-query in CardOptions.scss
    const isThinDisplay = window.innerWidth < 550;

    // Position textarea at the same place as the card and position everything else away from closest edge
    const style = {
      content: {
        top: Math.min(
          boundingRect.bottom,
          window.innerHeight - boundingRect.height - 200
        ),
        left: boundingRect.left
      }
    };

    // For layouts that are less wide than 550px, let the modal take up the entire width at the top of the screen
    const mobileStyle = {
      content: {
        flexDirection: "column",
        top: 3,
        left: 3,
        right: 3
      }
    };

    return (
      <Modal
        isOpen={categoryModalIsOpen}
        onRequestClose={this.props.toggleCategoryModal}
        closeTimeoutMS={150}
        contentLabel="Card editor"
        overlayClassName="modal-underlay"
        className="modal"
        style={isThinDisplay ? mobileStyle : style}
        includeDefaultStyles={false}
        onClick={this.props.toggleCategoryModal}
      >
        {[
          { name: "", short: "", color: "white" },
          { name: "Flatiron", short: "//", color: "#32cefe" },
          { name: "Graphic", short: "GL", color: "#009ad0" },
          { name: "Kanban", short: "KB", color: "#EA725B" }
        ].map(category => (
          <button
            type="submit"
            key={category.name}
            style={{ background: category.color }}
            className="color-picker-color category-picker"
            onClick={() => this.changeCategory(category)}
          >
            {category.short}
          </button>
        ))}
      </Modal>
    );
  }
}

export default connect()(CardModal);
