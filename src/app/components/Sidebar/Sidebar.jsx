import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pomodoro from "../Pomodoro/Pomodoro";
import Calendar from "../Calendar/Calendar";
import HabitStats from "../HabitStats/HabitStats";
import TaskStats from "../TaskStats/TaskStats";
import SidebarStyles from "../styles/SidebarStyles";

class Sidebar extends Component {
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

    return (
      <SidebarStyles>
        <Pomodoro pomodoro={pomodoro} dispatch={dispatch} boardId={boardId} />
        {user && (
          <Calendar
            user={user}
            dispatch={dispatch}
            eventCalendarId={eventCalendarId}
          />
        )}
        <HabitStats boardId={boardId} />
        <TaskStats
          cards={cards}
          completedListId={completedListId}
          dispatch={dispatch}
          categories={categories}
        />
      </SidebarStyles>
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
export default connect(mapStateToProps)(Sidebar);
