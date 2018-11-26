import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { FiBell, FiFlag, FiTag, FiCheck, FiTrash2 } from "react-icons/fi";
import later from "later";
import styled from "styled-components";
import Calendar from "./Calendar";
import Picker from "../Picker/Picker";

const CardOptionsStyles = styled.div`
  .options-list {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin: 0 8px;

    @media (max-width: 550px) {
      justify-content: center;
      flex-direction: row;
      width: 100%;
      margin: 0;
    }
  }

  .calendar-modal {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .calendar-underlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
  }

  .calendar {
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    background: white;
  }

  .calendar-buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;

    button {
      width: 120px;
      height: 30px;
      border: 0;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 700;
      transition: background 0.2s;
      cursor: pointer;
    }

    button:hover {
      background: #bbb;
    }

    .calendar-save-button {
      color: ${props => props.theme.white};
      background: ${props => props.theme.green};
    }

    .calendar-save-button:hover {
      background: ${props => props.theme.darkGreen};
    }
  }

  .options-list-button {
    display: flex;
    align-items: center;
    height: 33px;
    margin: 0 3px 4px 3px;
    padding: 0 6px;
    border: 0;
    border-radius: 3px;
    color: black;
    background: rgba(255, 255, 255, 0.8);
    font-size: inherit;
    cursor: pointer;
  }
`;

