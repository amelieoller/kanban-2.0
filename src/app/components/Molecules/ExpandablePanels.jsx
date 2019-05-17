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
  }

  .title-area:hover,
  .title-area:focus {
    color: ${props => props.theme.colors.primary};
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
  will-change: transform, opacity, height;
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

const Tree = memo(({ children, name, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? viewHeight + 30 : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`
    }
  });

  return (
    <Frame>
      <div className="title-area" onClick={() => setOpen(!isOpen)}>
        {children && isOpen ? (
          <FiMinusSquare
            style={{ ...toggle }}
            onClick={() => setOpen(!isOpen)}
          />
        ) : (
          <FiPlusSquare
            style={{ ...toggle }}
            onClick={() => setOpen(!isOpen)}
          />
        )}
        <Title>{name}</Title>
      </div>

      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height
        }}
      >
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  );
});

const ExpandablePanels = ({ children }) => (
  <div>
    {children.map((child, i) => (
      <Tree
        key={i}
        name={child.props.name}
        defaultOpen={child.props.defaultOpen}
      >
        {child}
      </Tree>
    ))}
  </div>
);

Tree.propTypes = {
  children: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  defaultOpen: PropTypes.bool
};

ExpandablePanels.propTypes = {
  children: PropTypes.array.isRequired
};

export default ExpandablePanels;
