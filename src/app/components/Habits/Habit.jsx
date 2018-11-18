import React, { Component } from "react";
import "./Habits.scss";
import PropTypes from "prop-types";
import Trash from "react-icons/lib/md/clear";
import MdCheckCircle from "react-icons/lib/md/check-circle";

class Habit extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteCard = cardId => {
    const { dispatch, habitsListId } = this.props;
    const listId = habitsListId;

    dispatch({
      type: "DELETE_CARD",
      payload: { cardId, listId }
    });
  };

  changeHabitStat = () => {
    const { dispatch, boardId, card } = this.props;
    const today = new Date();
    const habit = { [card._id]: { dateCompleted: today } };

    dispatch({
      type: "CHANGE_HABIT_STATS",
      payload: { boardId, habit }
    });
  };

  render = () => {
    const { card } = this.props;

    return (
      <li className="habits-card-title-wrapper" name={card._id}>
        <MdCheckCircle
          className="habit-check"
          onClick={() => this.changeHabitStat()}
        />
        <span className="habits-card-title">{card.text}</span>
        <Trash
          className="habit-delete"
          onClick={() => this.deleteCard(card._id)}
        />
      </li>
    );
  };
}

export default Habit;
