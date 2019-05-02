import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSettings } from 'react-icons/fi';
import SlideOutMenu from '../Settings/SlideOutMenu';
import HeaderButtonStyles from '../styles/HeaderButtonStyles';
import Settings from '../Settings/Settings';

const BoardSettings = ({ listsById }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SlideOutMenu
        isOpen={menuOpen}
        closeCallback={() => setMenuOpen(false)}
        right
        width={350}
      >
        <Settings closeMenu={() => setMenuOpen(false)} listsById={listsById} />
      </SlideOutMenu>
      <HeaderButtonStyles
        onClick={() => setMenuOpen(true)}
        className="no-focus-mode"
      >
        <FiSettings />
      </HeaderButtonStyles>
    </>
  );
};

BoardSettings.propTypes = {
  listsById: PropTypes.object.isRequired
};

export default BoardSettings;
