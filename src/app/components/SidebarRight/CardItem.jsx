import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CardItem.scss";
import Trash from "react-icons/lib/md/clear";

class CardItem extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {};
  }

  deleteCard = () => {
    const { dispatch, card } = this.props;
    const listId = "__standard__recurring";
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId }
    });
  };

  render() {
    const { card } = this.props;
    return (
      <div>
        <li>
          {card.text} <Trash className="delete" onClick={this.deleteCard} />
        </li>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(CardItem);
