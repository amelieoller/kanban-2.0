import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import ListHeader from "./ListHeader";
import Cards from "./Cards";
import CardAdder from "../CardAdder/CardAdder";
import "./List.scss";

class List extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    list: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired
  };

  withinPomodoroTime = () => {
    const { cards } = this.props;

    let total = 0;
    const selectedCards = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const minutes = parseInt(card.minutes);
      if (total + minutes <= 25 && minutes) {
        total += minutes;
        selectedCards.push(card._id);
      }
    }

    return selectedCards;
  };

  render = () => {
    const { list, boardId, index } = this.props;
    return (
      <Draggable
        draggableId={list._id}
        index={index}
        disableInteractiveElementBlocking
      >
        {(provided, snapshot) => (
          <>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="list-wrapper"
            >
              <div
                className={classnames("list", {
                  "list--drag": snapshot.isDragging
                })}
              >
                <ListHeader
                  dragHandleProps={provided.dragHandleProps}
                  listTitle={list.title}
                  listId={list._id}
                  cards={list.cards}
                  boardId={boardId}
                />
                <div className="cards-wrapper">
                  <Cards
                    listId={list._id}
                    withinPomodoroCards={this.withinPomodoroTime()}
                  />
                </div>
              </div>
              <CardAdder listId={list._id} />
            </div>
            {provided.placeholder}
          </>
        )}
      </Draggable>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const cardIds = ownProps.list.cards;

  return {
    cards: cardIds
      .map(id => state.cardsById[id])
      .filter(card => !card.hasOwnProperty("active") || card.active === true)
  };
};

export default connect(mapStateToProps)(List);
