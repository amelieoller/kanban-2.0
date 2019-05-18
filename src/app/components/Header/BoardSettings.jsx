import React from 'react';
import PropTypes from 'prop-types';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import SlideOutMenu from '../Settings/SlideOutMenu';
import Settings from '../Settings/Settings';
import IconButton from '../Atoms/IconButton';

const BoardSettings = ({
  lists,
  dispatch,
  settingsMenuOpen,
  settingsPending
}) => {
  const toggleSettingsMenu = bool => {
    dispatch({
      type: 'TOGGLE_SETTINGS_MENU',
      payload: { settingsMenuOpen: bool }
    });
  };

  return (
    <>
      <SlideOutMenu
        isOpen={settingsMenuOpen}
        closeCallback={() => toggleSettingsMenu(false)}
        right
        width={350}
      >
        <Settings
          closeMenu={() => toggleSettingsMenu(false)}
          lists={lists}
          settingsPending={settingsPending}
        />
      </SlideOutMenu>
      <IconButton
        onClick={() => toggleSettingsMenu(true)}
        color="background"
        className={
          settingsPending ? `changesPending no-focus-mode` : 'no-focus-mode'
        }
      >
        <FiSettings />
      </IconButton>
    </>
  );
};

BoardSettings.propTypes = {
  lists: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  settingsMenuOpen: PropTypes.bool.isRequired,
  settingsPending: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  settingsMenuOpen: state.appState.settingsMenuOpen,
  settingsPending: state.appState.settingsPending
});

export default connect(mapStateToProps)(BoardSettings);
