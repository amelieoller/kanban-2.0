import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Home from './Home/Home';
import BoardContainer from './Board/BoardContainer';
import LandingPage from './LandingPage';
import GlobalStyles from './GlobalStyles';
import { light, dark } from './Theme';

const App = ({ user, isGuest, boardTheme }) => (
  <ThemeProvider theme={boardTheme === 'light' ? light : dark}>
    <>
      <GlobalStyles />
      {user || isGuest ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/b/:boardId"
            render={props => <BoardContainer {...props} />}
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

App.propTypes = {
  user: PropTypes.object,
  isGuest: PropTypes.bool.isRequired,
  boardTheme: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  isGuest: state.isGuest,
  boardTheme: state.appState.boardTheme
});

// Use withRouter to prevent strange glitch where other components
// lower down in the component tree wouldn't update from URL changes
export default withRouter(connect(mapStateToProps)(App));
