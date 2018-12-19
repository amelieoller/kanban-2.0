import React from "react";
import BoardTitle from "./BoardTitle";
import BoardDeleter from "./BoardDeleter";
import BoardSettings from "./BoardSettings";
import LightDarkMode from "./LightDarkMode";

import "./BoardHeader.scss";

const BoardHeader = ({ changeTheme, setBoardColor }) => (
  <div className="board-header">
    <BoardTitle />
    <div className="board-header-right">
      <BoardSettings />
      <LightDarkMode changeTheme={changeTheme} setBoardColor={setBoardColor} />
      <BoardDeleter />
    </div>
  </div>
);

export default BoardHeader;
