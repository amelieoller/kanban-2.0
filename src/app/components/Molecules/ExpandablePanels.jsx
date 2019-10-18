import React, { memo, useState, useRef, useEffect } from 'react';
import { useSpring, a, animated } from 'react-spring';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import PropTypes from 'prop-types';

const Frame = styled('div')`
  position: relative;
  padding: 8px 0px 0px 0px;
  vertical-align: middle;
  color: ${props => props.theme.colors.text};
  fill: ${props => props.theme.colors.text};

  .title-area {
    cursor: pointer;
    transition: color 0.15s ease;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const Title = styled('span')`
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  font-family: 'Pacifico', cursive;
  color: ${props => props.theme.colors.text};
`;

const Content = styled(animated.div)`
  will-change: transform, opacity, visibility, height;
  overflow: hidden;

  & > div {
    margin: 10px 0 20px 0;
  }
`;

const toggle = {
  width: '1em',
  height: '1em',
  marginRight: 6,
  verticalAlign: 'middle'
};

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};

const useMeasure = () => {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
};

const Tree = memo(({ children, name, defaultOpen, dispatch, boardId }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, visibility, transform } = useSpring({
    from: {
      height: 0,
      opacity: 0,
      visibility: 'hidden',
      transform: 'translate3d(20px,0,0)'
    },
    to: {
      height: isOpen ? viewHeight + 30 : 0,
      opacity: isOpen ? 1 : 0,
      visibility: 'visible',
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`
    }
  });

  const handleClick = () => {
    const type = `${name.toLowerCase()}Open`;
    const setting = !isOpen;

    dispatch({
      type: 'CHANGE_SIDEBAR_OPEN',
      payload: { boardId, type, setting }
    });

    setOpen(setting);
  };

  return (
    <Frame>
      <div
        className="title-area"
        onClick={handleClick}
        onKeyDown={e => e.keyCode === 13 && handleClick()}
        tabIndex={0}
        role="button"
      >
        {children && isOpen ? (
          <FiMinusSquare style={{ ...toggle }} onClick={handleClick} />
        ) : (
          <FiPlusSquare style={{ ...toggle }} onClick={handleClick} />
        )}
        <Title>
          {name} {children.props.children}
        </Title>
      </div>

      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
          visibility: isOpen ? 'visible' : 'hidden'
        }}
      >
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  );
});

const ExpandablePanels = ({ children }) => (
  <div>
    {children.filter(Boolean).map((child, i) => (
      <Tree
        key={i}
        name={child.props.name}
        defaultOpen={child.props.defaultOpen}
        boardId={child.props.boardId}
        dispatch={child.props.dispatch}
      >
        {child}
      </Tree>
    ))}
  </div>
);

Tree.defaultProps = {
  defaultOpen: false
};

Tree.propTypes = {
  children: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  defaultOpen: PropTypes.bool,
  dispatch: PropTypes.func,
  boardId: PropTypes.string
};

ExpandablePanels.propTypes = {
  children: PropTypes.array.isRequired
};

export default ExpandablePanels;
