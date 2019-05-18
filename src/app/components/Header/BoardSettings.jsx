import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSettings } from 'react-icons/fi';
import SlideOutMenu from '../Settings/SlideOutMenu';
import Settings from '../Settings/Settings';
import IconButton from '../Atoms/IconButton';

const BoardSettings = ({ lists }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [changesPending, setChangesPending] = useState(false);

  const toggleChangesPending = changesBoolean => {
    setChangesPending(changesBoolean);
  };

  return (
    <>
      <SlideOutMenu
        isOpen={menuOpen}
        closeCallback={() => setMenuOpen(false)}
        right
        width={350}
      >
        <Settings
          closeMenu={() => setMenuOpen(false)}
          lists={lists}
          toggleChangesPending={toggleChangesPending}
          changesPending={changesPending}
        />
      </SlideOutMenu>
      <IconButton
        onClick={() => setMenuOpen(true)}
        color="background"
        className={changesPending ? `changesPending no-focus-mode` : 'no-focus-mode'}
      >
        <FiSettings />
      </IconButton>
    </>
  );
};

BoardSettings.propTypes = {
  lists: PropTypes.array.isRequired
};

export default BoardSettings;
