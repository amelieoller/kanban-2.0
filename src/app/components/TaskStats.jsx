import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiStar } from 'react-icons/fi';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import classnames from 'classnames';
import styled from 'styled-components';

const TaskStatsStyled = styled.div`
  ul {
    margin: 0;
  }

  h3 {
    margin-bottom: 5px;
    margin-top: 10px;
    font-weight: 400;
  }

  .completed-task-wrapper {
    border-radius: 3px;
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.background};
    width: 100%;
    margin: 3px 0;
    padding: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .completed-task-text {
      font-size: 15px;
      width: 100%;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${props => props.theme.colors.textSecondary};
    }

    .card-icon {
      cursor: pointer;
      min-width: 16px;
      stroke: ${props => props.theme.colors.primary};
      font-size: 14px;

      &:hover {
        stroke: ${props => props.theme.colors.text};
      }
    }

    /* .card-icon-starred {
      fill: #ffcb34;
      stroke: #ffcb34;
      &:hover {
        fill: #ffb934;
        stroke: #ffb934;
      }
    } */
  }

  .stat-badges {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    flex-wrap: wrap;

    .minute-badges {
      margin-bottom: 5px;
    }
  }
`;

const TaskStats = ({ cards, dispatch, completedListId, categories }) => {
  const [hoverTask, setHoverTask] = useState('');

  const deleteCard = cardId => {
    const listId = completedListId;

    dispatch({
      type: 'DELETE_CARD',
      payload: { cardId, listId }
    });
  };

  const renderCategorySummary = renderCards => {
    const results = [];
    let accumulated;

    for (let i = 0; i < categories.length; i += 1) {
      accumulated = renderCards
        .filter(
          ca => differenceInCalendarDays(ca.completedAt, new Date()) === 0
        )
        .filter(
          card => card.categoryId && card.categoryId === categories[i]._id
        )
        .map(c => parseInt(c.minutes, 10))
        .reduce((a, b) => a + b, 0);

      results.push({
        name: [categories[i].short],
        minutes: accumulated,
        color: categories[i].color
      });
    }

    return results;
  };

  const handleStarClick = cardId => {
    dispatch({
      type: 'CHANGE_CARD_STAR',
      payload: { cardId }
    });
  };

  const renderCompletedDateSection = (renderCards, dateOffset, text) => {
    const filteredCards = renderCards.filter(
      c => differenceInCalendarDays(c.completedAt, new Date()) === dateOffset
    );

    if (filteredCards.length !== 0) {
      return (
        <>
          <h3>{text}</h3>
          <ul>
            {filteredCards.map(card => (
              <li
                key={card._id}
                className="completed-task-wrapper"
                style={{
                  borderLeft: `2px solid ${
                    card.category ? card.category.color : 'light-grey'
                  }`
                }}
                onMouseEnter={() => setHoverTask(card._id)}
                onMouseLeave={() => setHoverTask('')}
              >
                <span className="completed-task-text">{card.text}</span>

                {hoverTask === card._id && (
                  <>
                    {/* <FiRepeat className="card-icon" /> */}
                    <FiX
                      className="card-icon"
                      onClick={() => deleteCard(card._id)}
                    />
                  </>
                )}
                {/* <FiStar
                  className={
                    card.starred ? 'card-icon card-icon-starred' : 'card-icon'
                  }
                  onClick={() => handleStarClick(card._id)}
                /> */}
              </li>
            ))}
          </ul>
        </>
      );
    }
    return true;
  };

  const accumulated =
    cards.length !== 0 &&
    cards
      .map(card => card.difficulty)
      .reduce((accumulator, currentValue) => accumulator + currentValue);

  return (
    <TaskStatsStyled className="no-focus-mode">
      {/* <div className="header">
        Task Stats · <span className="number">{accumulated || 0}</span>
      </div>
      <hr /> */}
      {cards &&
        (cards.length !== 0 && (
          <>
            <div className="stat-badges">
              {renderCategorySummary(cards).map(
                category =>
                  category.minutes !== 0 && (
                    <div className="minute-badges" key={category.name}>
                      <div
                        className={classnames('minute-badge', 'badge')}
                        style={{ background: category.color }}
                      >
                        {category.minutes} min
                      </div>
                    </div>
                  )
              )}
            </div>

            {renderCompletedDateSection(cards, 0, 'Today')}
            {renderCompletedDateSection(cards, -1, 'Yesterday')}
            {/* {renderCompletedDateSection(cards, -2, 'The Day Before Yesterday')} */}
          </>
        ))}
    </TaskStatsStyled>
  );
};

TaskStats.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      difficulty: PropTypes.number.isRequired
    }).isRequired
  ),
  completedListId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

export default TaskStats;
