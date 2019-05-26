import React from 'react';
import PropTypes from 'prop-types';
import { FiXCircle } from 'react-icons/fi';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import styled from 'styled-components';
import formatMarkdown from './Card/formatMarkdown';
import IconButton from './Atoms/IconButton';

const TaskStatsStyled = styled.div`
  ul {
    margin: 0;
  }

  h4 {
    margin-bottom: 5px;
    margin-top: 10px;
    color: ${props => props.theme.colors.secondary};
  }

  .completed-task-wrapper {
    color: ${props => props.theme.colors.text};
    width: 100%;
    margin: 0;
    padding: 5px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &:not(:last-child) {
      border-bottom: 1px solid ${props => props.theme.colors.textDisabled};
    }

    &:hover,
    &:focus {
      background-color: ${props => props.theme.colors.elevatedOne};

      .card-icon {
        visibility: visible;
        opacity: 0.8;
        transition: visibility 0s linear 0s, opacity 200ms;
      }
    }

    .completed-task-text {
      font-size: 15px;
      width: 100%;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${props => props.theme.colors.textSecondary};

      p {
        margin: 0;
      }
    }

    .card-icon {
      opacity: 0.7;
      padding: 2px;
      position: absolute;
      right: -2px;
      top: 0;
      visibility: hidden;
      transition: visibility 0s linear 20ms, opacity 20ms;
      cursor: pointer;
      border-radius: ${props => props.theme.sizes.borderRadius};
      background: ${props => props.theme.colors.elevatedOne};

      &:hover,
      &:focus {
        color: ${props => props.theme.colors.primary};
      }
    }
  }

  .stat-badges {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    flex-wrap: wrap;
  }
`;

const StyledCategoryBadge = styled.div`
  margin-bottom: 5px;
  background-color: ${props =>
    props.color === 'white' ? props.theme.colors.textDisabled : props.color};
  padding: 2px 4px;
  border-radius: ${props => props.theme.sizes.borderRadius};
  color: ${props => props.theme.colors.backgroundAccent};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TaskStats = ({ cards, dispatch, completedListId, categories }) => {
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
          <h4>{text}</h4>
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
              >
                <div
                  className="completed-task-text"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(card.text)
                  }}
                />

                <IconButton
                  className="card-icon"
                  onClick={() => deleteCard(card._id)}
                  color="textDisabled"
                  background="transparent"
                >
                  <FiXCircle />
                </IconButton>
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
      {cards &&
        (cards.length !== 0 && (
          <>
            <div className="stat-badges">
              {renderCategorySummary(cards).map(
                category =>
                  !!category.minutes && (
                    <StyledCategoryBadge
                      key={category.name}
                      color={category.color}
                    >
                      {category.minutes} min
                    </StyledCategoryBadge>
                  )
              )}
            </div>

            {renderCompletedDateSection(cards, 0, 'Today')}
            {renderCompletedDateSection(cards, -1, 'Yesterday')}
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
