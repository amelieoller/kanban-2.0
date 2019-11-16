const listsById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD': {
      const { listId, cardId } = action.payload;

      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] }
      };
    }
    case 'MOVE_CARD': {
      const {
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId
      } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards }
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards }
      };
    }
    case 'DELETE_CARD': {
      const { cardId: newCardId, listId } = action.payload;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(cardId => cardId !== newCardId)
        }
      };
    }
    case 'COMPLETE_CARD': {
      const { listId, completedListId } = action.payload;
      const sourceListId = listId;

      const oldCardIndex = state[sourceListId].cards.indexOf(
        action.payload.cardId
      );
      const newCardIndex = 0;

      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[completedListId].cards);

      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [completedListId]: { ...state[completedListId], cards: destinationCards }
      };
    }
    case 'ADD_LIST': {
      const { listId, listTitle, special } = action.payload;
      let list = {};

      if (special) {
        list = { _id: listId, title: listTitle, cards: [], special };
      } else {
        list = { _id: listId, title: listTitle, cards: [] };
      }

      return {
        ...state,
        [listId]: list
      };
    }
    case 'CHANGE_LIST_TITLE': {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle }
      };
    }
    case 'DELETE_LIST': {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    default:
      return state;
  }
};

export default listsById;
