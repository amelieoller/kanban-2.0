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

  .card-title-html {
    padding: 0;
    float: left;
    padding-right: 2px;

    p {
      margin: 0;
    }
  }

  .add-card-button {
    color: ${props => props.theme.colors.background};
  }

  ul {
    margin-top: 0;
  }

  .add-card-button {
    margin: 0 0 2rem 0;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table tr {
    border-bottom: 1px solid ${props => props.theme.colors.textDisabled};
  }

  .table tr:last-child {
    border: 0;
  }

  .table td {
    text-align: right;
    padding: 0;
  }

  .table .left {
    text-align: left;
  }
`;

const Habits = ({ cards, habitsListId, habitStats, dispatch, boardId }) => (
  <HabitsStyles className="no-focus-mode">
    <HabitStats boardId={boardId} />
    <table className="table table-hover">
      <tbody>
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
      </tbody>
    </table>
    <CardAdder listId={habitsListId} />
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
