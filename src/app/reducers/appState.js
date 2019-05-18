const appState = (
  state = { settingsMenuOpen: false, settingsPending: false },
  action
) => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS_MENU': {
      const { settingsMenuOpen } = action.payload;

      return { ...state, settingsMenuOpen };
    }
    case 'SETTINGS_PENDING': {
      const { settingsPending } = action.payload;

      return { ...state, settingsPending };
    }
    default:
      return state;
  }
};

export default appState;
