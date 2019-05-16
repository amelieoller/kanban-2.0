import React from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import PropTypes from 'prop-types';
import IconButton from '../Atoms/IconButton';

const FocusMode = ({ focusMode, changeFocusMode }) => (
  <IconButton onClick={changeFocusMode} color="background">
    {focusMode ? <FiEye style={{ stroke: '#EA725B' }} /> : <FiEyeOff />}
  </IconButton>
);

FocusMode.propTypes = {
  focusMode: PropTypes.bool,
  changeFocusMode: PropTypes.func
};

export default FocusMode;
