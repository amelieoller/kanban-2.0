import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	html {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		overflow: hidden;

		&::-webkit-scrollbar {
			width: 10px;
			height: 10px;
			background: ${props => props.theme.monotoneAccent};
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 3px;
			background: ${props => props.theme.text};
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
		color: ${props => props.theme.text};
	}

	ul {
    list-style: none;
    padding: 0;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid ${props => props.theme.mainBackground};
    padding: 0;
    margin: 2px 0;
	}

  .header {
    font-size: 17px;
    color: ${props => props.theme.text};
    font-weight: 400;
    overflow-wrap: break-word;
		text-transform: uppercase;

		.number {
			color: ${props => props.theme.mainAccent};
			font-size: 23px;
			font-family: "Pacifico", cursive;
		}
	}

	.cursive-header {
    font-size: 16px;
    font-family: "Pacifico", cursive;
    color: ${props => props.theme.text};
	}

	.badge {
		padding: 2px 4px;
		border-radius: ${props => props.theme.borderRadius};
		color: ${props => props.theme.backgroundAccent};
		display: flex;
		align-items: center;
		justify-content: center;
	}

  .picker {
    width: 30px;
    height: 30px;
    margin: 2px;
    border: 1px ${props => props.theme.text} solid;
		border-radius: ${props => props.theme.borderRadius};
		color: ${props => props.theme.backgroundAccent};
  }
`;

export default GlobalStyles;
