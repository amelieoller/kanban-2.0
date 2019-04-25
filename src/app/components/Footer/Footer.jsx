import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Pomodoro from '../Pomodoro/Pomodoro';
import Calendar from '../Calendar/Calendar';
import TaskStats from '../TaskStats/TaskStats';
import RepeatingTasks from '../RepeatingTasks/RepeatingTasks';
import Habits from '../Habits/Habits';

const FooterStyles = styled.footer`
  height: ${props => `${props.theme.sizes.footerHeight}px`};
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid ${props => props.theme.colors.borderColor};
  position: fixed;

  @media ${props => props.theme.media.tablet} {
    display: none;
  }

  & > div {
    &:not(:last-child) {
      border-right: 1px solid ${props => props.theme.colors.borderColor};
    }
    background: ${props => props.theme.colors.negativeText};
    padding: 10px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

class Footer extends Component {
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
      <FooterStyles>
        <Pomodoro pomodoro={pomodoro} dispatch={dispatch} boardId={boardId} />
        {user && (
          <Calendar
            user={user}
            dispatch={dispatch}
            eventCalendarId={eventCalendarId}
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
      </FooterStyles>
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
export default connect(mapStateToProps)(Footer);
