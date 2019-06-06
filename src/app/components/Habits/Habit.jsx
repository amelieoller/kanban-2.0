import React from 'react';
import PropTypes from 'prop-types';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';
import formatMarkdown from '../Card/formatMarkdown';
import IconButton from '../Atoms/IconButton';

const HabitStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${props => props.theme.sizes.borderRadius};
  padding: 2px 0;

  .card-title-html {
    padding: 0;
    float: left;

    p {
      margin: 0;
    }
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.elevatedOne};

    .habit-delete {
      opacity: 0.8;
      transition: opacity 200ms;
    }

    .card-title-html,
    .card-title-html a {
      color: ${props => props.theme.colors.text};
    }
  }

  &:last-child {
    border: 0;
  }

  .habit-check {
    cursor: pointer;
    padding-right: 2px;
    font-size: 17px;
    min-width: 17px;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.secondary};
    }
  }

  .habit-done-count {
    font-size: 10px;
    position: relative;
    top: -5px;
    color: ${props => props.theme.colors.secondary};
    font-weight: 500;
    cursor: pointer;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.primary};
    }
  }

  .habits-card-title {
    font-size: 15px;
  }

  .habit-delete {
    opacity: 0;
    padding: 1px;
    position: absolute;
    right: 0;
    top: 2px;
    transition: opacity 20ms;
    cursor: pointer;
    border-radius: ${props => props.theme.sizes.borderRadius};
    background: ${props => props.theme.colors.elevatedOne};
    color: ${props => props.theme.colors.textDisabled};

    &:hover,
    &:focus {
      opacity: 0.8;
      transition: opacity 200ms;
    }

    &:focus {
      background: transparent;
    }

    &:hover svg,
    &:focus svg {
      opacity: 0.8;
      transition: opacity 200ms;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const Habit = ({ dispatch, habitsListId, boardId, card, habitStats }) => {
  const deleteCard = cardId => {
    const listId = habitsListId;

    dispatch({
      type: 'DELETE_CARD',
      payload: { cardId, listId }
    });
  };

  const changeHabitStat = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    const habit = { date, cardId: card._id };

    dispatch({
      type: 'CHANGE_HABIT_STATS',
      payload: { boardId, habit }
    });
  };

  const reduceHabitCount = cardId => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;

    dispatch({
      type: 'REMOVE_HABIT',
      payload: { cardId, boardId, date }
    });
  };

  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() +
    1}-${today.getDate()}`;
  const habitCount =
    habitStats[date] &&
    habitStats[date].reduce((n, val) => n + (val === card._id), 0);

  return (
    <HabitStyles>
      <FiCheckCircle
        className="habit-check"
        onClick={() => changeHabitStat()}
        onKeyDown={e => e.keyCode === 13 && changeHabitStat()}
        tabIndex={0}
      />
      <span className="habits-card-title">
        <div
          className="card-title-html"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: formatMarkdown(card.text)
          }}
        />
        {habitCount !== 0 &&
          <span
            className="habit-done-count"
            role="button"
            onClick={() => reduceHabitCount(card._id)}
            onKeyDown={e => e.keyCode === 13 && reduceHabitCount(card._id)}
            tabIndex={0}
          >
            {habitCount}
          </span>
        }
      </span>

      <IconButton
        className="habit-delete"
        onClick={() => {
          if (
            window.confirm(
              `Are you sure you want to delete the habit "${card.text}"?`
            )
          )
            deleteCard(card._id);
        }}
        onKeyDown={e =>
          e.keyCode === 13 &&
          window.confirm(
            `Are you sure you want to delete the habit "${card.text}"?`
          ) &&
          deleteCard(card._id)
        }
        color="textDisabled"
        background="transparent"
      >
        <FiXCircle />
      </IconButton>
    </HabitStyles>
  );
};

Habit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  habitsListId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired
  }).isRequired,
  habitStats: PropTypes.object.isRequired
};

export default Habit;
