import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ToolTipStyles = styled.span`
  position: relative;

  .tooltip-bubble {
    min-width: 100px;
    max-width: 150px;
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 50%;
    padding-top: 9px;
    transform: translateX(-50%);

    &::after {
      content: "";
      position: absolute;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: ${props => `9px solid ${props.theme.colors.monotoneAccent}`};
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .tooltip-message {
    background: ${props => props.theme.colors.monotoneAccent};
    border-radius: 3px;
    color: ${props => props.theme.colors.negativeText};
    font-size: 0.75rem;
    padding: 4px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      background-color: ${props => props.theme.colors.danger};
      padding: 4px 8px;
      border-radius: ${props => props.theme.sizes.borderRadius};
      color: ${props => props.theme.colors.text};
      cursor: pointer;
      margin-top: 3px;
    }
  }
`;

class ToolTip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTooltip: false
    };
  }

	hideTooltip() {
		this.setState({ displayTooltip: false });
	}

  showTooltip() {
    this.setState({ displayTooltip: true });
  }

  render() {
    const { message, button } = this.props;

    return (
			<ToolTipStyles onMouseLeave={() => this.hideTooltip()}>
        {this.state.displayTooltip && (
          <div className="tooltip-bubble">
            <div className="tooltip-message">
              {message}
              {button && button}
            </div>
          </div>
        )}
				<span onMouseOver={() => this.showTooltip()}>
          {this.props.children}
        </span>
      </ToolTipStyles>
    );
  }
}

export default ToolTip;
