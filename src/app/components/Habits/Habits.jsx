import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CardAdder from '../CardAdder';
import Habit from './Habit';
import HabitStats from './HabitStats';

const HabitsStyles = styled.div`
  .card-title-html {
    padding: 0;
    display: inline;
    float: left;
    padding-right: 2px;
  }

  .add-card-button {
    color: ${props => props.theme.colors.mainBackground};
  }

  ul {
    margin-top: 0;
  }

  .add-card-button {
    margin: 0 0 2rem 0;
  }
`;

class Habits extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        difficulty: PropTypes.number.isRequired
      }).isRequired
    ),
    dispatch: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    const { cards, habitsListId, habitStats, dispatch, boardId } = this.props;

    return (
      <HabitsStyles className="no-focus-mode">
        <HabitStats boardId={boardId} />
        <ul>
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
        </ul>
        <CardAdder listId={habitsListId} />
      </HabitsStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const habitsListId = state.boardsById[ownProps.boardId].settings.habitsListId;

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
