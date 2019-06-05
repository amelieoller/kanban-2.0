import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Pacifico|Roboto:100,400,500');

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
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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

		&:hover,
		&:focus {
			color: ${props => props.theme.colors.textSecondary};
		}
	}

	ul {
    list-style: none;
    padding: 0;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid ${props => props.theme.colors.background};
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
			color: ${props => props.theme.colors.primary};
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
    color: ${props => props.theme.colors.primary};
	}

	.small-button {
		font-size: 1.5rem;
		background-color: transparent;
		padding: 3px 4px;
		border-radius: 3px;
		border: 1px solid ${props => props.theme.colors.textDisabled};
		transition: background 0.5s;
		cursor: pointer;
		min-width: 24px;
		color: ${props => props.theme.colors.text};
		box-shadow: ${props => props.theme.common.boxShadowButton};

		&.selected {
			background-color: ${props => props.theme.colors.secondary};
			color: ${props => props.theme.colors.onSecondary};
			border-color: ${props => props.theme.colors.secondaryDark};
		}

		&:active {
			box-shadow: ${props => props.theme.common.boxShadowButtonActive};
		}

		&:hover, &:focus {
			background-color: ${props => props.theme.colors.secondary};
			color: ${props => props.theme.colors.onSecondary};
			border-color: ${props => props.theme.colors.secondaryDark};
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
	
	.modal-underlay {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		opacity: 0;
		z-index: 3;
	}

	.ReactModal__Overlay--after-open {
		opacity: 1;
		transition: opacity 0.15s;
	}

	.ReactModal__Overlay--before-close {
		opacity: 0;
	}

	.modal {
		position: absolute;
		display: flex;
		align-items: flex-start;
		height: 0;
		outline: 0;
	}

	.modal-textarea-wrapper {
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		flex-direction: column;
		box-sizing: border-box;
		margin-bottom: 6px;
		border-radius: 3px;
		background: white;
		transition: background 0.2s;
		padding-left: 3px;
	}
	
	.modal-textarea-wrapper-shadow  {
		box-shadow: ${props => `0px 0px 3px 2px ${props.theme.colors.secondary}`};
	}

	.modal-textarea {
		flex-grow: 1;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 5px;
		border: 0;
		border-radius: inherit;
		color: inherit;
		background: inherit;
		font-family: inherit;
		font-size: 15px;
		line-height: inherit;
		resize: none;
		overflow: hidden;
		outline: none;

		@media ${props => props.theme.media.tablet} {
			font-size: 20px;
		}
	}

	.board-title-input {
		padding-right: 5px;
		
		input {
			color: inherit;
			font-weight: 400;
		}
	}
`;

export default GlobalStyles;
