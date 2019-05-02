import React from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import PropTypes from 'prop-types';
import HeaderButtonStyles from '../styles/HeaderButtonStyles';

const FocusMode = ({ focusMode, changeFocusMode }) => (
  <HeaderButtonStyles onClick={changeFocusMode}>
    {focusMode ? <FiEye style={{ stroke: '#EA725B' }} /> : <FiEyeOff />}
  </HeaderButtonStyles>
);

FocusMode.propTypes = {
  focusMode: PropTypes.bool,
  changeFocusMode: PropTypes.func
};

export default FocusMode;
