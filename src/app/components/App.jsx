import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Home from "./Home/Home";
import BoardContainer from "./Board/BoardContainer";
import LandingPage from "./LandingPage/LandingPage";

const theme = {
  white: "#FFFFFF",
  lighterGrey: "#F7F8F8",
  lightGrey: "#EAECEE",
  grey: "#C9CFD3",
  darkGrey: "#51575D",
  black: "#272930",

  green: "#06C392",
  blue: "#0179BE",
  red: "#EA725B",

  darkGreen: "#03926d",
  darkBlue: "#00578a",
  darkRed: "#a03f2c",
  transparentBlue: "rgba(1, 121, 190, 0.75)",

  successButtonColor: "#06C392",
  successButtonColorHover: "#03926d",

  transparentBlack: "rgba(0, 0, 0, 0.2)",
  lessTransparentBlack: "rgba(39, 41, 48, 0.5)",
  transparentWhite: "rgba(255, 255, 255, 0.4)",

  listWidth: "300px",
	borderRadius: "3px",

  // Calculate Styles
  mainMargin: 40,
  boardWidth: 260,
  boardHeight: 140,
  boardMargin: 5,

  bs: "0 5px 18px 0 rgba(0, 0, 0, 0.03)",
  bsDragging: "0 7px 15px 0 rgba(0, 0, 0, 0.08)"
};

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		height: 100%;
		width: 100%;

		&::-webkit-scrollbar {
			width: 10px;
			height: 10px;
			background: ${theme.grey};
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 3px;
			background: ${theme.darkGrey};
		}
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	body {
		height: 100%;
		width: 100%;
		margin: 0;
		font-family: 'Roboto', sans-serif;
		line-height: 1;
	}

	#app {
		display: inline-flex;
		height: 100%;
		min-width: 100%;
	}

	button,
	span,
	a {
		vertical-align: baseline;
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
	}

	a {
		color: ${theme.darkGrey};
	}

	ul {
    list-style: none;
    padding: 0;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid ${theme.lightGrey};
    padding: 0;
    margin: 2px 0;
	}

  .header {
    font-size: 17px;
    color: ${theme.darkGrey};
    font-weight: 400;
    overflow-wrap: break-word;
    text-transform: uppercase;
	}

	.cursive-header {
    font-size: 16px;
    font-style: italic;
    font-family: "Pacifico", cursive;
    color: ${theme.darkGrey};
	}

	.badge {
		padding: 3px 5px 1px 5px;
		border-radius: ${theme.borderRadius};
		color: ${theme.white};
	}
`;

const App = ({ user, isGuest }) => {
  // Serve different pages depending on if user is logged in or not
  if (user || isGuest) {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/b/:boardId" component={BoardContainer} />
            <Redirect to="/" />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    );
  }

  // If not logged in, always redirect to landing page
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    </ThemeProvider>
  );
};

App.propTypes = { user: PropTypes.object, isGuest: PropTypes.bool.isRequired };

const mapStateToProps = state => ({ user: state.user, isGuest: state.isGuest });

// Use withRouter to prevent strange glitch where other components
// lower down in the component tree wouldn't update from URL changes
export default withRouter(connect(mapStateToProps)(App));
