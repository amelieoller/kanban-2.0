import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import SidebarStyles from "../styles/SidebarStyles";

const SidebarRightStyles = styled.div`
  .recurring-task-item {
    margin-bottom: 5px;

    .recurring-tasks-title {
      font-size: 14px;
      color: ${props => props.theme.darkGrey};
    }

    .recurring-time {
      font-size: 12px;
      color: ${props => props.theme.grey};
    }
  }
`;

class SidebarRight extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        difficulty: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
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

    this.interval = setInterval(() => this.recurringCalculator(), 20000);
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
      <SidebarStyles>
        <SidebarRightStyles>
          <div className="header">Repeating Tasks</div>
          <hr />
          <ul>
            {cards.map(card => (
              <li key={card._id} className="recurring-task-item">
                <span className="recurring-tasks-title">{card.text}</span>
                <hr />
                <span className="recurring-time">{card.recurringText}</span>
              </li>
            ))}
          </ul>
        </SidebarRightStyles>
      </SidebarStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { cardsById, boardsById } = state;
  const cards = Object.keys(cardsById)
    .filter(c => cardsById[c].nextDate)
    .map(cardId => cardsById[cardId]);
  const lastCheckinDate = boardsById[ownProps.boardId].settings.checkinDate;

  return {
    cards,
    lastCheckinDate
  };
};

export default connect(mapStateToProps)(SidebarRight);
