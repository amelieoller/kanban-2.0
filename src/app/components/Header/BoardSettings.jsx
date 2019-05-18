import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSettings } from 'react-icons/fi';
import SlideOutMenu from '../Settings/SlideOutMenu';
import Settings from '../Settings/Settings';
import IconButton from '../Atoms/IconButton';

const BoardSettings = ({ lists }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SlideOutMenu
        isOpen={menuOpen}
        closeCallback={() => setMenuOpen(false)}
        right
        width={350}
      >
        <Settings closeMenu={() => setMenuOpen(false)} lists={lists} />
      </SlideOutMenu>
      <IconButton onClick={() => setMenuOpen(true)} color="background">
        <FiSettings />
      </IconButton>
    </>
  );
};

BoardSettings.propTypes = {
  lists: PropTypes.array.isRequired
};

export default BoardSettings;
