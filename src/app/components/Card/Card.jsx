import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import { MdDone } from "react-icons/lib/md";
import later from "later";
import CardModal from "../CardModal/CardModal";
import CardBadges from "../CardBadges/CardBadges";
import { findCheckboxes } from "../utils";
import formatMarkdown from "./formatMarkdown";
import CategoryModal from "../CardModal/CategoryModal";
import CardStyles from "../styles/CardStyles";

class Card extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string
      })
    }).isRequired,
    listId: PropTypes.string.isRequired,
    isDraggingOver: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      categoryModalIsOpen: false
    };
  }

  toggleCardEditor = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  toggleCategoryModal = () => {
    const { categoryModalIsOpen } = this.state;
    this.setState({ categoryModalIsOpen: !categoryModalIsOpen });
  };

  handleClick = e => {
    const { tagName, checked, id } = e.target;
    if (tagName.toLowerCase() === "input") {
      // The id is a string that describes which number in the order of checkboxes this particular checkbox has
      this.toggleCheckbox(checked, parseInt(id, 10));
    } else if (
      tagName.toLowerCase() !== "a" &&
      !e.target.classList.contains("badge")
    ) {
      this.toggleCardEditor(e);
    }
  };

  handleKeyDown = e => {
    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (e.keyCode === 13 && e.target.tagName.toLowerCase() !== "a") {
      e.preventDefault();
      this.toggleCardEditor();
    }
  };

  // identify the clicked checkbox by its index and give it a new checked attribute
  toggleCheckbox = (checked, i) => {
    const { card, dispatch } = this.props;

    let j = 0;
    const newText = card.text.replace(/\[(\s|x)\]/g, match => {
      let newString;
      if (i === j) {
        newString = checked ? "[x]" : "[ ]";
      } else {
        newString = match;
      }
      j += 1;
      return newString;
    });

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: newText }
    });
  };

  completeCard = () => {
    const { dispatch, listId, card } = this.props;

    if (card.schedule) {
      const nextDate = later.schedule(card.schedule).next();

      dispatch({
        type: "CHANGE_CARD_SCHEDULE",
        payload: { cardId: card._id, nextDate }
      });
    } else {
      const completedAt = Date.now();

      dispatch({
        type: "CHANGE_CARD_COMPLETED_AT",
        payload: { cardId: card._id, completedAt }
      });

      dispatch({
        type: "COMPLETE_CARD",
        payload: { cardId: card._id, listId }
      });
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
    this.toggleCategoryModal();
  };

  render() {
    const {
      card,
      index,
      listId,
      isDraggingOver,
      withinPomodoroCard
    } = this.props;
    const { isModalOpen, categoryModalIsOpen } = this.state;
    const checkboxes = findCheckboxes(card.text);

    return (
      <CardStyles>
        {card.active !== false && (
          <>
            <Draggable draggableId={card._id} index={index}>
              {(provided, snapshot) => (
                <>
                  <div
                    className={classnames(
                      `difficulty-${card.difficulty}`,
                      "card-title",
                      {
                        "card-title--drag": snapshot.isDragging
                      },
                      withinPomodoroCard && "within-pomodoro"
                    )}
                    ref={ref => {
                      provided.innerRef(ref);
                      this.ref = ref;
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={event => {
                      provided.dragHandleProps.onClick(event);
                      this.handleClick(event);
                    }}
                    onKeyDown={event => {
                      provided.dragHandleProps.onKeyDown(event);
                      this.handleKeyDown(event);
                    }}
                    style={{
                      ...provided.draggableProps.style
                    }}
                  >
                    <div className="card-title-top">
                      <div
                        className="card-title-html"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(card.text)
                        }}
                      />
                      <div className="checkmark" onClick={this.completeCard}>
                        <MdDone />
                      </div>
                    </div>
                    {(card.date ||
                      checkboxes.total > 0 ||
                      card.minutes ||
                      card.category) && (
                      <CardBadges
                        date={card.date}
                        checkboxes={checkboxes}
                        minutes={card.minutes}
                        category={card.category}
                        toggleCategoryModal={this.toggleCategoryModal}
                      />
                    )}
                  </div>
                  {/* Remove placeholder when not dragging over to reduce snapping */}
                  {isDraggingOver && provided.placeholder}
                </>
              )}
            </Draggable>
            <CategoryModal
              categoryModalIsOpen={categoryModalIsOpen}
              cardElement={this.ref}
              card={card}
              listId={listId}
              toggleCategoryModal={this.toggleCategoryModal}
            />
            <CardModal
              isOpen={isModalOpen}
              cardElement={this.ref}
              card={card}
              listId={listId}
              toggleCardEditor={this.toggleCardEditor}
            />
          </>
        )}
      </CardStyles>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
