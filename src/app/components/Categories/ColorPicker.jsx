import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ColorPickerStyles = styled.span`
  .color {
    width: 18px;
    height: 18px;
    border-radius: 2px;
    background: ${props =>
      `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${
        props.color.a
      })`};
  }

  .swatch {
    padding: 2px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    cursor: pointer;
  }

  .popover {
    position: absolute;
    right: 0;
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

const ColorPicker = ({ handleColorChange, previousColor }) => {
  let colorObject;
  if (previousColor) {
    const color = previousColor;
    const removeRgba = color.slice(4, 4) + color.slice(5, color.length - 1);
    const calculatedColor = removeRgba.split(', ');
    colorObject = {
      r: calculatedColor[0],
      g: calculatedColor[1],
      b: calculatedColor[2],
      a: calculatedColor[3]
    };
  } else {
    colorObject = {
      r: '242',
      g: '153',
      b: '133',
      a: '1'
    };
  }

  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState(colorObject);

  const handleChange = changedColor => {
    setColor(changedColor.rgb);

    handleColorChange(
      `rgba(${changedColor.rgb.r}, ${changedColor.rgb.g}, ${
        changedColor.rgb.b
      }, ${changedColor.rgb.a})`
    );
  };

  return (
    <ColorPickerStyles color={color}>
      <div
        className="swatch"
        role="button"
        onKeyDown={() => setShowPicker(!showPicker)}
        onClick={() => setShowPicker(!showPicker)}
        tabIndex={0}
      >
        <div className="color" />
      </div>
      {showPicker ? (
        <div className="popover">
          <div
            className="cover"
            role="button"
            onClick={() => setShowPicker(false)}
            onKeyDown={() => setShowPicker(false)}
            tabIndex={0}
          />
          <TwitterPicker
            color={color}
            colors={[
              '#555555',
              '#898999',
              '#E98D5A',
              '#F29985',
              '#FFC461',
              '#FFCD7B',
              '#8AC476',
              '#6AD08D',
              '#00BF96',
              '#00A3C0',
              '#0075A3',
              '#3A81CD',
              '#7AB6FF',
              '#5367CB',
              '#9C55A4'
            ]}
            onChange={handleChange}
            triangle="hide"
          />
        </div>
      ) : null}
    </ColorPickerStyles>
  );
};

ColorPicker.propTypes = {
  handleColorChange: PropTypes.func.isRequired,
  previousColor: PropTypes.string
};

export default ColorPicker;
