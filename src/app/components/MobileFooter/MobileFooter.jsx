import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  FiPlay,
  FiCheckCircle,
  FiCalendar,
  FiStar,
  FiRepeat,
  FiX
} from "react-icons/fi";
import Pomodoro from "../Pomodoro/Pomodoro";
import Calendar from "../Calendar/Calendar";
import TaskStats from "../TaskStats/TaskStats";
import RepeatingTasks from "../RepeatingTasks/RepeatingTasks";
import Habits from "../Habits/Habits";

const MobileFooterStyles = styled.footer`
  height: ${props =>
    `${
      props.footerExpanded
        ? props.theme.sizes.mobileFooterHeight +
          props.theme.sizes.mobileFooterHeightExpanded
        : props.theme.sizes.mobileFooterHeight
    }px`};
  width: 100%;
  display: flex;
  flex-direction: column;
	background: ${props => props.theme.colors.negativeText};
	width: 100vw;

  @media (min-width: 768px) {
    display: none;
  }

  .topFooter {
    height: ${props =>
      `${props.theme.sizes.footerHeight - props.theme.sizes.headerHeight}px`};
    display: flex;
    border-top: 1px solid ${props => props.theme.colors.monotoneAccent};

    & > div {
      padding: 5px;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    & > div:first-child:nth-last-child(2) {
      border-right: 1px solid ${props => props.theme.colors.monotoneAccent};
    }
  }

  .footerBar {
    background: ${props => props.theme.colors.negativeText};
    display: flex;
    justify-content: space-evenly;
    border-top: 1px solid ${props => props.theme.colors.monotoneAccent};
    padding: 4px;
    align-items: center;
    height: ${props => `${props.theme.sizes.headerHeight}px`};

    button {
      border-radius: ${props => props.theme.sizes.borderRadius};
      padding: 5px 8px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
			font-size: 12px;
			background: transparent;

      &.highlight svg {
        stroke: ${props => props.theme.colors.mainAccent};
      }

      &:hover {
        background: ${props => props.theme.colors.transparentBlack};
      }

      &#clear svg {
        stroke: ${props => props.theme.colors.mainAccent};
      }
    }
  }
`;

class MobileFooter extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        difficulty: PropTypes.number.isRequired
      }).isRequired
    ),
    pomodoro: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    completedListId: PropTypes.string.isRequired,
    user: PropTypes.object,
    categories: PropTypes.array
  };

  constructor() {
    super();

    this.state = {
      displayArray: []
    };
  }

  handleClick = type => {
    const { displayArray } = this.state;
    let newDisplayArray;

    if (displayArray.length === 2) {
      newDisplayArray = [...displayArray.splice(1, 1), type];
    } else {
      newDisplayArray = [...displayArray, type];
    }

    if (newDisplayArray.length > 0) {
      this.props.changeContentHeight(true);
    }

    this.setState({
      displayArray: newDisplayArray
    });
  };

  render = () => {
    const {
      cards,
      pomodoro,
      dispatch,
      boardId,
      user,
      completedListId,
      categories,
      eventCalendarId
    } = this.props;
    const { displayArray } = this.state;

    return (
      <MobileFooterStyles footerExpanded={displayArray.length !== 0}>
        {displayArray.length !== 0 && (
          <div className="topFooter">
            {displayArray.includes("Pomodoro") && (
              <Pomodoro
                pomodoro={pomodoro}
                dispatch={dispatch}
                boardId={boardId}
              />
            )}
            {displayArray.includes("Calendar") && user && (
              <Calendar
                user={user}
                dispatch={dispatch}
                eventCalendarId={eventCalendarId}
              />
            )}
            {displayArray.includes("TaskStats") && (
              <TaskStats
                cards={cards}
                completedListId={completedListId}
                dispatch={dispatch}
                categories={categories}
              />
            )}

            {displayArray.includes("Habits") && <Habits boardId={boardId} />}

            {displayArray.includes("Repeating") && (
              <RepeatingTasks pomodoro={pomodoro} boardId={boardId} />
            )}
          </div>
        )}
        <div className="footerBar">
          <button
            className={displayArray.includes("Pomodoro") ? "highlight" : ""}
            onClick={() => this.handleClick("Pomodoro")}
          >
            <FiPlay />
            Time
          </button>
          <button
            className={displayArray.includes("Calendar") ? "highlight" : ""}
            onClick={() => this.handleClick("Calendar")}
          >
            <FiCalendar />
            Events
          </button>
          <button
            className={displayArray.includes("TaskStats") ? "highlight" : ""}
            onClick={() => this.handleClick("TaskStats")}
          >
            <FiCheckCircle />
            TaskStats
          </button>
          <button
            className={displayArray.includes("Habits") ? "highlight" : ""}
            onClick={() => this.handleClick("Habits")}
          >
            <FiStar />
            Habits
          </button>
          <button
            className={displayArray.includes("Repeating") ? "highlight" : ""}
            onClick={() => this.handleClick("Repeating")}
          >
            <FiRepeat />
            Repeat
          </button>
          <button
            id="clear"
            onClick={() => {
              this.setState({ displayArray: [] });
              this.props.changeContentHeight(false);
            }}
          >
            <FiX />
            Clear
          </button>
        </div>
      </MobileFooterStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const completedListId =
    state.boardsById[ownProps.boardId].settings.completedListId;

  return {
    cards: state.listsById[completedListId].cards.map(
      cardId => state.cardsById[cardId]
    ),
    completedListId,
    user: state.user,
    categories: state.boardsById[ownProps.boardId].settings.categories,
    eventCalendarId: state.boardsById[ownProps.boardId].settings.eventCalendarId
  };
};
export default connect(mapStateToProps)(MobileFooter);
