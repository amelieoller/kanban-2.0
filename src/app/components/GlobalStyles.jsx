import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	html {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		/* If overflow is hidden here it disables mobile vertical scrolling */
		/* overflow: hidden; */

		&::-webkit-scrollbar {
			width: 10px;
			height: 10px;
			background: ${props => props.theme.colors.scrollbarBackground};
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 3px;
			background: ${props => props.theme.colors.scrollbarForeground};
		}
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	* {
		outline: none;
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
		color: ${props => props.theme.colors.text};
	}

	ul {
    list-style: none;
    padding: 0;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid ${props => props.theme.colors.mainBackground};
    padding: 0;
    margin: 2px 0;
	}

  .header {
    font-size: 17px;
    color: ${props => props.theme.colors.text};
    font-weight: 400;
    overflow-wrap: break-word;
		text-transform: uppercase;

		.number {
			color: ${props => props.theme.colors.mainAccent};
			font-size: 17px;
			font-family: "Pacifico", cursive;
		}
	}

	.cursive-header {
    font-family: "Pacifico", cursive;
    color: ${props => props.theme.colors.text};
	}

	.badge {
		padding: 2px 4px;
		border-radius: ${props => props.theme.sizes.borderRadius};
		color: ${props => props.theme.colors.backgroundAccent};
		display: flex;
		align-items: center;
		justify-content: center;
	}

  .picker {
    width: 30px;
    height: 30px;
    margin: 2px;
    border: 1px ${props => props.theme.colors.text} solid;
		border-radius: ${props => props.theme.sizes.borderRadius};
		color: ${props => props.theme.colors.backgroundAccent};
  }

	.fade-enter {
		opacity: 0.01;
	}

	.fade-enter.fade-enter-active {
		opacity: 1;
		transition: opacity 500ms ease-in;
	}

	.fade-leave {
		opacity: 1;
	}

	.fade-leave.fade-leave-active {
		opacity: 0.01;
		transition: opacity 300ms ease-in;
	}

	.fade-appear {
		opacity: 0.01;
	}

	.fade-appear.fade-appear-active {
		opacity: 1;
		transition: opacity .5s ease-in;
	}

	.alert {
		padding: .6rem 1rem;
    margin: .5rem 0;
    border: 1px solid transparent;
    border-radius: .25rem;
	}

	.alert-error {
    background-color: #ffeeeb;
    border-color: #ffded9;
    color: ${props => props.theme.colors.mainAccent};
	}

	.small-button {
		font-size: 1.5rem;
		background-color: transparent;
		padding: 3px 4px;
		border-radius: 3px;
		border: 1px solid ${props => props.theme.colors.borderColor};
		transition: background 0.5s;
		cursor: pointer;
		min-width: 24px;
		color: ${props => props.theme.colors.text};

		&.selected {
			background-color: ${props => props.theme.colors.mainAccent};
			color: ${props => props.theme.colors.white};
		}

		&:hover {
			background-color: ${props => props.theme.colors.mainAccent};
			color: ${props => props.theme.colors.white};
		}

		@media ${props => props.theme.media.phone} {
			font-size: 1.8rem;
		}
	}

  .calendar-modal {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .calendar-underlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
  }
`;

export default GlobalStyles;
