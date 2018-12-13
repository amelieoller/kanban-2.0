import React, { Component } from "react";
import { TwitterPicker } from "react-color";
import styled from "styled-components";

const ColorPickerStyles = styled.span`
  .color {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    background: ${props =>
      `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${
        props.color.a
      })`};
  }
  .swatch {
    padding: 3px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    cursor: pointer;
  }
  .popover {
    position: absolute;
    z-index: 2;
  }
  .cover {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    let colorObject;
    if (props.previousColor) {
      const color = props.previousColor;
      const removeRgba = color.slice(4, 4) + color.slice(5, color.length - 1);
      const calculatedColor = removeRgba.split(", ");
      colorObject = {
        r: calculatedColor[0],
        g: calculatedColor[1],
        b: calculatedColor[2],
        a: calculatedColor[3]
      };
    } else {
      colorObject = {
        r: "242",
        g: "153",
        b: "133",
        a: "1"
      };
    }

    this.state = {
      displayColorPicker: false,
      color: colorObject
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.rgb });
    this.props.handleColorChange(
      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    );
  };

  render() {
    const { color } = this.state;

    return (
      <ColorPickerStyles color={color}>
        <div className="swatch" onClick={this.handleClick}>
          <div className="color" />
        </div>
        {this.state.displayColorPicker ? (
          <div className="popover">
            <div className="cover" onClick={this.handleClose} />
            <TwitterPicker
              color={this.state.color}
              colors={[
                "#555555",
                "#898999",
                "#E98D5A",
                "#F29985",
                "#FFC461",
                "#FFCD7B",
                "#8AC476",
                "#6AD08D",
                "#00BF96",
                "#00A3C0",
                "#0075A3",
                "#3A81CD",
                "#7AB6FF",
                "#5367CB",
                "#9C55A4",
              ]}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </ColorPickerStyles>
    );
  }
}
