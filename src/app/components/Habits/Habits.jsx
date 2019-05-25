import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CardAdder from '../CardAdder';
import Habit from './Habit';
import HabitStats from './HabitStats';

const HabitsStyles = styled.div`
  color: ${props => props.theme.colors.textSecondary};

  a,
  svg {
    color: ${props => props.theme.colors.textSecondary};
  }

  ul {
    margin-top: 0;
  }

  .add-card-button {
    color: ${props => props.theme.colors.text};
  }
`;

const Habits = ({ cards, habitsListId, habitStats, dispatch, boardId }) => (
  <HabitsStyles className="no-focus-mode">
    <HabitStats boardId={boardId} />
    <div className="cards-wrapper">
      {cards &&
        (cards.length !== 0 &&
          cards.map(card => (
            <Habit
              key={card._id}
              dispatch={dispatch}
              card={card}
              habitsListId={habitsListId}
              boardId={boardId}
              habitStats={habitStats}
            />
          )))}
    </div>
    <CardAdder listId={habitsListId} placeholder="Add a new habit..." />
  </HabitsStyles>
);

Habits.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      difficulty: PropTypes.number.isRequired
    }).isRequired
  ),
  dispatch: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  habitsListId: PropTypes.string,
  habitStats: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const {
    boardsById: {
      [ownProps.boardId]: {
        settings: { habitsListId }
      }
    }
  } = state;

  return {
    cards: state.listsById[habitsListId].cards.map(
      cardId => state.cardsById[cardId]
    ),
    habitsListId,
    user: state.user,
    habitStats: state.boardsById[ownProps.boardId].stats.habits
  };
};

export default connect(mapStateToProps)(Habits);
