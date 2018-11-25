import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import CardAdder from "../CardAdder/CardAdder";
import Habit from "./Habit";

const HabitsStyles = styled.div`
  background-color: rgba(201, 207, 211, 0.25);
  width: 160px;
  padding: 25px 8px 8px 8px;
  margin-top: 40px;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .card-title-html {
    padding: 0;
    display: inline;
    float: left;
    padding-right: 2px;
  }
`;

class Habits extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        difficulty: PropTypes.number.isRequired
      }).isRequired
    ),
    dispatch: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    const { cards, habitsListId, habitStats, dispatch, boardId } = this.props;

    return (
      <HabitsStyles>
        <div className="header">Habits</div>
        <hr />
        <ul>
          {cards &&
            (cards.length !== 0 &&
              cards.map(card => (
                <Habit
                  key={card._id}
                  dispatch={dispatch}
                  card={card}
                  habitsListId={habitsListId}
                  boardId={boardId}
                  habitStats={habitStats}
                />
              )))}
        </ul>
        <CardAdder listId={habitsListId} />
      </HabitsStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const habitsListId = state.boardsById[ownProps.boardId].settings.habitsListId;

  return {
    cards: state.listsById[habitsListId].cards.map(
      cardId => state.cardsById[cardId]
    ),
    habitsListId,
    user: state.user,
    habitStats: state.boardsById[ownProps.boardId].stats.habits
  };
};
export default connect(mapStateToProps)(Habits);
