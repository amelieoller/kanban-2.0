import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';

class Cards extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired,
    withinPomodoroCards: PropTypes.array,
    categories: PropTypes.array.isRequired,
    boardId: PropTypes.string.isRequired
  };

  componentDidUpdate = prevProps => {
    // Scroll to bottom of list if a new card has been added
    const { cards } = this.props;
    if (
      cards.length !== 0 &&
      cards[cards.length - 2] === prevProps.cards[prevProps.cards.length - 1]
    ) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    this.listEnd.scrollIntoView();
  };

  render() {
    const {
      listId,
      cards,
      categories,
      withinPomodoroCards,
      boardId,
      completedListId
    } = this.props;

    return (
      <Droppable droppableId={listId}>
        {(provided, { isDraggingOver }) => (
          <>
            <div className="cards" ref={provided.innerRef}>
              {cards.map((cardId, index) => (
                <Card
                  isDraggingOver={isDraggingOver}
                  key={cardId}
                  cardId={cardId}
                  index={index}
                  listId={listId}
                  withinPomodoroCard={withinPomodoroCards.includes(cardId)}
                  categories={categories}
                  boardId={boardId}
                  completedListId={completedListId}
                />
              ))}
              {provided.placeholder}
              <div
                style={{ float: 'left', clear: 'both' }}
                ref={el => {
                  this.listEnd = el;
                }}
              />
            </div>
          </>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cards: state.listsById[ownProps.listId].cards,
  boardId: ownProps.boardId,
  completedListId: state.boardsById[ownProps.boardId].settings.completedListId
});

export default connect(mapStateToProps)(Cards);
