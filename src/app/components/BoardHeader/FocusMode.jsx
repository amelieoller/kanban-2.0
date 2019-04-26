import React from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import HeaderButtonStyles from '../styles/HeaderButtonStyles';

const FocusMode = ({ focusMode, changeFocusMode }) => (
  <HeaderButtonStyles onClick={changeFocusMode}>
    {focusMode ? <FiEye style={{ stroke: '#EA725B' }} /> : <FiEyeOff />}
  </HeaderButtonStyles>
);

export default FocusMode;
