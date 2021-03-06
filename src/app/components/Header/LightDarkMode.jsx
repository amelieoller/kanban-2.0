import React from 'react';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi';
import IconButton from '../Atoms/IconButton';
import Tooltip from '../Atoms/Tooltip';

const handleToggleTheme = (dispatch, boardId, boardColor) => {
  const setting = boardColor === 'light' ? 'dark' : 'light';
  const type = 'color';

  dispatch({
    type: 'SET_BOARD_THEME',
    payload: { boardTheme: setting }
  });

  dispatch({
    type: 'CHANGE_SETTING',
    payload: { boardId, setting, type }
  });
};

const LightDarkMode = ({ dispatch, boardId, boardColor }) => (
  <Tooltip tooltipText={`${boardColor === 'light' ? 'Dark' : 'Light'} Mode`}>
    <IconButton
      onClick={() => handleToggleTheme(dispatch, boardId, boardColor)}
      color="background"
      className="no-focus-mode"
    >
      {boardColor === 'light' ? <FiMoon /> : <FiSun />}
    </IconButton>
  </Tooltip>
);

LightDarkMode.propTypes = {
  boardColor: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired
};

export default LightDarkMode;
