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
import { media } from "../Theme";

const MobileFooterStyles = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.white};

  @media (min-width: 768px) {
    display: none;
  }

  .topFooter {
    height: ${props =>
      `${props.theme.footerHeight - props.theme.headerHeight}px`};
    display: flex;
    border-top: 1px solid ${props => props.theme.monotoneAccent};

    & > div {
      padding: 5px;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    & > div:first-child:nth-last-child(2) {
      border-right: 1px solid ${props => props.theme.monotoneAccent};
    }
  }

  .footerBar {
    background: ${props => props.theme.white};
    display: flex;
    justify-content: space-evenly;
    border-top: 1px solid ${props => props.theme.monotoneAccent};
    padding: 4px;
    align-items: center;
    height: ${props => `${props.theme.headerHeight}px`};

    button {
      border-radius: ${props => props.theme.borderRadius};
      padding: 5px 8px;
      cursor: pointer;

      &:hover {
        background: ${props => props.theme.transparentBlack};
      }

      &#clear svg {
        stroke: ${props => props.theme.mainAccent};
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
      <MobileFooterStyles>
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
          <button onClick={() => this.handleClick("Pomodoro")}>
            <FiPlay />
          </button>
          <button onClick={() => this.handleClick("Calendar")}>
            <FiCalendar />
          </button>
          <button onClick={() => this.handleClick("TaskStats")}>
            <FiCheckCircle />
          </button>
          <button onClick={() => this.handleClick("Habits")}>
            <FiStar />
          </button>
          <button onClick={() => this.handleClick("Repeating")}>
            <FiRepeat />
          </button>
          <button
            id="clear"
            onClick={() => this.setState({ displayArray: [] })}
          >
            <FiX />
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
