import React from 'react';
import styled from 'styled-components';
import BoardTitle from './BoardTitle';
import BoardSettings from './BoardSettings';
import LightDarkMode from './LightDarkMode';
import FocusMode from './FocusMode';

const BoardHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  color: ${props => props.theme.colors.white};
  z-index: 1;
  position: relative;

  .board-header-right {
    display: flex;
    flex-shrink: 0;
  }

  .vertical-line {
    width: 1px;
    height: 15px;
    margin: 0 10px;
    background: ${props => props.theme.colors.transparentWhite};
  }
`;

const BoardHeader = ({
  changeTheme,
  setBoardColor,
  focusMode,
  changeFocusMode
}) => (
  <BoardHeaderStyles>
    <BoardTitle />
    <div className="board-header-right">
      <FocusMode focusMode={focusMode} changeFocusMode={changeFocusMode} />
      <BoardSettings />
      <LightDarkMode changeTheme={changeTheme} setBoardColor={setBoardColor} />
    </div>
  </BoardHeaderStyles>
);

export default BoardHeader;
