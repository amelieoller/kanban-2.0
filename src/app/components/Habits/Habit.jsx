import React, { Component } from "react";
import PropTypes from "prop-types";
import { FiX, FiCheckCircle, FiFlag } from "react-icons/fi";
import styled from "styled-components";
import Picker from "../Picker/Picker";
import formatMarkdown from "../Card/formatMarkdown";

const bgColorChooser = cardDifficulty => {
	if (cardDifficulty === 2) return "neutral";
	if (cardDifficulty === 3) return "danger";
	return "monotoneAccent";
};

const HabitStyles = styled.li`
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.backgroundAccent};
  border: 1px solid ${props => props.theme.colors.mainBackground};
  font-size: 15px;
  width: 100%;
  margin: 3px 0;
  padding: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-right: 3px solid #eaecee;
  border-right-color: ${props =>
    props.theme.colors[`${bgColorChooser(props.cardDifficulty)}`]};

  .options-list-button {
    height: auto;
    padding: 0;
    margin: 0;
    color: ${props => props.theme.colors.mainBackground};
		background: transparent;
  }

  .habit-check {
    cursor: pointer;
    padding-right: 5px;
    color: ${props => props.theme.colors.monotoneAccent};
    font-size: 20px;

    &:hover {
      color: ${props => props.theme.colors.success};
    }
  }

  .habit-delete {
    cursor: pointer;
    color: ${props => props.theme.colors.monotoneAccent};
  }

  .habits-card-title {
    position: relative;
    box-sizing: border-box;
    font-size: 15px;
    width: 100%;
    overflow: hidden;

    p {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .habit-done {
      font-size: 10px;
      position: relative;
      top: -5px;
      color: ${props => props.theme.colors.mainAccent};
      font-weight: 700;
    }
  }
`;

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
    const habitCount =
      habitStats[date] &&
      habitStats[date].reduce((n, val) => n + (val === card._id), 0);

    return (
      <HabitStyles cardDifficulty={card.difficulty}>
        <FiCheckCircle
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
          <span className="habit-done">{habitCount !== 0 && habitCount}</span>
        </span>

        <Picker
          isPickerOpen={isDifficultyPickerOpen}
          togglePicker={this.togglePicker}
          type="Difficulty"
          icon={<FiFlag className="modal-icon" />}
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

        <FiX
          className="habit-delete"
          onClick={() => this.deleteCard(card._id)}
        />
      </HabitStyles>
    );
  };
}

export default Habit;
