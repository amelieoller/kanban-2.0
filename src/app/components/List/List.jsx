import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import styled from 'styled-components';
import ListHeader from './ListHeader';
import Cards from './Cards';
import CardAdder from '../CardAdder';

const ListStyles = styled.div`
  display: inline-flex;
  flex-direction: column;
  user-select: none;
  scroll-snap-align: center;
  margin: 10px 0;

  .list {
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: 0px;
    max-height: 100%;
    border-radius: ${props => props.theme.sizes.borderRadius};
    font-size: 14px;
    transition: box-shadow 0.15s, background 0.3s;
    background: ${props => props.theme.colors.listBackground};
    padding: 6px;

    @media ${props => props.theme.media.tablet} {
      max-height: calc(100vh - 310px);
    }
  }

  .list--drag {
    box-shadow: ${props => props.theme.common.bsDragging} !important;
  }

  .cards-wrapper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
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
      <Draggable
        draggableId={list._id}
        index={index}
        disableInteractiveElementBlocking
      >
        {(provided, snapshot) => (
          <>
            <ListStyles
              ref={provided.innerRef}
              {...provided.draggableProps}
              className={`no-focus-mode ${list._id}`}
              name={list._id}
            >
              <div
                className={classnames('list', {
                  'list--drag': snapshot.isDragging
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
                    categories={categories}
                    withinPomodoroCards={this.withinPomodoroTime()}
                  />
                </div>
              </div>
              <CardAdder listId={list._id} defaultCategory={defaultCategory} />
            </ListStyles>
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
      .filter(card => card.active !== false),
    pomodoro: state.boardsById[ownProps.boardId].settings.pomodoro,
    categories: state.boardsById[ownProps.boardId].settings.categories,
    defaultCategory: state.boardsById[ownProps.boardId].settings.defaultCategory
  };
};

export default connect(mapStateToProps)(List);
