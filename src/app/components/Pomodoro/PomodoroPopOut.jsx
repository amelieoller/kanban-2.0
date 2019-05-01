import React from 'react';
import NewWindow from 'react-new-window/umd/react-new-window';
import PropTypes from 'prop-types';

const PomodoroPopOut = ({ children, toggleOpened }) => (
  <NewWindow
    onUnload={() => toggleOpened(false)}
    features={{ left: 0, top: 0, width: 250, height: 250 }}
  >
    {children}
  </NewWindow>
);

PomodoroPopOut.propTypes = {
  children: PropTypes.object,
  toggleOpened: PropTypes.func
};

export default PomodoroPopOut;
