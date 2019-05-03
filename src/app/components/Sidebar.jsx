import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PomodoroWrapper from './Pomodoro/PomodoroWrapper';
import Events from './Events';
import TaskStats from './TaskStats';
import RepeatingTasks from './RepeatingTasks';
import Habits from './Habits/Habits';

const SidebarStyles = styled.div`
  width: ${props => `${props.theme.sizes.sidebarWidth}px`};
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${props => props.theme.colors.borderColor};
  position: fixed;
  top: 0;
  left: 0;
  margin-top: ${props => `${props.theme.sizes.headerHeight}px`};
  overflow: scroll;
  border-right: 1px solid ${props => props.theme.colors.borderColor};
  box-shadow: 5px 0 10px 0px #55555529;

  @media ${props => props.theme.media.tablet} {
    width: 100vw;
    height: ${props => `${props.theme.sizes.footerHeight}px`};
    bottom: 0;
    top: auto;
  }

  & > div {
    background: ${props => props.theme.colors.negativeText};
    padding: 10px;
    width: 100%;
    height: 100%;

    &:first-child {
      @media ${props => props.theme.media.tablet} {
        padding-top: 0;
      }
    }
  }
`;

const Sidebar = ({
  cards,
  pomodoro,
  dispatch,
  boardId,
  user,
  completedListId,
  categories,
  eventCalendarId,
  eventFilter
}) => (
  <SidebarStyles>
    <PomodoroWrapper
      pomodoro={pomodoro}
      dispatch={dispatch}
      boardId={boardId}
    />
    {user && eventCalendarId && (
      <Events
        user={user}
        dispatch={dispatch}
        eventCalendarId={eventCalendarId}
        eventFilter={eventFilter}
      />
    )}
    <TaskStats
      cards={cards}
      completedListId={completedListId}
      dispatch={dispatch}
      categories={categories}
    />
    <Habits boardId={boardId} />
    <RepeatingTasks pomodoro={pomodoro} boardId={boardId} />
  </SidebarStyles>
);

Sidebar.propTypes = {
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
  categories: PropTypes.array,
  eventCalendarId: PropTypes.string,
  eventFilter: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const { completedListId } = state.boardsById[ownProps.boardId].settings;

  return {
    cards: state.listsById[completedListId].cards.map(
      cardId => state.cardsById[cardId]
    ),
    completedListId,
    user: state.user,
    categories: state.boardsById[ownProps.boardId].settings.categories,
    eventCalendarId:
      state.boardsById[ownProps.boardId].settings.eventCalendarId,
    eventFilter: state.boardsById[ownProps.boardId].settings.eventFilter
  };
};

export default connect(mapStateToProps)(Sidebar);