class CardOptions extends Component {
  static propTypes = {
    isCategoryPickerOpen: PropTypes.bool.isRequired,
    isDifficultyPickerOpen: PropTypes.bool.isRequired,
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      minutes: PropTypes.number,
      recurringText: PropTypes.string
    }).isRequired,
    listId: PropTypes.string.isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    isThinDisplay: PropTypes.bool.isRequired,
    boundingRect: PropTypes.object.isRequired,
    togglePicker: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { card } = this.props;

    this.state = {
      isCalendarOpen: false,
      minutes: card.minutes || "",
      recurringText: card.recurringText || ""
    };
  }

  deleteCard = () => {
    const { dispatch, listId, card } = this.props;
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId }
    });
  };

  completeCard = () => {
    const { dispatch, listId, card } = this.props;
    if (card.schedule) {
      const nextDate = later.schedule(card.schedule).next();

      dispatch({
        type: "CHANGE_CARD_SCHEDULE",
        payload: { cardId: card._id, nextDate }
      });
    } else {
      const completedAt = Date.now();

      dispatch({
        type: "CHANGE_CARD_COMPLETED_AT",
        payload: { cardId: card._id, completedAt }
      });

      dispatch({
        type: "COMPLETE_CARD",
        payload: { cardId: card._id, listId }
      });
    }
  };

  changeCategory = category => {
    const { dispatch, card, togglePicker } = this.props;

    if (card.category !== category) {
      if (category.color === "white") {
        dispatch({
          type: "DELETE_CATEGORY",
          payload: { cardId: card._id }
        });
      } else {
        dispatch({
          type: "CHANGE_CARD_CATEGORY",
          payload: { category, cardId: card._id }
        });
      }
    }
    togglePicker("Category");
    this.colorPickerButton.focus();
  };

  changeDifficulty = difficulty => {
    const { dispatch, card, togglePicker } = this.props;
    if (card.difficulty !== difficulty) {
      dispatch({
        type: "CHANGE_CARD_DIFFICULTY",
        payload: { difficulty, cardId: card._id }
      });
    }
    togglePicker("Difficulty");
    this.colorPickerButton.focus();
  };

  handleKeyDownTime = e => {
    const { toggleDifficultyPicker } = this.props;
    if (e.keyCode === 27) {
      toggleDifficultyPicker();
      this.colorPickerButton.focus();
    }
  };

  handleMinuteChange = e => {
    const minutes = e.target.value !== "" ? parseInt(e.target.value, 10) : "";

    this.setState({
      [e.target.name]: minutes
    });
  };

  handleMinuteSubmit = e => {
    e.preventDefault();
    const { dispatch, card } = this.props;
    const { minutes } = this.state;

    if (card.minutes !== minutes) {
      dispatch({
        type: "CHANGE_CARD_MINUTES",
        payload: { minutes, cardId: card._id }
      });
    }
  };

  handleRecurringChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRecurringSubmit = e => {
    e.preventDefault();
    const { dispatch, card } = this.props;
    const { recurringText } = this.state;
    const schedule = later.parse.text(recurringText);
    if (schedule.error === -1) {
      const nextDate = later.schedule(schedule).next();

      dispatch({
        type: "CHANGE_CARD_RECURRING",
        payload: { recurringText, cardId: card._id, nextDate, schedule }
      });
    }
  };

  toggleCalendar = () => {
    const { isCalendarOpen } = this.state;
    this.setState({ isCalendarOpen: !isCalendarOpen });
  };

  render() {
    const {
      isCardNearRightBorder,
      isCategoryPickerOpen,
      isDifficultyPickerOpen,
      card,
      isThinDisplay,
      boundingRect,
      togglePicker
    } = this.props;
    const { isCalendarOpen, minutes, recurringText } = this.state;

    const calendarStyle = {
      content: {
        top: Math.min(boundingRect.bottom + 10, window.innerHeight - 300),
        left: boundingRect.left
      }
    };

    const calendarMobileStyle = {
      content: {
        top: 110,
        left: "50%",
        transform: "translateX(-50%)"
      }
    };
    return (
      <CardOptionsStyles>
        <div
          className="options-list"
          style={{
            alignItems: isCardNearRightBorder ? "flex-end" : "flex-start"
          }}
        >
          {/* Complete */}
          <div>
            <button
              type="submit"
              onClick={this.completeCard}
              className="options-list-button"
            >
              <div className="modal-icon">
                <FiCheck />
              </div>
              &nbsp;Done
            </button>
          </div>

          {/* Minutes */}
          <div className="modal-color-picker-wrapper">
            <form onSubmit={this.handleMinuteSubmit}>
              <input
                className="options-list-button"
                onKeyDown={this.handleKeyDownTime}
                ref={ref => {
                  this.colorPickerButton = ref;
                }}
                name="minutes"
                type="number"
                placeholder="Minutes"
                value={minutes}
                onChange={this.handleMinuteChange}
              />
            </form>
          </div>

          {/* Recurring */}
          <div className="modal-color-picker-wrapper">
            <form onSubmit={this.handleRecurringSubmit}>
              <input
                className="options-list-button"
                onKeyDown={this.handleKeyDownTime}
                name="recurringText"
                type="text"
                placeholder="Recurring Time"
                value={recurringText}
                onChange={this.handleRecurringChange}
              />
            </form>
          </div>

          {/* Category */}
          <Picker
            isPickerOpen={isCategoryPickerOpen}
            togglePicker={togglePicker}
            type="Category"
            icon={<FiTag className="modal-icon" />}
            text="Category"
          >
            {[
              { name: "", short: "", color: "white" },
              { name: "Flatiron", short: "//", color: "#32cefe" },
              { name: "Graphic", short: "GL", color: "#009ad0" },
              { name: "Kanban", short: "KB", color: "#EA725B" }
            ].map(category => (
              <button
                type="submit"
                key={category.name}
                style={{ background: category.color }}
								className="picker"
                onClick={() => this.changeCategory(category)}
              >
                {category.short}
              </button>
            ))}
          </Picker>

          {/* Difficulty */}
          <Picker
            isPickerOpen={isDifficultyPickerOpen}
            togglePicker={togglePicker}
            type="Difficulty"
            icon={<FiFlag className="modal-icon" />}
            text="Difficulty"
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

          {/* Calendar */}
          <div>
            <button
              type="submit"
              onClick={this.toggleCalendar}
              className="options-list-button"
            >
              <div className="modal-icon">
                <FiBell />
              </div>
              &nbsp;Due date
            </button>
          </div>
          <Modal
            isOpen={isCalendarOpen}
            onRequestClose={this.toggleCalendar}
            overlayClassName="calendar-underlay"
            className="calendar-modal"
            style={isThinDisplay ? calendarMobileStyle : calendarStyle}
          >
            <Calendar
              cardId={card._id}
              date={card.date}
              toggleCalendar={this.toggleCalendar}
            />
          </Modal>

          {/* Delete */}
          <div>
            <button
              type="submit"
              onClick={this.deleteCard}
              className="options-list-button"
            >
              <div className="modal-icon">
                <FiTrash2 />
              </div>
              &nbsp;Delete
            </button>
          </div>
        </div>
      </CardOptionsStyles>
    );
  }
}

export default connect()(CardOptions);
