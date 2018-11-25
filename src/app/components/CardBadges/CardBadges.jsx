import React, { Component } from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import MdDoneAll from "react-icons/lib/fa/check-square-o";
import { MdTimelapse, MdAccessAlarm } from "react-icons/lib/md";
import styled from "styled-components";

const CardBadgesStyles = styled.div`
  display: flex;
  padding: 0px 8px 6px 8px;
  font-size: 14px;

  .badge {
    margin-right: 5px;
    transition: background 0.15s;
  }

  .badge-icon {
    margin-bottom: 2px;
  }

  .badge-minutes {
    background-color: ${props => props.theme.grey};
  }
`;

class CardBadges extends Component {
  static propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    checkboxes: PropTypes.shape({
      total: PropTypes.number.isRequired,
      checked: PropTypes.number.isRequired
    }).isRequired,
    minutes: PropTypes.number,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      short: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  };

  renderDueDate = () => {
    const { date } = this.props;
    if (!date) {
      return null;
    }
    const dueDateFromToday = differenceInCalendarDays(date, new Date());

    let dueDateString;
    if (dueDateFromToday < -1) {
      dueDateString = `${Math.abs(dueDateFromToday)} days ago`;
    } else if (dueDateFromToday === -1) {
      dueDateString = "Yesterday";
    } else if (dueDateFromToday === 0) {
      dueDateString = "Today";
    } else if (dueDateFromToday === 1) {
      dueDateString = "Tomorrow";
    } else {
      dueDateString = format(date, "D MMM");
    }

    let dueDateColor;
    if (dueDateFromToday < 0) {
      dueDateColor = "red";
    } else if (dueDateFromToday === 0) {
      dueDateColor = "#d60";
    } else {
      dueDateColor = "green";
    }

    return (
      <div className="badge" style={{ background: dueDateColor }}>
        <MdAccessAlarm className="badge-icon" />
        &nbsp;
        {dueDateString}
      </div>
    );
  };

  // Render badge showing amoung of checkboxes that are checked
  renderTaskProgress = () => {
    const { total, checked } = this.props.checkboxes;
    if (total === 0) {
      return null;
    }
    return (
      <div
        className="badge"
        style={{ background: checked === total ? "green" : "#444" }}
      >
        <MdDoneAll className="badge-icon" />
        &nbsp;
        {checked}/{total}
      </div>
    );
  };

  renderCategory = () => {
    const { category, toggleCategoryModal } = this.props;

    if (!category) {
      return null;
    }

    return (
      <div
        className="badge badge-category"
        onClick={toggleCategoryModal}
        style={{
          background: category.color
        }}
      >
        {category.short}
      </div>
    );
  };

  renderMinutes = () => {
    const { minutes } = this.props;

    if (!minutes) {
      return null;
    }

    return (
      <div className="badge badge-minutes">
        <MdTimelapse className="badge-icon" />
        &nbsp;
        {minutes}
        min
      </div>
    );
  };

  render() {
    return (
      <CardBadgesStyles>
        {this.renderCategory()}
        {this.renderDueDate()}
        {this.renderMinutes()}
        {this.renderTaskProgress()}
      </CardBadgesStyles>
    );
  }
}

export default CardBadges;
