import React, { Component } from "react";
import "./Sidebar.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CardItem.scss";
import Trash from "react-icons/lib/md/clear";
import Pomodoro from "../Pomodoro/Pomodoro";

class Sidebar extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        difficulty: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    pomodoro: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
		boardId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteCard = cardId => {
    const { dispatch } = this.props;
    const listId = "completed";

    dispatch({
      type: "DELETE_CARD",
      payload: { cardId, listId }
    });
  };

  render = () => {
		const { cards, pomodoro, dispatch, boardId } = this.props;

    return (
      <>
        <div className="sidebar-wrapper">
          <div className="header">Pomodoro</div>
          <hr />
          <Pomodoro pomodoro={pomodoro} dispatch={dispatch} boardId={boardId} />
          <div className="header">Stats</div>
          <hr />
          <p className="sub-header">Task Points:</p>
          <span className="points">
            {cards.length !== 0 &&
              cards
                .map(card => card.difficulty)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )}
          </span>
          <p className="sub-header">Tasks Completed:</p>
          <ul>
            {cards.map(card => (
              <li key={card._id}>
                {card.text}{" "}
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

const mapStateToProps = state => ({
  cards: state.listsById.completed.cards.map(cardId => state.cardsById[cardId])
});
export default connect(mapStateToProps)(Sidebar);
