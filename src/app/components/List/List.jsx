import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import styled from "styled-components";
import ListHeader from "./ListHeader";
import Cards from "./Cards";
import CardAdder from "../CardAdder/CardAdder";

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
  }

  .list--drag {
    box-shadow: ${props => props.theme.common.bsDragging} !important;
  }

  .cards-wrapper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .cards-wrapper::-webkit-scrollbar {
    width: 8px;
    border-radius: 2px;
    background-color: ${props => props.theme.colors.transparentBlack};
  }

  .cards-wrapper::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: ${props => props.theme.colors.transparentWhite};
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
            <ListStyles ref={provided.innerRef} {...provided.draggableProps}>
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
                  <Cards listId={list._id} categories={categories} />
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
