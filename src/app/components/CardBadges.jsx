import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { FiClock, FiBell, FiCheck } from 'react-icons/fi';
import styled from 'styled-components';

const CardBadgesStyles = styled.div`
  display: flex;
  padding: 0px 8px 6px 8px;
  font-size: 14px;

  .badge {
    margin-right: 5px;
    transition: background 0.15s;
  }

  .badge-minutes {
    background-color: ${props => props.theme.colors.monotoneAccent};

    input {
      background: transparent;
      color: ${props => props.theme.colors.backgroundAccent};
      width: 17px;
      border: none;
      text-align: center;
      font-size: 12px;
    }
  }
`;

const CardBadges = ({
  dispatch,
  minutes,
  cardId,
  category,
  toggleCategoryModal,
  date,
  checkboxes: { total, checked }
}) => {
  const renderDueDate = () => {
    if (!date) {
      return null;
    }
    const dueDateFromToday = differenceInCalendarDays(date, new Date());

    let dueDateString;
    if (dueDateFromToday < -1) {
      dueDateString = `${Math.abs(dueDateFromToday)} days ago`;
    } else if (dueDateFromToday === -1) {
      dueDateString = 'Yesterday';
    } else if (dueDateFromToday === 0) {
      dueDateString = 'Today';
    } else if (dueDateFromToday === 1) {
      dueDateString = 'Tomorrow';
    } else {
      dueDateString = format(date, 'D MMM');
    }

    let dueDateColor;
    if (dueDateFromToday < 0) {
      dueDateColor = 'red';
    } else if (dueDateFromToday === 0) {
      dueDateColor = '#d60';
    } else {
      dueDateColor = 'green';
    }

    return (
      <div className="badge" style={{ background: dueDateColor }}>
        <FiBell className="badge-icon" />
        &nbsp;
        {dueDateString}
      </div>
    );
  };

  // Render badge showing amount of checkboxes that are checked
  const renderTaskProgress = () => {
    if (total === 0) {
      return null;
    }
    return (
      <div
        className="badge"
        style={{ background: checked === total ? 'green' : '#444' }}
      >
        <FiCheck className="badge-icon" />
        &nbsp;
        {checked}/{total}
      </div>
    );
  };

  const renderCategory = () => {
    if (!category) {
      return null;
    }

    return (
      <div
        className="badge badge-category"
        onClick={toggleCategoryModal}
        onKeyDown={toggleCategoryModal}
        style={{
          background: category.color
        }}
        role="button"
        tabIndex={0}
      >
        {category.short}
      </div>
    );
  };

  const handleMinuteChange = e => {
    const newMinutes = e.target.value;

    if (minutes !== newMinutes) {
      dispatch({
        type: 'CHANGE_CARD_MINUTES',
        payload: { minutes: newMinutes, cardId }
      });
    }
  };

  const renderMinutes = () => {
    if (!minutes) {
      return null;
    }

    return (
      <div className="badge badge-minutes">
        <FiClock className="badge-icon" />
        &nbsp;
        <input
          onChange={e => handleMinuteChange(e)}
          type="text"
          value={minutes}
        />
        min
      </div>
    );
  };

  return (
    <CardBadgesStyles>
      {renderCategory()}
      {renderDueDate()}
      {renderMinutes()}
      {renderTaskProgress()}
    </CardBadgesStyles>
  );
};

CardBadges.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  checkboxes: PropTypes.shape({
    total: PropTypes.number.isRequired,
    checked: PropTypes.number.isRequired
  }).isRequired,
  minutes: PropTypes.string,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  dispatch: PropTypes.func,
  cardId: PropTypes.string,
  toggleCategoryModal: PropTypes.func
};

export default CardBadges;
