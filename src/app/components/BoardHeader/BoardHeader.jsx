import React from "react";
import BoardTitle from "./BoardTitle";
import BoardSettings from "./BoardSettings";
import LightDarkMode from "./LightDarkMode";
import styled from "styled-components";

const BoardHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  color: ${props => props.theme.colors.white};
  z-index: 1;

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

const BoardHeader = ({ changeTheme, setBoardColor }) => (
  <BoardHeaderStyles>
    <BoardTitle />
    <div className="board-header-right">
      <BoardSettings />
      <LightDarkMode changeTheme={changeTheme} setBoardColor={setBoardColor} />
    </div>
  </BoardHeaderStyles>
);

export default BoardHeader;
