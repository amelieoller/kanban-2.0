import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PomodoroWrapper from './Pomodoro/PomodoroWrapper';
import Events from './Events/Events';
import TaskStats from './TaskStats';
// import RepeatingTasks from './RepeatingTasks';
import Habits from './Habits/Habits';
import ExpandablePanels from './Molecules/ExpandablePanels';

const SidebarStyles = styled.div`
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  margin-top: ${props => `${props.theme.sizes.headerHeight}px`};
  overflow: scroll;
  box-shadow: ${props => props.theme.common.boxShadowTwo};
  background: ${props => props.theme.colors.elevatedThree};
  display: grid;
  grid-template-columns: ${props => `${props.theme.sizes.sidebarWidth}px`};
  grid-auto-rows: max-content;

  .no-calendar {
    color: ${props => props.theme.colors.text};
    font-size: 0.8rem;
    font-style: italic;
    margin: 0;
    padding: 10px;
  }

  @media ${props => props.theme.media.tablet} {
    width: 100vw;
    min-height: auto;
    height: ${props => `${props.theme.sizes.footerHeight}px`};
    bottom: 0;
    top: auto;
    grid-template-columns: 50% 50%;
  }

  @media ${props => props.theme.media.phone} {
    display: ${props => (props.isKeyboardOpen ? 'none' : 'grid')};
    grid-template-columns: 100%;
  }

  & > div {
    padding: 10px;
    width: 100%;
    height: 100%;

    @media ${props => props.theme.media.tablet} {
      &:nth-child(odd) {
        border-right: 1px solid ${props => props.theme.colors.textDisabled};
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
  eventFilter,
  changeFocusMode,
  pomodoroFocusMode,
  isKeyboardOpen
}) => {
  const [pomodoriToEvent, setPomodoriToEvent] = useState(false);

  return (
    <SidebarStyles isKeyboardOpen={isKeyboardOpen}>
      <ExpandablePanels>
        <PomodoroWrapper
          pomodoro={pomodoro}
          dispatch={dispatch}
          boardId={boardId}
          pomodoriToEvent={pomodoriToEvent}
          changeFocusMode={changeFocusMode}
          pomodoroFocusMode={pomodoroFocusMode}
          name="Pomodoro"
          defaultOpen
        />

        {user && eventCalendarId ? (
          <Events
            user={user}
            dispatch={dispatch}
            eventCalendarId={eventCalendarId}
            eventFilter={eventFilter}
            setPomodoriToEvent={setPomodoriToEvent}
            name="Events"
            defaultOpen
          />
        ) : (
          <p className="no-calendar">
            In order to use event features, make sure you are signed in and have
            added a Calendar ID in the settings panel.
          </p>
        )}

        {cards.length !== 0 && (
          <TaskStats
            cards={cards}
            completedListId={completedListId}
            dispatch={dispatch}
            categories={categories}
            name="Tasks"
          />
        )}

        <Habits boardId={boardId} name="Habits" />
      </ExpandablePanels>

      {/* <RepeatingTasks pomodoro={pomodoro} boardId={boardId} /> */}
    </SidebarStyles>
  );
};

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
  eventFilter: PropTypes.string,
  changeFocusMode: PropTypes.func,
  pomodoroFocusMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { completedListId } = state.boardsById[ownProps.boardId].settings;
  const {
    user,
    boardsById: {
      [ownProps.boardId]: {
        settings: {
          categories,
          eventCalendarId,
          eventFilter,
          pomodoroFocusMode
        }
      }
    }
  } = state;

  return {
    cards: state.listsById[completedListId].cards.map(
      cardId => state.cardsById[cardId]
    ),
    completedListId,
    user,
    categories,
    eventCalendarId,
    eventFilter,
    pomodoroFocusMode
  };
};

export default connect(mapStateToProps)(Sidebar);
