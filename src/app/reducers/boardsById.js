const boardsById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      const { boardId, listId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: [...state[boardId].lists, listId]
        }
      };
    }
    case 'MOVE_LIST': {
      const {
        oldListIndex,
        newListIndex,
        boardId,
        completedListId,
        habitsListId
      } = action.payload;
      const newLists = Array.from(state[boardId].lists);
      const indexCompletedList = newLists.indexOf(completedListId);
      const indexHabitsList = newLists.indexOf(habitsListId);

      if (indexCompletedList > -1) {
        newLists.splice(indexCompletedList, 1);
      }
      if (indexHabitsList > -1) {
        newLists.splice(indexHabitsList, 1);
      }
      const [removedList] = newLists.splice(oldListIndex, 1);

      newLists.splice(newListIndex, 0, removedList);
      newLists.unshift(completedListId);
      newLists.unshift(habitsListId);

      return {
        ...state,
        [boardId]: { ...state[boardId], lists: newLists }
      };
    }
    case 'DELETE_LIST': {
      const { listId: newListId, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: state[boardId].lists.filter(listId => listId !== newListId)
        }
      };
    }
    case 'ADD_BOARD': {
      const {
        boardTitle,
        boardId,
        userId,
        completedListId,
        habitsListId,
        categoryId
      } = action.payload;

      return {
        ...state,
        [boardId]: {
          _id: boardId,
          title: boardTitle,
          lists: [],
          users: [userId],
          stats: { habits: {} },
          settings: {
            pomodoro: { notification: true, audio: true },
            goals: {
              habits: 0
            },
            categories: [
              { name: '', short: '', color: 'white', _id: categoryId }
            ],
            defaultCategory: 'none',
            eventCalendarId: '',
            color: 'light',
            completedListId,
            habitsListId
          }
        }
      };
    }
    case 'CHANGE_BOARD_TITLE': {
      const { boardTitle, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          title: boardTitle
        }
      };
    }
    case 'CHANGE_BOARD_COLOR': {
      const { boardId, color } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            color
          }
        }
      };
    }
    case 'CHANGE_HABIT_STATS': {
      const { boardId, habit } = action.payload;
      let newHabits = {};

      if (!state[boardId].stats.habits[habit.date]) {
        newHabits = {
          [habit.date]: (state[boardId].stats.habits[habit.date] = [
            habit.cardId
          ])
        };
      } else {
        newHabits = {
          [habit.date]: [
            ...state[boardId].stats.habits[habit.date],
            habit.cardId
          ]
        };
      }

      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          stats: {
            ...state[boardId].stats,
            habits: {
              ...state[boardId].stats.habits,
              ...newHabits
            }
          }
        }
      };
    }
    case 'CHANGE_SETTING': {
      const { boardId, checkinDate } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            checkinDate
          }
        }
      };
    }
    case 'CHANGE_LAST_CHECKIN': {
      const { boardId, checkinDate } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            checkinDate
          }
        }
      };
    }
    case 'CHANGE_POMODORO_SETTING': {
      const { boardId, type, value } = action.payload;

      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            pomodoro: {
              ...state[boardId].settings.pomodoro,
              [type]: value
            }
          }
        }
      };
    }
    case 'CHANGE_GOAL_SETTING': {
      const { boardId, type, value } = action.payload;

      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            goals: {
              ...state[boardId].settings.goals,
              [type]: value
            }
          }
        }
      };
    }
    case 'ADD_CATEGORY': {
      const { boardId, category } = action.payload;

      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            categories: [...state[boardId].settings.categories, category]
          }
        }
      };
    }
    case 'DELETE_CATEGORY': {
      const { boardId, categoryId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            categories: state[boardId].settings.categories.filter(
              category => category._id !== categoryId
            )
          }
        }
      };
    }
    case 'CHANGE_DEFAULT_CATEGORY': {
      const { boardId, categoryId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            defaultCategory: categoryId
          }
        }
      };
    }
    case 'CHANGE_CATEGORY': {
      const { boardId, categoryId, name, short, color } = action.payload;

      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            categories: state[boardId].settings.categories.map(cat =>
              cat._id == categoryId ? { ...cat, name, short, color } : cat
            )
          }
        }
      };
    }
    case 'CHANGE_EVENT_CALENDAR_ID': {
      const { boardId, eventCalendarId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            eventCalendarId
          }
        }
      };
    }
    case 'CHANGE_EVENT_CALENDAR_FILTER': {
      const { boardId, eventFilter } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          settings: {
            ...state[boardId].settings,
            eventFilter
          }
        }
      };
    }
    case 'DELETE_BOARD': {
      const { boardId } = action.payload;
      const { [boardId]: deletedBoard, ...restOfBoards } = state;
      return restOfBoards;
    }

    default:
      return state;
  }
};

export default boardsById;
