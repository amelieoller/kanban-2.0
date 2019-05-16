import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi';
import IconButton from '../Atoms/IconButton';

const LightDarkMode = ({
  boardColor,
  setBoardColor,
  dispatch,
  boardId,
  changeTheme
}) => {
  useEffect(() => {
    setBoardColor(boardColor);
  }, []);

  const changeBoardColor = () => {
    changeTheme();
    const setting = boardColor === 'light' ? 'dark' : 'light';
    const type = 'color';

    dispatch({
      type: 'CHANGE_SETTING',
      payload: { boardId, setting, type }
    });
  };

  return (
    <IconButton
      onClick={changeBoardColor}
      color="background"
      className="no-focus-mode"
    >
      {boardColor === 'light' ? <FiMoon /> : <FiSun />}
    </IconButton>
  );
};

LightDarkMode.propTypes = {
  boardId: PropTypes.string.isRequired,
  boardColor: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  setBoardColor: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired
};

export default LightDarkMode;
