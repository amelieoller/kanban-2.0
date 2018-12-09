import React from "react";
import BoardTitle from "./BoardTitle";
import ColorPicker from "./ColorPicker";
import BoardDeleter from "./BoardDeleter";
import BoardSettings from "./BoardSettings";

import "./BoardHeader.scss";

const BoardHeader = () => (
  <div className="board-header">
    <BoardTitle />
    <div className="board-header-right">
			<BoardSettings />
      <ColorPicker />
      <BoardDeleter />
    </div>
  </div>
);

export default BoardHeader;
