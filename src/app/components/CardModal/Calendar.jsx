import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import DayPickerStyles from './DayPickerStyles';

const Calendar = ({ toggleModal, date, dispatch, cardId }) => {
  const [state, setState] = useState({
    selectedDay: date ? new Date(date) : undefined
  });

  const handleDayClick = (selectedDay, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (selected) {
      // Deselect the day if already selected
      setState({ ...state, selectedDay: undefined });
      return;
    }
    setState({ ...state, selectedDay });
  };

  const handleSave = () => {
    const { selectedDay } = state;

    dispatch({
      type: 'CHANGE_CARD_DATE',
      payload: { date: selectedDay, cardId }
    });
    toggleModal();
  };

  const { selectedDay } = state;

  return (
    <DayPickerStyles>
      <DayPicker
        onDayClick={handleDayClick}
        selectedDays={selectedDay}
        disabledDays={{ before: new Date() }}
      />
      <div className="calendar-buttons">
        <button
          type="submit"
          onClick={handleSave}
          className="calendar-save-button"
        >
          Save
        </button>
        <button type="submit" onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </DayPickerStyles>
  );
};

Calendar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  toggleModal: PropTypes.func.isRequired
};

export default connect()(Calendar);
