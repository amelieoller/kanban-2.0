import React, { Component } from "react";
import "./SidebarRight.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CardItem.scss";
import later from "later";

class SidebarRight extends Component {
  static propTypes = {
    // cards: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     _id: PropTypes.string.isRequired,
    //     text: PropTypes.string.isRequired,
    //     difficulty: PropTypes.number.isRequired
    //   }).isRequired
    // ).isRequired,
    // pomodoro: PropTypes.object.isRequired,
    // dispatch: PropTypes.func.isRequired,
    // boardId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.interval = setInterval(() => this.recurringCalculator(), 20000);

    const { lastCheckinDate, dispatch, cards } = this.props;
    const today = new Date();
    const lastCheckin = new Date(lastCheckinDate);

		if (lastCheckin < today) {
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

				if (!card.active && lastCheckin > new Date(card.nextDate)) {
          dispatch({
            type: "CHANGE_CARD_ACTIVE",
            payload: { cardId: card._id, active: true }
          });
        }
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  recurringCalculator() {
    // Check if there is a recurring card every 30 seconds that needs to be added to a list
    const { cards, dispatch } = this.props;
    const today = new Date();
    // if today === any of the times in each cards nextDate
    cards.forEach(card => {
      const toCheckDate = new Date(card.nextDate);

      if (
        toCheckDate.getFullYear() === today.getFullYear() &&
        toCheckDate.getMonth() === today.getMonth() &&
        toCheckDate.getDate() === today.getDate() &&
        toCheckDate.getHours() === today.getHours() &&
        toCheckDate.getMinutes() === today.getMinutes()
      ) {
        dispatch({
          type: "CHANGE_CARD_ACTIVE",
          payload: { cardId: card._id, active: true }
        });
      }
    });
  }

  render = () => {
    const { cards } = this.props;

    return (
      <>
        <div className="sidebar-wrapper">
          <div className="header">Repeating Tasks</div>
          <hr />
          <p className="sub-header">Recurring Tasks:</p>
          <ul>
            {cards.map(card => (
              <li key={card._id}>
                <span>{card.text} - </span>
                <span>{card.recurringText}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { cardsById, boardsById } = state;
  const cards = Object.keys(cardsById)
    .filter(c => cardsById[c].nextDate)
    .map(cardId => cardsById[cardId]);
  const lastCheckinDate = boardsById[ownProps.boardId].checkinDate;

  return {
    cards,
    lastCheckinDate
  };
};

export default connect(mapStateToProps)(SidebarRight);
