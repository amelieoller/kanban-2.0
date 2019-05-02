import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi';
import HeaderButtonStyles from '../styles/HeaderButtonStyles';

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

    dispatch({
      type: 'CHANGE_BOARD_COLOR',
      payload: { boardId, color: boardColor === 'light' ? 'dark' : 'light' }
    });
  };

  return (
    <HeaderButtonStyles onClick={changeBoardColor} className="no-focus-mode">
      {boardColor === 'light' ? <FiMoon /> : <FiSun />}
    </HeaderButtonStyles>
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
