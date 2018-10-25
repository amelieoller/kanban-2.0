import React, { Component } from "react";
import "./Sidebar.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Trash from "react-icons/lib/md/clear";
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
    const { dispatch } = this.props;
    const listId = "__standard__completed";

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
        .filter(card => card.category && card.category.name === categories[i])
        .map(c => c.minutes)
        .reduce((a, b) => a + b, 0);

      results.push({ name: [categories[i]], minutes: accumulated });
    }

    return results;
  };

  render = () => {
    const { cards, pomodoro, dispatch, boardId } = this.props;

    return (
      <>
        <div className="sidebar-wrapper">
          <Pomodoro pomodoro={pomodoro} dispatch={dispatch} boardId={boardId} />
          <div className="header">Stats</div>
          <hr />
          <div className="stat-section-tasks">
            <div className="stat">
              <p className="sub-header">Tasks:</p>
              <span className="points">
                {cards &&
                  cards.length !== 0 &&
                  cards
                    .map(card => card.difficulty)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue
                    )}{" "}
                pts
              </span>
            </div>
          </div>

          <div className="stat-section">
            {this.renderCategorySummary(cards).map(
              category =>
                category.minutes !== 0 && (
                  <div className="stat" key={category.name}>
                    <p className="sub-header">{category.name}:</p>
                    <span className="points">{category.minutes} min</span>
                  </div>
                )
            )}
          </div>
          <p className="sub-header">Tasks Completed:</p>
          <ul>
            {cards &&
              cards.map(card => (
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
                  <Trash
                    className="delete"
                    onClick={() => this.deleteCard(card._id)}
                  />
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => {
  if (state.listsById.__standard__completed) {
    return {
      cards: state.listsById.__standard__completed.cards.map(
        cardId => state.cardsById[cardId]
      )
    };
  }
  return {};
};
export default connect(mapStateToProps)(Sidebar);
