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
          lists: [
            {
              _id: habitsListId,
              title: 'Habits',
              cards: [],
              special: 'habits'
            },
            {
              _id: completedListId,
              title: 'Completed',
              cards: [],
              special: 'completed'
            }
          ],
					users: [userId],
					stats: { habits: {} },
					settings: {
						pomodoro: { notification: true, audio: true },
						goals: {
							habits: 0
						},
						categories: [
							{ name: 'none', short: '', color: 'white', _id: categoryId }
						],
						defaultCategory: 'none',
						eventCalendarId: '',
						color: 'light',
						completedListId,
						habitsListId,
						sidebarOpen: {
							pomodoroOpen: true,
							eventsOpen: true,
							habitsOpen: true,
							tasksOpen: true
						}
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

		case 'REMOVE_HABIT': {
			const { cardId, boardId, date } = action.payload;

			const idIndex = state[boardId].stats.habits[date].findIndex(
				habitId => habitId === cardId
			);

			state[boardId].stats.habits[date].splice(idIndex, 1);

			return {
				...state,
				[boardId]: {
					...state[boardId],
					stats: {
						...state[boardId].stats,
						habits: {
							...state[boardId].stats.habits,
							[date]: state[boardId].stats.habits[date]
						}
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
			const { boardId, type, setting } = action.payload;
			return {
				...state,
				[boardId]: {
					...state[boardId],
					settings: {
						...state[boardId].settings,
						[type]: setting
					}
				}
			};
		}

		case 'CHANGE_SETTINGS': {
			const { boardId, changeObject } = action.payload;

			return {
				...state,
				[boardId]: {
					...state[boardId],
					settings: {
						...state[boardId].settings,
						...changeObject
					}
				}
			};
		}

		case 'CHANGE_SIDEBAR_OPEN': {
			const { boardId, type, setting } = action.payload;

			return {
				...state,
				[boardId]: {
					...state[boardId],
					settings: {
						...state[boardId].settings,
						sidebarOpen: {
							...state[boardId].settings.sidebarOpen,
							[type]: setting
						}
					}
				}
			};
		}

		// case 'CHANGE_LAST_CHECKIN': {
		//   const { boardId, checkinDate } = action.payload;
		//   return {
		//     ...state,
		//     [boardId]: {
		//       ...state[boardId],
		//       settings: {
		//         ...state[boardId].settings,
		//         checkinDate
		//       }
		//     }
		//   };
		// }

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

		case 'CHANGE_CATEGORY': {
			const { boardId, _id, name, short, color } = action.payload;

			return {
				...state,
				[boardId]: {
					...state[boardId],
					settings: {
						...state[boardId].settings,
						categories: state[boardId].settings.categories.map(cat =>
							cat._id === _id ? { ...cat, name, short, color } : cat
						)
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
