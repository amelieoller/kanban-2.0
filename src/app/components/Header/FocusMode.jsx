import React from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import PropTypes from 'prop-types';
import IconButton from '../Atoms/IconButton';
import Tooltip from '../Atoms/Tooltip';

const FocusMode = ({ dispatch, isInFocusMode, defaultList }) => {
  const toggleFocusMode = () => {
    dispatch({
      type: 'TOGGLE_FOCUS_MODE',
      payload: { defaultList }
    });
  };

  return (
    <Tooltip tooltipText="Focus Mode">
      <IconButton onClick={toggleFocusMode} color="background">
        {isInFocusMode ? <FiEye style={{ stroke: '#EA725B' }} /> : <FiEyeOff />}
      </IconButton>
    </Tooltip>
  );
};

FocusMode.propTypes = {
  isInFocusMode: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  defaultList: PropTypes.string
};

export default FocusMode;
