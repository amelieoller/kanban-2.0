const appState = (
  state = {
    settingsMenuOpen: false,
    settingsPending: false,
    isInFocusMode: false
  },
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

    case 'TOGGLE_FOCUS_MODE': {
      const { defaultList } = action.payload;
      const { isInFocusMode } = state;

      const element = document.getElementsByName(defaultList)[0];
      if (element && !isInFocusMode) {
        const bodyRect = document.body.getBoundingClientRect().left;
        const elementRect = element.getBoundingClientRect().left;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - 220;

        window.scrollTo({
          left: offsetPosition,
          behavior: 'smooth'
        });
      }

      return { ...state, isInFocusMode: !isInFocusMode };
    }

    default:
      return state;
  }
};

export default appState;
