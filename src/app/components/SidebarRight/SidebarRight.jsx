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

  calculateSchedule(schedule) {
    const sched = later.schedule(schedule);

		return sched.next().toString()
  }

  render = () => {
    const { cards } = this.props;

    return (
      <>
        <div className="sidebar-wrapper">
          <div className="header">Repeating Tasks</div>
          <hr />
          <p className="sub-header">Task Points:</p>
          <p className="sub-header">Tasks Completed:</p>
          {/* <ul>
            {cards.map(card => (
              <li key={card._id}>
                <span>{card.text} - </span>
                <span>{this.calculateSchedule(card.recurring)}</span>
              </li>
            ))}
          </ul> */}
        </div>
      </>
    );
  };
}

const mapStateToProps = state => ({
  cards: Object.keys(state.cardsById)
    .filter(c => state.cardsById[c].recurring)
    .map(cardId => state.cardsById[cardId])
});

export default connect(mapStateToProps)(SidebarRight);
