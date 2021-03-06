import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { FiClock, FiBell, FiCheck } from 'react-icons/fi';
import styled from 'styled-components';
import Badge from './Atoms/Badge';
import ExpandingInput from './ExpandingInput';

const CardBadgesStyles = styled.div`
  display: flex;
  padding: 0px 5px 5px 5px;
  font-size: 14px;

  .badge {
    margin-right: 5px;
    transition: background 0.15s;
  }

  .badge-minutes {
    background-color: ${props => props.theme.colors.monotoneAccent};

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    input {
      background: transparent;
      color: ${props => props.theme.colors.backgroundAccent};
      border: none;
      max-width: 40px;
      font-size: 12px;
    }
  }
`;

const CardBadges = ({
  dispatch,
  minutes,
  cardId,
  category,
  difficulty,
  date,
  toggleSpecificModal,
  checkboxes: { total, checked }
}) => {
  const [cardMinutes, setCardMinutes] = useState(minutes);

  useEffect(() => {
    if (minutes !== cardMinutes) {
      setCardMinutes(minutes);
    }
  }, [minutes]);

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
      <div className="badge" style={{ background: checked === total ? 'green' : '#444' }}>
        <FiCheck className="badge-icon" />
        &nbsp;
        {checked}/{total}
      </div>
    );
  };

  const renderCategory = () => {
    if (!category || category.name === 'none') {
      return null;
    }

    return (
      <Badge
        onClick={() => toggleSpecificModal('Category')}
        background={category.color}
        className="badge"
      >
        {category.short}
      </Badge>
    );
  };

  const renderDifficulty = () => {
    if (!difficulty || difficulty === 1) {
      return null;
    }

    return (
      <Badge
        onClick={() => toggleSpecificModal('Difficulty')}
        background={difficulty === 3 ? '#ef5351' : '#0075A3'}
        className="badge"
      >
        {difficulty}
      </Badge>
    );
  };

  const handleMinuteChange = e => {
    const newMinutes = e.target.value === '' ? '' : parseInt(e.target.value, 10);

    if (cardMinutes !== newMinutes) {
      setCardMinutes(newMinutes);
    }
  };

  const handleMinuteSubmit = () => {
    if (minutes !== cardMinutes) {
      dispatch({
        type: 'CHANGE_CARD_MINUTES',
        payload: { minutes: cardMinutes === '' ? 0 : cardMinutes, cardId }
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
        <ExpandingInput
          name="minutes"
          max="50"
          fontSize={12}
          onChange={e => handleMinuteChange(e)}
          type="number"
          value={cardMinutes}
          onBlur={handleMinuteSubmit}
          onKeyUp={e => e.keyCode === 13 && handleMinuteSubmit()}
          extraWidth={0}
        />
        min
      </div>
    );
  };

  return (
    <CardBadgesStyles>
      {/* {renderCategory()} */}
      {/* {renderMinutes()} */}
      {renderDifficulty()}
      {renderDueDate()}
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
  minutes: PropTypes.number,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  dispatch: PropTypes.func,
  cardId: PropTypes.string,
  difficulty: PropTypes.number,
  toggleSpecificModal: PropTypes.func
};

export default CardBadges;
