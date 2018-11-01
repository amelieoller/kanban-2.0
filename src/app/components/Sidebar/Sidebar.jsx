import React, { Component } from "react";
import "./Sidebar.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Trash from "react-icons/lib/md/clear";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import classnames from "classnames";
import Pomodoro from "../Pomodoro/Pomodoro";
import formatMarkdown from "../Card/formatMarkdown";

class Sidebar extends Component {
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
    boardId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteCard = cardId => {
    const { dispatch, completedListId } = this.props;
    const listId = completedListId;

    dispatch({
      type: "DELETE_CARD",
      payload: { cardId, listId }
    });
  };

  renderCategorySummary = cards => {
    const categories = ["Flatiron", "Graphic", "Kanban"];
    const results = [];
    let accumulated;

    for (let i = 0; i < categories.length; i++) {
      accumulated = cards
        .filter(
          ca => differenceInCalendarDays(ca.completedAt, new Date()) === 0
        )
        .filter(card => card.category && card.category.name === categories[i])
        .map(c => c.minutes)
        .reduce((a, b) => a + b, 0);

      results.push({ name: [categories[i]], minutes: accumulated });
    }

    return results;
  };

  renderCompletedDateSection = (cards, date) => {
    if (!date) {
      return null;
    }

    if (date === "today") {
      cards = cards.filter(
        c => differenceInCalendarDays(c.completedAt, new Date()) === 0
      );
    } else if (date === "yesterday") {
      cards = cards.filter(
        c => differenceInCalendarDays(c.completedAt, new Date()) === -1
      );
    } else if (date === "day_before") {
      cards = cards.filter(
        c => differenceInCalendarDays(c.completedAt, new Date()) === -2
      );
    }

    return cards.map(card => (
      <li
        key={card._id}
        className="sidebar-card-title-wrapper"
        style={{
          borderLeft: `2px solid ${
            card.category ? card.category.color : "light-grey"
          }`
        }}
      >
        <span
          className="sidebar-card-title"
          dangerouslySetInnerHTML={{
            __html: formatMarkdown(card.text)
          }}
        />
        <Trash className="delete" onClick={() => this.deleteCard(card._id)} />
      </li>
    ));
  };

  render = () => {
    const { cards, pomodoro, dispatch, boardId } = this.props;

    return (
      <>
        <div className="sidebar-wrapper">
          <Pomodoro pomodoro={pomodoro} dispatch={dispatch} boardId={boardId} />
          <div className="header">Stats</div>
          <hr />
          {cards &&
            (cards.length !== 0 && (
              <>
                {/* <div className="stat-section-tasks">
                  <div className="stat">
                    <p className="sub-header">Tasks:</p>
                    <span className="points">
                      {cards
                        .map(card => card.difficulty)
                        .reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue
                        )}{" "}
                      pts
                    </span>
                  </div>
                </div> */}

                <div className="stat-section">
                  {this.renderCategorySummary(cards).map(
                    category =>
                      category.minutes !== 0 && (
                        <div className="minute-badges" key={category.name}>
                          <div
                            className={classnames("minute-badge", `badge-${category.name}`)}
                          >
                            {category.minutes} min
                          </div>
                        </div>
                      )
                  )}
                </div>

                {this.renderCompletedDateSection(cards, "today").length !==
                  0 && (
                  <>
                    <p className="today-date">Today</p>
                    <ul>{this.renderCompletedDateSection(cards, "today")}</ul>
                  </>
                )}
                {this.renderCompletedDateSection(cards, "yesterday").length !==
                  0 && (
                  <>
                    <p className="today-date">Yesterday</p>
                    <ul>
                      {this.renderCompletedDateSection(cards, "yesterday")}
                    </ul>
                  </>
                )}
                {this.renderCompletedDateSection(cards, "day_before").length !==
                  0 && (
                  <>
                    <p className="today-date">The Day before yesterday</p>
                    <ul>
                      {this.renderCompletedDateSection(cards, "day_before")}
                    </ul>
                  </>
                )}
              </>
            ))}
        </div>
      </>
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
    completedListId
  };
};
export default connect(mapStateToProps)(Sidebar);
