import React, { Component } from "react";
import "./Sidebar.scss";
import CardItem from "./CardItem";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
		const { completedList, dispatch } = this.props;

    return (
      <>
        <div className="sidebar-wrapper">
          <div className="header">Stats</div>
					<hr/>
          <p className="sub-header">Task Points:</p>
          <span className="points">{completedList.cards.length}</span>
          <p className="sub-header">Tasks Completed:</p>
          <ul>
            {completedList.cards.map((cardId, index) => (
              <CardItem key={cardId} cardId={cardId} index={index} dispatch={dispatch} />
            ))}
          </ul>
        </div>
      </>
    );
  };
}

export default Sidebar;
