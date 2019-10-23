const cardsById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD': {
      const {
        cardText,
        cardId,
        createdAt,
        categoryId,
        minutes,
        habitId
      } = action.payload;

      return {
        ...state,
        [cardId]: {
          text: cardText,
          _id: cardId,
          difficulty: 1,
          minutes,
          createdAt,
          categoryId,
          habitId
        }
      };
    }
    case 'CHANGE_CARD_TEXT': {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], text: cardText } };
    }
    case 'CHANGE_CARD_DATE': {
      const { date, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], date } };
    }
    case 'CHANGE_CARD_CATEGORY': {
      const { categoryId, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], categoryId } };
    }
    case 'CHANGE_CARD_DIFFICULTY': {
      const { difficulty, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], difficulty } };
    }
    case 'CHANGE_CARD_MINUTES': {
      const { minutes, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], minutes } };
    }
    case 'CHANGE_CARD_STAR': {
      const { cardId } = action.payload;
      const starred = !state[cardId].starred;
      return { ...state, [cardId]: { ...state[cardId], starred } };
    }
    case 'DELETE_CARD_CATEGORY': {
      const { cardId } = action.payload;
      const {
        [cardId]: { categoryId, ...rest1 },
        ...rest2
      } = state;

      return { [cardId]: rest1, ...rest2 };
    }
    case 'DELETE_CARD': {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    case 'CHANGE_CARD_RECURRING': {
      const { recurringText, cardId, nextDate, schedule } = action.payload;

      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          recurringText,
          nextDate,
          schedule,
          active: false
        }
      };
    }
    case 'CHANGE_CARD_SCHEDULE': {
      const { cardId, nextDate } = action.payload;
      const active = false;

      return {
        ...state,
        [cardId]: { ...state[cardId], ...{ nextDate, active } }
      };
    }
    case 'CHANGE_CARD_COMPLETED_AT': {
      const { cardId, completedAt } = action.payload;

      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          completedAt
        }
      };
    }
    case 'CHANGE_CARD_ACTIVE': {
      const { cardId, active } = action.payload;

      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          active
        }
      };
    }
    // Find every card from the deleted list and remove it (actually unnecessary since they will be removed from db on next write anyway)
    case 'DELETE_LIST': {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter(cardId => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    }
    default:
      return state;
  }
};

export default cardsById;
