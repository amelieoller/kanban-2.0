import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FiBell, FiFlag, FiTag, FiCheck, FiTrash2 } from 'react-icons/fi';
import later from 'later';
import styled from 'styled-components';
import Calendar from './Calendar';
import Difficulty from './Difficulty';
import Category from './Category';

const CardOptionsStyles = styled.div`
  .options-list {
    margin: 0 8px;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.isThinDisplay && 'space-between'};

    @media (max-width: 550px) {
      flex-direction: row;
      width: 100%;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .modal-option {
    display: flex;
    align-items: center;
    height: ${props => (props.isThinDisplay ? '43px' : '32px')};
    margin: ${props =>
      props.isThinDisplay ? '0px 5px 10px 5px' : '0 3px 4px 3px'};
    padding: ${props => (props.isThinDisplay ? '0 10px' : '0 6px')};
    border: 0;
    border-radius: 3px;
    color: black;
    background: rgba(255, 255, 255, 0.8);
    font-size: ${props => (props.isThinDisplay ? '1.2rem' : '1rem')};
    cursor: pointer;
    width: ${props => (props.isThinDisplay ? '135px' : '100px')};

    &:hover,
    &:focus,
    &.is-active {
      color: ${props => props.theme.colors.primary};
    }

    &.recurring {
      max-width: 130px;
    }
  }

  .calendar {
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    background: white;
  }

  .calendar-buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;

    button {
      width: 120px;
      height: 30px;
      border: 0;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
      cursor: pointer;
    }

    button:hover {
      background: #bbb;
    }

    .calendar-save-button {
      color: white;
      background: $success-button-color;
    }

    .calendar-save-button:hover {
      background: $success-button-color-hover;
    }
  }
`;

