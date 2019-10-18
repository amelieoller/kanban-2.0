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
import ButtonBubbles from './Molecules/ButtonBubbles';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

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
  z-index: 1;

  .no-items {
    color: ${props => props.theme.colors.text};
    font-size: 0.8rem;
    font-style: italic;
    margin: 0;
    padding: 10px;
  }

  .open-settings-link {
    text-decoration: underline;
    cursor: pointer;
    color: ${props => props.theme.colors.secondary};

    &:hover {
      color: ${props => props.theme.colors.secondaryDark};
    }
  }

  @media ${props => props.theme.media.tablet} {
    margin-top: ${props => `${props.theme.sizes.headerHeightMobile}px`};
  }

  @media ${props => props.theme.media.phone} {
    display: ${props => (props.isKeyboardOpen ? 'none' : 'grid')};
    grid-template-columns: 100%;
    width: 100vw;
    min-height: auto;
    height: ${props => `${props.theme.sizes.footerHeight}px`};
    bottom: 0;
    top: auto;
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
  pomodoroFocusMode,
  isKeyboardOpen,
  sidebarOpen
}) => {
  const [pomodoriToEvent, setPomodoriToEvent] = useState(false);

  const toggleSettingsMenu = () => {
    dispatch({
      type: 'TOGGLE_SETTINGS_MENU',
      payload: { settingsMenuOpen: true }
    });
  };

  return (
    <SidebarStyles isKeyboardOpen={isKeyboardOpen}>
      <ExpandablePanels>
        <PomodoroWrapper
          pomodoro={pomodoro}
          dispatch={dispatch}
          boardId={boardId}
          pomodoriToEvent={pomodoriToEvent}
          pomodoroFocusMode={pomodoroFocusMode}
          name="Pomodoro"
          defaultOpen={sidebarOpen.pomodoroOpen}
        />

        <Events
          user={user}
          dispatch={dispatch}
          eventCalendarId={eventCalendarId}
          eventFilter={eventFilter}
          setPomodoriToEvent={setPomodoriToEvent}
          name="Events"
          defaultOpen={sidebarOpen.eventsOpen}
          boardId={boardId}
          toggleSettingsMenu={toggleSettingsMenu}
        />

        <Habits
          boardId={boardId}
          dispatch={dispatch}
          name="Habits"
          defaultOpen={sidebarOpen.habitsOpen}
        />

        <TaskStats
          cards={cards}
          completedListId={completedListId}
          dispatch={dispatch}
          categories={categories}
          name="Tasks"
          defaultOpen={sidebarOpen.tasksOpen}
          boardId={boardId}
        >
          <ButtonBubbles
            count={
              cards.filter(
                c => differenceInCalendarDays(c.completedAt, new Date()) === 0
              ).length
            }
          />
        </TaskStats>
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
  pomodoroFocusMode: PropTypes.bool,
  isKeyboardOpen: PropTypes.bool,
  sidebarOpen: PropTypes.object
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
          pomodoroFocusMode,
          sidebarOpen
        }
      }
    }
  } = state;
  const { isKeyboardOpen } = state.appState;

  return {
    cards: state.listsById[completedListId].cards.map(
      cardId => state.cardsById[cardId]
    ),
    completedListId,
    user,
    categories,
    eventCalendarId,
    eventFilter,
    pomodoroFocusMode,
    isKeyboardOpen,
    sidebarOpen
  };
};

export default connect(mapStateToProps)(Sidebar);
