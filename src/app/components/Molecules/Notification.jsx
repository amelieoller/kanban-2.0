import React, { useRef, useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import styled, { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
      segoe ui, arial, sans-serif;
    background: #f0f0f0;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

const Main = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #676767;
`;

const Container = styled('div')`
  position: fixed;
  z-index: 1000;
  width: 0 auto;
  top: ${props => (props.top ? '30px' : 'unset')};
  bottom: ${props => (props.top ? 'unset' : '30px')};
  margin: 0 auto;
  left: 30px;
  right: 30px;
  display: flex;
  flex-direction: ${props => (props.top ? 'column-reverse' : 'column')};
  pointer-events: none;
  align-items: ${props =>
    props.position === 'center' ? 'center' : `flex-${props.position || 'end'}`};
  @media (max-width: 680px) {
    align-items: center;
  }
`;

const Message = styled(animated.div)`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  width: 40ch;
  @media (max-width: 680px) {
    width: 100%;
  }
`;

const Content = styled('div')`
  color: white;
  background: #445159;
  opacity: 0.9;
  padding: 12px 22px;
  font-size: 1em;
  display: grid;
  grid-template-columns: ${props =>
    props.canClose === false ? '1fr' : '1fr auto'};
  grid-gap: 10px;
  overflow: hidden;
  height: auto;
  border-radius: 3px;
  margin-top: ${props => (props.top ? '0' : '10px')};
  margin-bottom: ${props => (props.top ? '10px' : '0')};
`;

const Button = styled('button')`
  cursor: pointer;
  pointer-events: all;
  outline: 0;
  border: none;
  background: transparent;
  display: flex;
  align-self: flex-end;
  overflow: hidden;
  margin: 0;
  padding: 0;
  padding-bottom: 14px;
  color: rgba(255, 255, 255, 0.5);
  :hover {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Life = styled(animated.div)`
  position: absolute;
  bottom: ${props => (props.top ? '10px' : '0')};
  left: 0px;
  width: auto;
  background-image: ${props =>
    `linear-gradient(130deg, ${props.theme.colors.secondaryDark}, ${
      props.theme.colors.secondary
    })`};
  height: 5px;
`;

let id = 0;

const MessageHub = ({ config, timeout, children }) => {
  const [refMap] = useState(() => new WeakMap());
  const [cancelMap] = useState(() => new WeakMap());
  const [items, setItems] = useState([]);
  const transitions = useTransition(items, item => item.key, {
    from: { opacity: 0, height: 0, life: '100%' },
    enter: item => async next =>
      await next({ opacity: 1, height: refMap.get(item).offsetHeight }),
    leave: item => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({ life: '0%' });
      await next({ opacity: 0 });
      await next({ height: 0 });
    },
    onRest: item => setItems(state => state.filter(i => i.key !== item.key)),
    config: (item, state) =>
      state === 'leave' ? [{ duration: timeout }, config, config] : config
  });

  useEffect(
    () =>
      void children(msg => setItems(state => [...state, { key: id++, msg }])),
    []
  );
  return (
    <Container>
      {transitions.map(({ key, item, props: { life, ...style } }) => (
        <Message key={key} style={style}>
          <Content ref={ref => ref && refMap.set(item, ref)}>
            <Life style={{ right: life }} />
            <p>{item.msg}</p>
            <Button
              onClick={e => {
                e.stopPropagation();
                cancelMap.has(item) && cancelMap.get(item)();
              }}
            >
              X
            </Button>
          </Content>
        </Message>
      ))}
    </Container>
  );
};

const Notification = ({ message }) => {
  const ref = useRef(null);

  return (
    <Main onClick={() => ref.current(message)}>
      <GlobalStyle />
      Click here to create notifications
      <MessageHub children={add => (ref.current = add)} />
    </Main>
  );
};

MessageHub.defaultProps = {
  config: { tension: 125, friction: 20, precision: 0.1 },
  timeout: 5000
};

MessageHub.propTypes = {
  config: PropTypes.object,
  timeout: PropTypes.number,
  children: PropTypes.func
};

Notification.defaultProps = {
  message: 'Notification'
};

Notification.propTypes = {
  message: PropTypes.string
};

export default Notification;