class CardOptions extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      minutes: PropTypes.number,
      recurringText: PropTypes.string
    }).isRequired,
    listId: PropTypes.string.isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    isCardNearBottomBorder: PropTypes.bool.isRequired,
    isThinDisplay: PropTypes.bool.isRequired,
    boundingRect: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    toggleDifficultyPicker: PropTypes.func,
    isCalendarModalOpen: PropTypes.bool.isRequired,
    isDifficultyModalOpen: PropTypes.bool.isRequired,
    isCategoryModalOpen: PropTypes.bool.isRequired,
    toggleSubModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { card } = this.props;

    this.state = {
      minutes: card.minutes || '',
      recurringText: card.recurringText || ''
    };
  }

  deleteCard = () => {
    const { dispatch, listId, card } = this.props;
    dispatch({
      type: 'DELETE_CARD',
      payload: { cardId: card._id, listId }
    });
  };

  completeCard = () => {
    const { dispatch, listId, card } = this.props;
    if (card.schedule) {
      const nextDate = later.schedule(card.schedule).next();

      dispatch({
        type: 'CHANGE_CARD_SCHEDULE',
        payload: { cardId: card._id, nextDate }
      });
    } else {
      const completedAt = Date.now();

      dispatch({
        type: 'CHANGE_CARD_COMPLETED_AT',
        payload: { cardId: card._id, completedAt }
      });

      dispatch({
        type: 'COMPLETE_CARD',
        payload: { cardId: card._id, listId }
      });
    }
  };

  handleKeyDownTime = e => {
    const { toggleDifficultyPicker } = this.props;
    if (e.keyCode === 27) {
      toggleDifficultyPicker();
      this.colorPickerButton.focus();
    }
  };

  handleMinuteChange = e => {
    const minutes = parseInt(e.target.value, 10);

    this.setState({
      [e.target.name]: minutes
    });
  };

  handleMinuteSubmit = e => {
    e.preventDefault();
    const { dispatch, card } = this.props;
    const { minutes } = this.state;

    if (card.minutes !== minutes) {
      dispatch({
        type: 'CHANGE_CARD_MINUTES',
        payload: { minutes, cardId: card._id }
      });
    }
  };

  handleRecurringChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRecurringSubmit = e => {
    e.preventDefault();
    const { dispatch, card } = this.props;
    const { recurringText } = this.state;
    const schedule = later.parse.text(recurringText);
    if (schedule.error === -1) {
      const nextDate = later.schedule(schedule).next();

      dispatch({
        type: 'CHANGE_CARD_RECURRING',
        payload: { recurringText, cardId: card._id, nextDate, schedule }
      });
    }
  };

  render() {
    const {
      isCardNearRightBorder,
      isCardNearBottomBorder,
      card,
      isThinDisplay,
      boundingRect,
      categories,
      isCalendarModalOpen,
      isDifficultyModalOpen,
      isCategoryModalOpen,
      toggleSubModal
    } = this.props;

    const { minutes, recurringText } = this.state;

    const calendarStyle = {
      content: {
        top: isCardNearBottomBorder ? 'auto' : boundingRect.bottom + 10,
        left: isCardNearRightBorder ? 'auto' : boundingRect.left,
        bottom: isCardNearBottomBorder
          ? window.innerHeight - boundingRect.top - 3
          : 'auto',
        right: isCardNearRightBorder
          ? window.innerWidth - boundingRect.right
          : 'auto'
      }
    };

    const calendarMobileStyle = {
      content: {
        top: 110,
        transform: 'translateX(-50%)'
      }
    };

    return (
      <CardOptionsStyles isThinDisplay={isThinDisplay}>
        <div
          className="options-list"
          style={{
            alignItems: isCardNearRightBorder ? 'flex-end' : 'flex-start'
          }}
        >
          {/* Complete */}
          <button
            type="submit"
            onClick={this.completeCard}
            className="modal-option"
          >
            <div className="modal-icon">
              <FiCheck />
            </div>
            &nbsp;Done
          </button>

          {/* Minutes */}
          <form onSubmit={this.handleMinuteSubmit}>
            <input
              className="modal-option minutes"
              name="minutes"
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={this.handleMinuteChange}
            />
          </form>

          {/* Recurring */}
          {/* <form onSubmit={this.handleRecurringSubmit}>
            <input
              className="modal-option recurring"
              onKeyDown={this.handleKeyDownTime}
              name="recurringText"
              type="text"
              placeholder="Recurring Time"
              value={recurringText}
              onChange={this.handleRecurringChange}
            />
          </form> */}

          {/* Category */}
          <div>
            <button
              type="submit"
              onClick={() => toggleSubModal('Category')}
              className={
                isCategoryModalOpen ? 'is-active modal-option' : 'modal-option'
              }
            >
              <div className="modal-icon">
                <FiTag />
              </div>
              &nbsp;Category
            </button>
          </div>

          <Modal
            isOpen={isCategoryModalOpen}
            onRequestClose={() => toggleSubModal('Category')}
            overlayClassName="calendar-underlay"
            className="calendar-modal"
            style={isThinDisplay ? calendarMobileStyle : calendarStyle}
          >
            <Category
              card={card}
              categories={categories}
              toggleModal={() => toggleSubModal('Category')}
            />
          </Modal>

          {/* Difficulty */}
          <div>
            <button
              type="submit"
              onClick={() => toggleSubModal('Difficulty')}
              className={
                isDifficultyModalOpen
                  ? 'is-active modal-option'
                  : 'modal-option'
              }
            >
              <div className="modal-icon">
                <FiFlag />
              </div>
              &nbsp;Difficulty
            </button>
          </div>

          <Modal
            isOpen={isDifficultyModalOpen}
            onRequestClose={() => toggleSubModal('Difficulty')}
            overlayClassName="calendar-underlay"
            className="calendar-modal"
            style={isThinDisplay ? calendarMobileStyle : calendarStyle}
          >
            <Difficulty
              card={card}
              toggleModal={() => toggleSubModal('Difficulty')}
            />
          </Modal>

          {/* Calendar */}
          <div>
            <button
              type="submit"
              onClick={() => toggleSubModal('Calendar')}
              className={
                isCalendarModalOpen ? 'is-active modal-option' : 'modal-option'
              }
            >
              <div className="modal-icon">
                <FiBell />
              </div>
              &nbsp;Due date
            </button>
          </div>

          <Modal
            isOpen={isCalendarModalOpen}
            onRequestClose={() => toggleSubModal('Calendar')}
            overlayClassName="calendar-underlay"
            className="calendar-modal"
            style={isThinDisplay ? calendarMobileStyle : calendarStyle}
          >
            <Calendar
              cardId={card._id}
              date={card.date}
              toggleModal={() => toggleSubModal('Calendar')}
            />
          </Modal>
          {/* Delete */}
          <div>
            <button
              type="submit"
              onClick={() => {
                if (window.confirm('Are you sure?')) this.deleteCard();
              }}
              className="modal-option"
            >
              <div className="modal-icon">
                <FiTrash2 />
              </div>
              &nbsp;Delete
            </button>
          </div>
        </div>
      </CardOptionsStyles>
    );
  }
}

export default connect()(CardOptions);
