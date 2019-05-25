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
  margin: 15px 0;
  width: ${props => props.theme.sizes.listWidth};

  .list {
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: 0px;
    max-height: 100%;
    border-radius: ${props => props.theme.sizes.borderRadius};
    font-size: 14px;
    transition: box-shadow 0.15s, background 0.3s;
    background: ${props => props.theme.colors.elevatedOne};
    box-shadow: ${props => props.theme.common.boxShadowOne};

    @media ${props => props.theme.media.tablet} {
      max-height: calc(100vh - 310px);
    }

    @media ${props => props.theme.media.phone} {
      max-height: ${props =>
        props.isKeyboardOpen ? 'calc(100vh - 40px)' : 'calc(100vh - 380px)'};
    }
  }

  .list--drag {
    box-shadow: ${props => props.theme.common.boxShadowThree} !important;
  }

  .cards {
    min-height: 1px;
    height: 100%;
    padding: 0 5px;
    overflow: scroll;
  }
`;

class List extends Component {
  static propTypes = {
    boardId: PropTypes.string,
    index: PropTypes.number.isRequired,
    list: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    defaultCategory: PropTypes.string.isRequired,
    cards: PropTypes.array,
    pomodoro: PropTypes.object,
    categories: PropTypes.array,
    defaultList: PropTypes.string,
    defaultCardTime: PropTypes.number,
    isKeyboardOpen: PropTypes.bool,
    openCardAdder: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  withinPomodoroTime = () => {
    const { cards, pomodoro } = this.props;

    let total = 0;
    const selectedCards = [];
    let time = 25;

    if (pomodoro.showDayPomo && pomodoro.pomodori) {
      time *= pomodoro.pomodori;
    }

    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      const minutes = parseInt(card.minutes, 10);

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
    const {
      list,
      boardId,
      index,
      categories,
      defaultCategory,
      defaultList,
      defaultCardTime,
      isKeyboardOpen,
      openCardAdder
    } = this.props;

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
              className={
                defaultList === list._id ? 'focus-mode' : 'no-focus-mode'
              }
              name={list._id}
              isKeyboardOpen={isKeyboardOpen}
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
                <Cards
                  listId={list._id}
                  categories={categories}
                  withinPomodoroCards={this.withinPomodoroTime()}
                />
              </div>
              <CardAdder
                listId={list._id}
                defaultCategory={defaultCategory}
                defaultCardTime={defaultCardTime}
                openCardAdder={openCardAdder}
                placeholder="Add a new list item..."
                toggleKeyboard
              />
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
  const { boardId } = ownProps;

  return {
    cards: cardIds
      .map(id => state.cardsById[id])
      .filter(card => card.active !== false),
    pomodoro: state.boardsById[boardId].settings.pomodoro,
    categories: state.boardsById[boardId].settings.categories,
    defaultCategory: state.boardsById[boardId].settings.defaultCategory,
    defaultList: state.boardsById[boardId].settings.defaultList,
    defaultCardTime: state.boardsById[boardId].settings.defaultCardTime
  };
};

export default connect(mapStateToProps)(List);
