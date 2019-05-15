import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiCheckCircle, FiFlag } from 'react-icons/fi';
import styled from 'styled-components';
import Picker from '../Picker';
import formatMarkdown from '../Card/formatMarkdown';

const bgColorChooser = cardDifficulty => {
  if (cardDifficulty === 2) return 'neutral';
  if (cardDifficulty === 3) return 'danger';
  return 'monotoneAccent';
};

const HabitStyles = styled.li`
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  color: ${props => props.theme.colors.textSecondary};
  background: ${props => props.theme.colors.backgroundAccent};
  border: 1px solid ${props => props.theme.colors.background};
  font-size: 15px;
  width: 100%;
  margin: 3px 0;
  padding: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-right: 3px solid #eaecee;
  border-right-color: ${props =>
    props.theme.colors[`${bgColorChooser(props.cardDifficulty)}`]};

  .options-list-button {
    height: auto;
    padding: 0;
    margin: 0;
    color: ${props => props.theme.colors.background};
    background: transparent;
  }

  .habit-check {
    cursor: pointer;
    padding-right: 5px;
    font-size: 20px;
  }

  .habit-delete {
    cursor: pointer;
    color: ${props => props.theme.colors.monotoneAccent};
  }

  .habits-card-title {
    position: relative;
    box-sizing: border-box;
    font-size: 15px;
    width: 100%;
    overflow: hidden;

    p {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .habit-done {
      font-size: 10px;
      position: relative;
      top: -5px;
      color: ${props => props.theme.colors.primary};
      font-weight: 500;
    }
  }
`;

const Habit = ({ dispatch, habitsListId, boardId, card, habitStats }) => {
  const [state, setState] = useState({
    isDifficultyPickerOpen: false
  });

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

  const togglePicker = type => {
    const picker = `is${type}PickerOpen`;

    setState({
      ...state,
      [picker]: !state[picker]
    });
  };

  const changeDifficulty = difficulty => {
    if (card.difficulty !== difficulty) {
      dispatch({
        type: 'CHANGE_CARD_DIFFICULTY',
        payload: { difficulty, cardId: card._id }
      });
    }
    togglePicker('Difficulty');
  };

  const { isDifficultyPickerOpen } = state;
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() +
    1}-${today.getDate()}`;
  const habitCount =
    habitStats[date] &&
    habitStats[date].reduce((n, val) => n + (val === card._id), 0);

  return (
    <tr>
      <td className="left">
        <FiCheckCircle
          className="habit-check"
          onClick={() => changeHabitStat()}
        />
      </td>
      <td className="left">
        <span className="habits-card-title">
          <div
            className="card-title-html"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(card.text)
            }}
          />
          <span className="habit-done">{habitCount !== 0 && habitCount}</span>
        </span>
      </td>
      <td>
        <Picker
          isPickerOpen={isDifficultyPickerOpen}
          togglePicker={togglePicker}
          type="Difficulty"
          icon={<FiFlag className="modal-icon" />}
        >
          {[1, 2, 3].map(difficulty => (
            <span
              key={difficulty}
              type="submit"
              className="picker-button"
              onClick={() => changeDifficulty(difficulty)}
            >
              {difficulty}
            </span>
          ))}
        </Picker>
      </td>
      <td>
        <FiX className="habit-delete" onClick={() => deleteCard(card._id)} />
      </td>
    </tr>

    // <HabitStyles cardDifficulty={card.difficulty}>
    //   <FiCheckCircle
    //     className="habit-check"
    //     onClick={() => changeHabitStat()}
    //   />
    //   <span className="habits-card-title">
    //     <div
    //       className="card-title-html"
    //       // eslint-disable-next-line react/no-danger
    //       dangerouslySetInnerHTML={{
    //         __html: formatMarkdown(card.text)
    //       }}
    //     />{' '}
    //     <span className="habit-done">{habitCount !== 0 && habitCount}</span>
    //   </span>

    //   <Picker
    //     isPickerOpen={isDifficultyPickerOpen}
    //     togglePicker={togglePicker}
    //     type="Difficulty"
    //     icon={<FiFlag className="modal-icon" />}
    //   >
    //     {[1, 2, 3].map(difficulty => (
    //       <button
    //         key={difficulty}
    //         type="submit"
    //         className="picker-button"
    //         onClick={() => changeDifficulty(difficulty)}
    //       >
    //         {difficulty}
    //       </button>
    //     ))}
    //   </Picker>

    //   <FiX className="habit-delete" onClick={() => deleteCard(card._id)} />
    // </HabitStyles>
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
