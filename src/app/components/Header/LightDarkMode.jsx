import React from 'react';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi';
import IconButton from '../Atoms/IconButton';

const LightDarkMode = ({ toggleTheme, boardColor }) => (
  <IconButton
    onClick={toggleTheme}
    color="background"
    className="no-focus-mode"
  >
    {boardColor === 'light' ? <FiMoon /> : <FiSun />}
  </IconButton>
);

LightDarkMode.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  boardColor: PropTypes.string.isRequired
};

export default LightDarkMode;
