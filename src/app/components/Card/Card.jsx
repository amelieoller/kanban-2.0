import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { FiCheckCircle } from 'react-icons/fi';
import later from 'later';
import CardModal from '../CardModal/CardModal';
import CardBadges from '../CardBadges';
import { findCheckboxes } from '../utils';
import formatMarkdown from './formatMarkdown';
import CardStyles from './CardStyles';
import IconButton from '../Atoms/IconButton';

class Card extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string
      })
    }).isRequired,
    listId: PropTypes.string.isRequired,
    isDraggingOver: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    withinPomodoroCard: PropTypes.bool.isRequired,
    boardId: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      isCardModalOpen: false,
      isCalendarModalOpen: false,
      isDifficultyModalOpen: false,
      isCategoryModalOpen: false
    };
  }

  toggleSubModal = type => {
    const modal = `is${type}ModalOpen`;
    const modalState = this.state[modal];

    this.setState({
      [modal]: !modalState
    });
  };

  toggleCardEditor = () => {
    const { isCardModalOpen } = this.state;
    this.setState({ isCardModalOpen: !isCardModalOpen });
  };

  toggleSpecificModal = type => {
    const { isCardModalOpen } = this.state;

    if (!isCardModalOpen) this.toggleCardEditor();
    this.toggleSubModal(type);
  };

  handleClick = e => {
    const { tagName, checked, id, type } = e.target;

    if (tagName.toLowerCase() === 'input' && type.toLowerCase() === 'checkbox') {
      // The id is a string that describes which number in the order of checkboxes this particular checkbox has
      this.toggleCheckbox(checked, parseInt(id, 10));
    } else if (
      tagName.toLowerCase() !== 'a' &&
      tagName.toLowerCase() !== 'input' &&
      !e.target.classList.contains('badge')
    ) {
      this.toggleCardEditor();
    }
  };

  handleKeyDown = e => {
    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (e.keyCode === 13 && e.target.tagName.toLowerCase() !== 'a') {
      e.preventDefault();
      this.toggleCardEditor();
    }
  };

  // identify the clicked checkbox by its index and give it a new checked attribute
  toggleCheckbox = (checked, i) => {
    const { card, dispatch } = this.props;

    let j = 0;
    const newText = card.text.replace(/\[(\s|x)\]/g, match => {
      let newString;
      if (i === j) {
        newString = checked ? '[x]' : '[ ]';
      } else {
        newString = match;
      }
      j += 1;
      return newString;
    });

    dispatch({
      type: 'CHANGE_CARD_TEXT',
      payload: { cardId: card._id, cardText: newText }
    });
  };

  completeCard = () => {
    const { dispatch, listId, card, boardId, completedListId } = this.props;

    if (card.habitId) {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const habit = { date, cardId: card.habitId };

      dispatch({
        type: 'CHANGE_HABIT_STATS',
        payload: { boardId, habit }
      });
    }

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
        payload: { cardId: card._id, listId, completedListId }
      });
    }
  };

  render() {
    const {
      card,
      index,
      listId,
      isDraggingOver,
      dispatch,
      categories,
      withinPomodoroCard
    } = this.props;
    const {
      isCardModalOpen,
      isCalendarModalOpen,
      isDifficultyModalOpen,
      isCategoryModalOpen
    } = this.state;
    const checkboxes = findCheckboxes(card.text);
    const cardCategory = categories.find(cat => cat._id === card.categoryId);
    const minuteLength = card.minutes.toString().length;

    return (
      card.active !== false && (
        <CardStyles
          categoryColor={cardCategory ? cardCategory.color : 'transparent'}
          minutePosition={
            minuteLength === 1 ? '11.5px' : minuteLength === 2 ? '8.5px' : '6.8px'
          }
        >
          <>
            <Draggable draggableId={card._id} index={index}>
              {(provided, snapshot) => (
                <>
                  <div
                    className={clsx(
                      'card-title',
                      {
                        'card-title--drag': snapshot.isDragging
                      },
                      withinPomodoroCard && 'within-pomodoro',
                      card.categoryId !== 'none' && 'with-category',
                      card.minutes !== 0 && 'has-minutes'
                    )}
                    ref={ref => {
                      provided.innerRef(ref);
                      this.ref = ref;
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={event => {
                      provided.dragHandleProps.onClick(event);
                      this.handleClick(event);
                    }}
                    onKeyDown={event => {
                      provided.dragHandleProps.onKeyDown(event);
                      this.handleKeyDown(event);
                    }}
                    role="button"
                    tabIndex={0}
                    style={{
                      ...provided.draggableProps.style
                    }}
                  >
                    <div className="card-title-top">
                      {card.minutes !== 0 && (
                        <span className="minutes-wrapper">
                          <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 19.5 24"
                            xmlSpace="preserve"
                          >
                            <path
                              fill="currentColor"
                              d="M17.7,8.6l1.1-1.1C19,7.3,19,7,18.8,6.8L18,6c-0.2-0.2-0.6-0.2-0.8,0l-1,1c-1.5-1.3-3.3-2.2-5.3-2.4V2.2h1.3
                                c0.3,0,0.6-0.3,0.6-0.6V0.6c0-0.3-0.3-0.6-0.6-0.6H7.3C7,0,6.8,0.3,6.8,0.6v1.1C6.8,2,7,2.2,7.3,2.2h1.3v2.3C3.8,5.1,0,9.2,0,14.2
                                C0,19.6,4.4,24,9.8,24s9.8-4.4,9.8-9.8C19.5,12.2,18.8,10.2,17.7,8.6z M9.8,21.8c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5
                                s7.5,3.4,7.5,7.5S13.9,21.8,9.8,21.8z"
                            />
                          </svg>

                          <span className="minutes">{card.minutes}</span>
                        </span>
                      )}
                      <div
                        className="card-title-html"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(card.text)
                        }}
                      />
                    </div>
                    {(card.date || checkboxes.total > 0 || card.difficulty !== 1) && (
                      <CardBadges
                        date={card.date}
                        checkboxes={checkboxes}
                        minutes={card.minutes}
                        category={cardCategory}
                        dispatch={dispatch}
                        cardId={card._id}
                        difficulty={card.difficulty}
                        toggleSpecificModal={this.toggleSpecificModal}
                      />
                    )}
                    <IconButton
                      className="checkmark"
                      onClick={this.completeCard}
                      color="textDisabled"
                      background="transparent"
                    >
                      <FiCheckCircle />
                    </IconButton>
                  </div>
                  {/* Remove placeholder when not dragging over to reduce snapping */}
                  {isDraggingOver && provided.placeholder}
                </>
              )}
            </Draggable>
            <CardModal
              isOpen={isCardModalOpen}
              cardElement={this.ref}
              card={card}
              listId={listId}
              toggleCardEditor={this.toggleCardEditor}
              categories={categories}
              toggleSubModal={this.toggleSubModal}
              isCalendarModalOpen={isCalendarModalOpen}
              isDifficultyModalOpen={isDifficultyModalOpen}
              isCategoryModalOpen={isCategoryModalOpen}
              toggleSpecificModal={this.toggleSpecificModal}
            />
          </>
        </CardStyles>
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
