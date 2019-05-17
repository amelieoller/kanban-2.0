import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Home from './Home/Home';
import BoardContainer from './Board/BoardContainer';
import LandingPage from './LandingPage';
import Settings from './Settings/Settings';
import GlobalStyles from './GlobalStyles';
import { light, dark } from './Theme';

const App = ({ user, isGuest }) => {
  const [lightTheme, setLightTheme] = useState(true);

  const setBoardColor = boardColor => {
    setLightTheme(boardColor === 'light');
  };

  return (
    <ThemeProvider theme={lightTheme ? light : dark}>
      <>
        <GlobalStyles />
        {user || isGuest ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/b/:boardId/:boardTitle/settings"
              component={Settings}
            />
            <Route
              path="/b/:boardId"
              render={props => (
                <BoardContainer
                  {...props}
                  changeTheme={() => setLightTheme(!lightTheme)}
                  setBoardColor={boardColor => setBoardColor(boardColor)}
                />
              )}
            />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Redirect to="/" />
          </Switch>
        )}
      </>
    </ThemeProvider>
  );
};

App.propTypes = {
  user: PropTypes.object,
  isGuest: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  isGuest: state.isGuest
});

// Use withRouter to prevent strange glitch where other components
// lower down in the component tree wouldn't update from URL changes
export default withRouter(connect(mapStateToProps)(App));
