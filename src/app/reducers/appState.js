const appState = (
  state = {
    settingsMenuOpen: false,
    isInFocusMode: false,
    boardTheme: 'light',
    isKeyboardOpen: false
  },
  action
) => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS_MENU': {
      const { settingsMenuOpen } = action.payload;

      return { ...state, settingsMenuOpen };
    }

    case 'TOGGLE_FOCUS_MODE': {
      const { defaultList } = action.payload;
      const { isInFocusMode } = state;

      const element = document.getElementsByName(defaultList)[0];
      if (element && !isInFocusMode) {
        const bodyRect = document.body.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const elementPosition = elementRect.left - bodyRect.left;
        let offsetPosition;

        if (bodyRect.width > 768) {
          offsetPosition = elementPosition - 230;
        } else {
          offsetPosition = elementPosition - 20;
        }

        window.scrollTo({
          left: offsetPosition,
          behavior: 'smooth'
        });
      }

      return { ...state, isInFocusMode: !isInFocusMode };
    }

    case 'SET_BOARD_THEME': {
      const { boardTheme } = action.payload;

      return { ...state, boardTheme };
    }

    case 'TOGGLE_KEYBOARD_OPEN': {
      const { isKeyboardOpen } = action.payload;

      return { ...state, isKeyboardOpen };
    }

    default:
      return state;
  }
};

export default appState;
