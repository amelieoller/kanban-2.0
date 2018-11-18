import React, { Component } from "react";
import "./Habits.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardAdder from "../CardAdder/CardAdder";
import Habit from "./Habit";

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
      <>
        <div className="habits-wrapper">
          <div className="header">
						Habits - {habitStats && Object.keys(habitStats).length}
          </div>
          <hr />
          {cards &&
            (cards.length !== 0 &&
              cards.map(card => (
                <Habit
                  key={card._id}
                  dispatch={dispatch}
                  card={card}
                  habitsListId={habitsListId}
                  boardId={boardId}
                />
              )))}
          <CardAdder listId={habitsListId} />
        </div>
      </>
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
