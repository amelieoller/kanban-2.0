import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-modal";
import FaTrash from "react-icons/lib/fa/trash";
import FaCheck from "react-icons/lib/fa/check";
import MdAlarm from "react-icons/lib/md/access-alarm";
import Flag from "react-icons/lib/md/flag";
import Calendar from "./Calendar";
import ClickOutside from "../ClickOutside/ClickOutside";
import colorIcon from "../../../assets/images/color-icon.png";
import "./CardOptions.scss";

class CardOptions extends Component {
  static propTypes = {
    isCategoryPickerOpen: PropTypes.bool.isRequired,
    isDifficultyPickerOpen: PropTypes.bool.isRequired,
    card: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    listId: PropTypes.string.isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    isThinDisplay: PropTypes.bool.isRequired,
    boundingRect: PropTypes.object.isRequired,
    toggleCategoryPicker: PropTypes.func.isRequired,
    toggleDifficultyPicker: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isCalendarOpen: false,
      minutes: this.props.card.minutes || ""
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

    dispatch({
      type: "COMPLETE_CARD",
      payload: { cardId: card._id, listId }
    });
  };

  changeCategory = color => {
    const { dispatch, card, toggleCategoryPicker } = this.props;
    if (card.color !== color) {
      dispatch({
        type: "CHANGE_CARD_COLOR",
        payload: { color, cardId: card._id }
      });
    }
    toggleCategoryPicker();
    this.colorPickerButton.focus();
  };

  changeDifficulty = difficulty => {
    const { dispatch, card, toggleDifficultyPicker } = this.props;
    if (card.difficulty !== difficulty) {
      dispatch({
        type: "CHANGE_CARD_DIFFICULTY",
        payload: { difficulty, cardId: card._id }
      });
    }
    toggleDifficultyPicker();
    this.colorPickerButton.focus();
  };

  handleKeyDownCategory = event => {
    if (event.keyCode === 27) {
      this.props.toggleCategoryPicker();
      this.colorPickerButton.focus();
    }
  };

  handleKeyDownDifficulty = event => {
    if (event.keyCode === 27) {
      this.props.toggleDifficultyPicker();
      this.colorPickerButton.focus();
    }
  };

  handleKeyDownTime = event => {
    if (event.keyCode === 27) {
      this.props.toggleDifficultyPicker();
      this.colorPickerButton.focus();
    }
  };

  handleMinuteChange = e => {
    const minutes = e.target.value !== "" ? parseInt(e.target.value) : ""

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

  handleClickOutsideCategory = () => {
    const { toggleCategoryPicker } = this.props;
    toggleCategoryPicker();
    this.colorPickerButton.focus();
  };

  handleClickOutsideDifficulty = () => {
    const { toggleDifficultyPicker } = this.props;
    toggleDifficultyPicker();
    this.colorPickerButton.focus();
  };

  toggleCalendar = () => {
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
  };

  render() {
    const {
      isCardNearRightBorder,
      isCategoryPickerOpen,
      isDifficultyPickerOpen,
      toggleCategoryPicker,
      toggleDifficultyPicker,
      card,
      isThinDisplay,
      boundingRect
    } = this.props;
    const { isCalendarOpen } = this.state;

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
      <div
        className="options-list"
        style={{
          alignItems: isCardNearRightBorder ? "flex-end" : "flex-start"
        }}
      >
        <div>
          <button onClick={this.completeCard} className="options-list-button">
            <div className="modal-icon">
              <FaCheck />
            </div>
            &nbsp;Done
          </button>
        </div>
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
              value={this.state.minutes}
              onChange={this.handleMinuteChange}
            />
          </form>
        </div>

        <div className="modal-color-picker-wrapper">
          <button
            className="options-list-button"
            onClick={toggleCategoryPicker}
            onKeyDown={this.handleKeyDownCategory}
            ref={ref => {
              this.colorPickerButton = ref;
            }}
            aria-haspopup
            aria-expanded={isCategoryPickerOpen}
          >
            <img src={colorIcon} alt="colorwheel" className="modal-icon" />
            &nbsp;Category
          </button>
          {isCategoryPickerOpen && (
            <ClickOutside
              eventTypes="click"
              handleClickOutside={this.handleClickOutsideCategory}
            >
              {/* eslint-disable */}
              <div
                className="modal-color-picker"
                onKeyDown={this.handleKeyDownCategory}
              >
                {/* eslint-enable */}
                {["white", "#F6A054", "#6CC4A7", "#E96A59", "#A39EE0"].map(
                  color => (
                    <button
                      key={color}
                      style={{ background: color }}
                      className="color-picker-color"
                      onClick={() => this.changeCategory(color)}
                    />
                  )
                )}
              </div>
            </ClickOutside>
          )}
        </div>
        <div className="modal-color-picker-wrapper">
          <button
            className="options-list-button"
            onClick={toggleDifficultyPicker}
            onKeyDown={this.handleKeyDownDifficulty}
            ref={ref => {
              this.colorPickerButton = ref;
            }}
            aria-haspopup
            aria-expanded={isDifficultyPickerOpen}
          >
            <Flag className="modal-icon" />
            &nbsp;Difficulty
          </button>
          {isDifficultyPickerOpen && (
            <ClickOutside
              eventTypes="click"
              handleClickOutside={this.handleClickOutsideDifficulty}
            >
              {/* eslint-disable */}
              <div
                className="modal-color-picker"
                onKeyDown={this.handleKeyDownDifficulty}
              >
                {/* eslint-enable */}
                {[1, 2, 3].map(difficulty => (
                  <button
                    key={difficulty}
                    type="submit"
                    className="difficulty-button"
                    onClick={() => this.changeDifficulty(difficulty)}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </ClickOutside>
          )}
        </div>
        <div>
          <button onClick={this.toggleCalendar} className="options-list-button">
            <div className="modal-icon">
              <MdAlarm />
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
        <div>
          <button onClick={this.deleteCard} className="options-list-button">
            <div className="modal-icon">
              <FaTrash />
            </div>
            &nbsp;Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CardOptions);
