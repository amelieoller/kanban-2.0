import React, { Component } from "react";
import PropTypes from "prop-types";
import Swipe from "react-easy-swipe";
import classnames from "classnames";

const overlayStyle = options => ({
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1001,
  background: "rgba(0, 0, 0, 0.3)",
  opacity: 0,
  transition: `opacity 0.3s, transform 0s 0.3s`,
  transform: `translate3d(-100%, 0px, 0px)`
});

const overlayActiveStyle = options => ({
  ...overlayStyle(options),
  opacity: 1,
  transition: `opacity 0.3s`,
  transform: "none"
});

const menuOuterStyle = options => ({
  position: "fixed",
  left: "inherit",
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 1002,
  width: options.width,
  maxWidth: "80%",
  transition: `transform 0.3s`,
  transform: `translate3d(100%, 0px, 0px)`,
  transformOrigin: "left",
  backgroundColor: "white"
});

const menuOuterActiveStyle = options => ({
  ...menuOuterStyle(options),
  transform: `translate3d(0px, 0px, 0px)`
});

const menuShadowStyle = options => ({
  position: "absolute",
  zIndex: -1,
  width: "100%",
  height: "100%",
  transition: `opacity 0.3s`,
  boxShadow: "0 0 15px 0 rgba(0, 0, 0, .2)",
  opacity: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

const menuShadowActiveStyle = options => ({
  ...menuShadowStyle(options),
  opacity: 1
});

const menuInnerStyle = options => ({
  height: "100%",
  paddingBottom: 0,
  overflowY: "auto"
});

const IDLE = "idle";
const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";

class SlideMenu extends Component {
  constructor() {
    super();
    this.state = {
      swiping: false,
      direction: IDLE,
      swipePosition: { x: 0, y: 0 },
      menuExtraStyle: {}
    };

    this.onSwipeStart = this.onSwipeStart.bind(this);
    this.onSwipeMove = this.onSwipeMove.bind(this);
    this.onSwipeEnd = this.onSwipeEnd.bind(this);
  }

  onSwipeStart(e) {
    if (this.props.isOpen) {
      this.setState({
        swiping: true
      });
    }
  }

  onSwipeMove(position, e) {
    if (this.state.swiping) {
      const options = this.getOptions();
      let direction = this.state.direction;

      if (direction === IDLE) {
        const swipeThreshold = options.width / 15;
        const pastThreshold =
          Math.abs(position.x) > swipeThreshold ||
          Math.abs(position.y) > swipeThreshold;

        if (pastThreshold) {
          if (
            ((!this.props.right && position.x < 0) ||
              (this.props.right && position.x > 0)) &&
            Math.abs(position.x) > Math.abs(position.y)
          ) {
            direction = HORIZONTAL;
          } else {
            direction = VERTICAL;
          }
        }
      }

      if (direction === HORIZONTAL) {
        const swipeClosing =
          (!this.props.right && position.x < 0) ||
          (this.props.right && position.x > 0);

        const translateX = swipeClosing ? position.x : 0;

        this.setState({
          direction,
          swipePosition: position,
          menuExtraStyle: {
            transform: `translate3d(${translateX}px, 0px, 0px)`,
            transition: "transform 0s"
          }
        });

        e.preventDefault();
      }

      if (direction === VERTICAL) {
        this.setState({
          direction,
          swipePosition: { x: 0, y: 0 },
          menuExtraStyle: {}
        });
      }
    }
  }

  onSwipeEnd(e) {
    const swipeCloseThreshold = this.getOptions().width / 3;
    if (
      (!this.props.right &&
        this.state.swipePosition.x < -swipeCloseThreshold) ||
      (this.props.right && this.state.swipePosition.x > swipeCloseThreshold)
    ) {
      this.props.closeCallback();
    }
    this.setState({
      swiping: false,
      direction: IDLE,
      swipePosition: { x: 0, y: 0 },
      menuExtraStyle: {}
    });
  }

  getOptions() {
    return {
      width: 350
    };
  }

  render() {
    const {
      isOpen,
      closeCallback,
      className,
      outerClassName,
      innerClassName,
      shadowClassName,
      children
    } = this.props;

    const options = this.getOptions();

    const baseMenuOuterStyle = isOpen
      ? menuOuterActiveStyle(options)
      : menuOuterStyle(options);
    const currentMenuOuterStyle = {
      ...baseMenuOuterStyle,
      ...this.state.menuExtraStyle
    };

    return (
      <div
        className={classnames("cheeseburger-menu", className, { open: isOpen })}
      >
        <div
          className="cheeseburger-menu-overlay"
          style={isOpen ? overlayActiveStyle(options) : overlayStyle(options)}
          onClick={closeCallback}
        />

        <Swipe
          onSwipeStart={this.onSwipeStart}
          onSwipeMove={this.onSwipeMove}
          onSwipeEnd={this.onSwipeEnd}
        >
          <div
            className={classnames("cheeseburger-menu-outer", outerClassName)}
            style={currentMenuOuterStyle}
          >
            <div
              className={classnames("cheeseburger-menu-inner", innerClassName)}
              style={menuInnerStyle(options)}
            >
              {children}
            </div>
            <div
              className={classnames(
                "cheeseburger-menu-shadow",
                shadowClassName
              )}
              style={
                isOpen
                  ? menuShadowActiveStyle(options)
                  : menuShadowStyle(options)
              }
            />
          </div>
        </Swipe>
      </div>
    );
  }
}

SlideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
  right: PropTypes.bool,
  className: PropTypes.string,
  outerClassName: PropTypes.string,
  innerClassName: PropTypes.string,
  shadowClassName: PropTypes.string,
  children: PropTypes.node
};

export default SlideMenu;
