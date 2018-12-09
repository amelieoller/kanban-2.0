import React, { Component } from "react";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import classnames from "classnames";
import styled from "styled-components";

const TaskStatsStyled = styled.div`
  .completed-task-wrapper {
    border-radius: 3px;
    color: ${props => props.theme.darkGrey};
    border: 1px solid ${props => props.theme.lightGrey};
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .delete {
      min-width: 16px;
      cursor: pointer;
    }
  }

  .stat-badges {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    flex-wrap: wrap;

    .minute-badges {
      margin-bottom: 5px;
    }
  }
`;

class TaskStats extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        difficulty: PropTypes.number.isRequired
      }).isRequired
    ),
    completedListId: PropTypes.string.isRequired
  };

  deleteCard = cardId => {
    const { dispatch, completedListId } = this.props;
    const listId = completedListId;

    dispatch({
      type: "DELETE_CARD",
      payload: { cardId, listId }
    });
  };

  renderCategorySummary = cards => {
    const { categories } = this.props;
    const results = [];
    let accumulated;

    for (let i = 0; i < categories.length; i++) {
      accumulated = cards
        .filter(
          ca => differenceInCalendarDays(ca.completedAt, new Date()) === 0
        )
        .filter(
          card => card.categoryId && card.categoryId === categories[i]._id
        )
        .map(c => c.minutes)
        .reduce((a, b) => a + b, 0);

      results.push({
        name: [categories[i].short],
        minutes: accumulated,
        color: categories[i].color
      });
    }

    return results;
  };

  renderCompletedDateSection = (cards, dateOffset, text) => {
    const filteredCards = cards.filter(
      c => differenceInCalendarDays(c.completedAt, new Date()) === dateOffset
    );

    if (filteredCards.length === 0) return;

    return (
      <>
        <p className="cursive-header">{text}</p>
        <ul>
          {filteredCards.map(card => (
            <li
              key={card._id}
              className="completed-task-wrapper"
              style={{
                borderLeft: `2px solid ${
                  card.category ? card.category.color : "light-grey"
                }`
              }}
            >
              <span className="completed-task-text">{card.text}</span>
              <FiX
                className="delete"
                onClick={() => this.deleteCard(card._id)}
              />
            </li>
          ))}
        </ul>
      </>
    );
  };

  render = () => {
    const { cards } = this.props;
    const accumulated =
      cards.length !== 0 &&
      cards
        .map(card => card.difficulty)
        .reduce((accumulator, currentValue) => accumulator + currentValue);

    return (
      <TaskStatsStyled>
        <div className="header">
          Task Stats · <span className="number">{accumulated || 0}</span>
        </div>
        <hr />
        {cards &&
          (cards.length !== 0 && (
            <>
              <div className="stat-badges">
                {this.renderCategorySummary(cards).map(
                  category =>
                    category.minutes !== 0 && (
                      <div className="minute-badges" key={category.name}>
                        <div
                          className={classnames("minute-badge", "badge")}
                          style={{ background: category.color }}
                        >
                          {category.minutes} min
                        </div>
                      </div>
                    )
                )}
              </div>

              {this.renderCompletedDateSection(cards, 0, "Today")}
              {this.renderCompletedDateSection(cards, -1, "Yesterday")}
              {this.renderCompletedDateSection(
                cards,
                -2,
                "The Day Before Yesterday"
              )}
            </>
          ))}
      </TaskStatsStyled>
    );
  };
}

export default TaskStats;
