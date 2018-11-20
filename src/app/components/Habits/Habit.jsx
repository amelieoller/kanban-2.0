import React, { Component } from "react";
import "./Habits.scss";
import PropTypes from "prop-types";
import Trash from "react-icons/lib/md/clear";
import MdCheckCircle from "react-icons/lib/md/check-circle";
import MdFlag from "react-icons/lib/md/flag";
import classnames from "classnames";
import Picker from "../Picker/Picker";
import "./Habit.scss";
import formatMarkdown from "../Card/formatMarkdown";

class Habit extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { isDifficultyPickerOpen: false };
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
    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    const habit = { date, cardId: card._id };

    dispatch({
      type: "CHANGE_HABIT_STATS",
      payload: { boardId, habit }
    });
  };

  changeDifficulty = difficulty => {
    const { dispatch, card } = this.props;
    if (card.difficulty !== difficulty) {
      dispatch({
        type: "CHANGE_CARD_DIFFICULTY",
        payload: { difficulty, cardId: card._id }
      });
    }
    this.togglePicker("Difficulty");
  };

  togglePicker = type => {
    const picker = `is${type}PickerOpen`;

    this.setState({
      [picker]: !this.state[picker]
    });
  };

  render = () => {
    const { card, habitStats } = this.props;
    const { isDifficultyPickerOpen } = this.state;
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;

    return (
      <li
        className={classnames(`difficulty-${card.difficulty}`, "habit-wrapper")}
        name={card._id}
      >
        <MdCheckCircle
          className="habit-check"
          onClick={() => this.changeHabitStat()}
        />
        <span className="habits-card-title">
          <div
            className="card-title-html"
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(card.text)
            }}
          />{" "}
          <span className="habit-done">
            {habitStats[date] &&
              habitStats[date].reduce((n, val) => n + (val === card._id), 0)}
          </span>
        </span>

        <Picker
          isPickerOpen={isDifficultyPickerOpen}
          togglePicker={this.togglePicker}
          type="Difficulty"
          icon={<MdFlag className="modal-icon" />}
        >
          {[1, 2, 3].map(difficulty => (
            <button
              key={difficulty}
              type="submit"
              className="picker-button"
              onClick={() => this.changeDifficulty(difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </Picker>

        <Trash
          className="habit-delete"
          onClick={() => this.deleteCard(card._id)}
        />
      </li>
    );
  };
}

export default Habit;
