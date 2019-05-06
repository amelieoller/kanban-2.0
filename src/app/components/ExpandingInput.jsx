import React, { Component } from 'react';
import PropTypes from 'prop-types';

const sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
};

const INPUT_PROPS_BLACKLIST = [
  'extraWidth',
  'injectStyles',
  'inputClassName',
  'inputRef',
  'inputStyle',
  'minWidth',
  'onAutosize',
  'placeholderIsMinWidth'
];

const cleanInputProps = inputProps => {
  INPUT_PROPS_BLACKLIST.forEach(field => delete inputProps[field]);
  return inputProps;
};

const copyStyles = (styles, node) => {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

const isIE =
  typeof window !== 'undefined' && window.navigator
    ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent)
    : false;

const generateId = () =>
  // we only need an auto-generated ID for stylesheet injection, which is only
  // used for IE. so if the browser is not IE, this should return undefined.
  isIE
    ? `_${Math.random()
        .toString(36)
        .substr(2, 12)}`
    : undefined;
class AutosizeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputWidth: props.minWidth,
      inputId: props.id || generateId()
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.copyInputStyles();
    this.updateInputWidth();
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps;

    if (id !== this.props.id) {
      this.setState({ inputId: id || generateId() });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { onAutosize } = this.props;
    const { inputWidth } = this.state;

    if (prevState.inputWidth !== inputWidth) {
      if (typeof onAutosize === 'function') {
        onAutosize(inputWidth);
      }
    }
    this.updateInputWidth();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  inputRef = el => {
    const { inputRef } = this.props;

    this.input = el;
    if (typeof inputRef === 'function') {
      inputRef(el);
    }
  };

  placeHolderSizerRef = el => {
    this.placeHolderSizer = el;
  };

  getInput = () => this.input;

  sizerRef = el => {
    this.sizer = el;
  };

  copyInputStyles() {
    if (!this.mounted || !window.getComputedStyle) {
      return;
    }
    const inputStyles = this.input && window.getComputedStyle(this.input);
    if (!inputStyles) {
      return;
    }
    copyStyles(inputStyles, this.sizer);
    if (this.placeHolderSizer) {
      copyStyles(inputStyles, this.placeHolderSizer);
    }
  }

  updateInputWidth() {
    if (
      !this.mounted ||
      !this.sizer ||
      typeof this.sizer.scrollWidth === 'undefined'
    ) {
      return;
    }
    let newInputWidth;
    const {
      placeholder,
      value,
      placeholderIsMinWidth,
      type,
      extraWidth,
      minWidth
    } = this.props;
    if (placeholder && (!value || (value && placeholderIsMinWidth))) {
      newInputWidth =
        Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
    } else {
      newInputWidth = this.sizer.scrollWidth + 2;
    }
    // add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
    const newExtraWidth =
      type === 'number' && extraWidth === undefined
        ? 16
        : parseInt(extraWidth) || 0;
    newInputWidth += newExtraWidth;
    if (newInputWidth < minWidth) {
      newInputWidth = minWidth;
    }
    const { inputWidth } = this.state;
    if (newInputWidth !== inputWidth) {
      this.setState({
        inputWidth: newInputWidth
      });
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }

  renderStyles() {
    // this method injects styles to hide IE's clear indicator, which messes
    // with input size detection. the stylesheet is only injected when the
    // browser is IE, and can also be disabled by the `injectStyles` prop.
    const { injectStyles } = this.props;
    const { inputId } = this.state;

    return isIE && injectStyles ? (
      <style
        dangerouslySetInnerHTML={{
          __html: `input#${inputId}::-ms-clear {display: none;}`
        }}
      />
    ) : null;
  }

  render() {
    const {
      defaultValue,
      value,
      style,
      inputStyle,
      inputClassName,
      className,
      placeholder
    } = this.props;
    const { inputWidth, inputId } = this.state;

    const sizerValue = [defaultValue, value, ''].reduce(
      (previousValue, currentValue) => {
        if (previousValue !== null && previousValue !== undefined) {
          return previousValue;
        }
        return currentValue;
      }
    );

    const wrapperStyle = { ...style };
    if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

    const newInputStyle = {
      boxSizing: 'content-box',
      width: `${inputWidth}px`,
      ...inputStyle,
      color: '#51575D'
    };

    const { ...inputProps } = this.props;
    cleanInputProps(inputProps);
    inputProps.className = inputClassName;
    inputProps.id = inputId;
    inputProps.style = newInputStyle;

    return (
      <div className={className} style={wrapperStyle}>
        {this.renderStyles()}
        <input {...inputProps} ref={this.inputRef} />
        <div ref={this.sizerRef} style={sizerStyle}>
          {sizerValue}
        </div>
        {placeholder ? (
          <div ref={this.placeHolderSizerRef} style={sizerStyle}>
            {placeholder}
          </div>
        ) : null}
      </div>
    );
  }
}

AutosizeInput.propTypes = {
  className: PropTypes.string, // className for the outer element
  defaultValue: PropTypes.any, // default field value
  extraWidth: PropTypes.oneOfType([
    // additional width for input element
    PropTypes.number,
    PropTypes.string
  ]),
  id: PropTypes.string, // id to use for the input, can be set for consistent snapshots
  injectStyles: PropTypes.bool, // inject the custom stylesheet to hide clear UI, defaults to true
  inputClassName: PropTypes.string, // className for the input element
  inputRef: PropTypes.func, // ref callback for the input element
  inputStyle: PropTypes.object, // css styles for the input element
  minWidth: PropTypes.oneOfType([
    // minimum width for input element
    PropTypes.number,
    PropTypes.string
  ]),
  onAutosize: PropTypes.func, // onAutosize handler: function(newWidth) {}
  onChange: PropTypes.func, // onChange handler: function(event) {}
  placeholder: PropTypes.string, // placeholder text
  placeholderIsMinWidth: PropTypes.bool, // don't collapse size to less than the placeholder
  style: PropTypes.object, // css styles for the outer element
  value: PropTypes.any // field value
};
AutosizeInput.defaultProps = {
  minWidth: 1,
  injectStyles: true
};

const ExpandingInput = ({ placeholder, onChange, name, value, max }) => (
  <AutosizeInput
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{
      background: '#eee',
      borderRadius: 5
    }}
    name={name}
    inputStyle={{
      border: 'none',
      borderBottom: '1px solid #999',
      padding: 2,
      fontSize: 16,
      background: 'transparent',
      outline: 'none',
      maxWidth: `${max}px`
    }}
  />
);

ExpandingInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  max: PropTypes.string
};

export default ExpandingInput;
