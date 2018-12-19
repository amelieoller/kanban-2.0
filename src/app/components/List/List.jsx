import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import styled from "styled-components";
import ListHeader from "./ListHeader";
import Cards from "./Cards";
import CardAdder from "../CardAdder/CardAdder";

const ListStyles = styled.span`
  .list-wrapper {
    display: inline-flex;
    flex-direction: column;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  .list {
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
    /* box-shadow: ${props => props.theme.bs}; */
    /* background: ${props => props.theme.mainBackground}; */
  }

  .list--drag {
    box-shadow: ${props => props.theme.bsDragging} !important;
  }

  .cards-wrapper {
    height: 100%;
    margin: 0 3px 6px 3px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .cards-wrapper::-webkit-scrollbar {
    width: 8px;
    border-radius: 2px;
    background-color: ${props => props.theme.transparentBlack};
  }

  .cards-wrapper::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: ${props => props.theme.transparentWhite};
  }

  .cards {
    min-height: 1px;
    margin-bottom: 3px;
  }
`;

class List extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    list: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    defaultCategory: PropTypes.string.isRequired
  };

  withinPomodoroTime = () => {
    const { cards, pomodoro } = this.props;

    let total = 0;
    const selectedCards = [];
    let time = 25;

    if (pomodoro.showDayPomo && pomodoro.pomodori) {
      time *= pomodoro.pomodori;
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const minutes = parseInt(card.minutes);

      if (minutes && card.minutes > time) {
        selectedCards.push(cards[0]._id);
        return selectedCards;
      }
      if (minutes && total + minutes <= time) {
        total += minutes;
        selectedCards.push(card._id);
      }
    }

    return selectedCards;
  };

  render = () => {
    const { list, boardId, index, categories, defaultCategory } = this.props;
    return (
      <ListStyles>
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
                      categories={categories}
                    />
                  </div>
                </div>
                <CardAdder
                  listId={list._id}
                  defaultCategory={defaultCategory}
                />
              </div>
              {provided.placeholder}
            </>
          )}
        </Draggable>
      </ListStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const cardIds = ownProps.list.cards;

  return {
    cards: cardIds
      .map(id => state.cardsById[id])
      .filter(card => card.active !== false),
    pomodoro: state.boardsById[ownProps.boardId].settings.pomodoro,
    categories: state.boardsById[ownProps.boardId].settings.categories,
    defaultCategory: state.boardsById[ownProps.boardId].settings.defaultCategory
  };
};

export default connect(mapStateToProps)(List);
