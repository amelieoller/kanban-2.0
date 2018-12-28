import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Title } from "react-head";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import List from "../List/List";
import ListAdder from "../ListAdder/ListAdder";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MobileFooter from "../MobileFooter/MobileFooter";

const BoardStyles = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	display: grid;
	grid-template-columns: 1fr;
	align-content: space-between;
	background: ${props => props.theme.colors.mainBackground};

  .lists {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 10px;
    grid-template-rows: minmax(calc(100vh - ${props =>
      `${props.theme.sizes.headerHeight +
        props.theme.sizes.footerHeight}px`}), 1fr);
    grid-auto-flow: column;
    grid-auto-columns: ${props => props.theme.sizes.listWidth};
    overflow-x: scroll;
    scroll-snap-type: x proximity;
		margin: 0;

		@media (max-width: 768px) {
      grid-template-rows: minmax(calc(100vh - ${props =>
        `${
          props.footerIsExpanded
            ? props.theme.sizes.headerHeight +
              props.theme.sizes.mobileFooterHeight +
              props.theme.sizes.mobileFooterHeightExpanded
            : props.theme.sizes.headerHeight +
              props.theme.sizes.mobileFooterHeight
        }px`}), 1fr);
    }
  }

  .lists:before,
  .lists:after {
    content: "";
    width: 10px;
  }

  /* main {
    height: calc(
      100vh -
        ${props =>
          `${
            props.footerIsExpanded
              ? props.theme.sizes.footerHeight + props.theme.sizes.headerHeight
              : 40 + props.theme.sizes.headerHeight
          }px`}
    );
    display: inline-flex;
    padding: 15px 5px;
    margin-top: ${props => `${props.theme.sizes.headerHeight}px`};

    @media (min-width: 768px) {
      height: calc(
        100vh -
          ${props =>
            `${props.theme.sizes.footerHeight +
              props.theme.sizes.headerHeight}px`}
      );
    }
  }

  .board-underlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    transition: background 0.3s;
    background: ${props => props.theme.colors.mainBackground};
  }

  .lists {
    display: inline-flex;
    align-items: flex-start;
    height: 100%;
    user-select: none;
  } */
`;

class Board extends Component {
  static propTypes = {
    lists: PropTypes.arrayOf(
      PropTypes.shape({ _id: PropTypes.string.isRequired })
    ).isRequired,
    boardId: PropTypes.string.isRequired,
    boardTitle: PropTypes.string.isRequired,
    boardColor: PropTypes.string.isRequired,
    pomodoro: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      startX: null,
      startScrollX: null,
      footerIsExpanded: false
    };
  }

  // boardId is stored in the redux store so that it is available inside middleware
  componentDidMount = () => {
    const { boardId, dispatch } = this.props;
    dispatch({
      type: "PUT_BOARD_ID_IN_REDUX",
      payload: { boardId }
    });
  };

  componentWillUnmount = () => {
    const { dispatch, boardId } = this.props;
    const checkinDate = new Date();

    dispatch({
      type: "CHANGE_LAST_CHECKIN",
      payload: { boardId, checkinDate }
    });
  };

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, boardId, completedListId, habitsListId } = this.props;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
            boardId: source.droppableId,
            completedListId,
            habitsListId
          }
        });
      }
      return;
    }
    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
          boardId
        }
      });
    }
  };

  // The following three methods implement dragging of the board by holding down the mouse
  handleMouseDown = ({ target, clientX }) => {
    if (target.className !== "list-wrapper" && target.className !== "lists") {
      return;
    }
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      startX: clientX,
      startScrollX: window.scrollX
    });
  };

  // Go to new scroll position every time the mouse moves while dragging is activated
  handleMouseMove = ({ clientX }) => {
    const { startX, startScrollX } = this.state;
    const scrollX = startScrollX - clientX + startX;
    window.scrollTo(scrollX, 0);
    const windowScrollX = window.scrollX;
    if (scrollX !== windowScrollX) {
      this.setState({
        startX: clientX + windowScrollX - startScrollX
      });
    }
  };

  // Remove drag event listeners
  handleMouseUp = () => {
    const { startX } = this.state;
    if (startX) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.setState({ startX: null, startScrollX: null });
    }
  };

  handleWheel = ({ target, deltaY }) => {
    // Scroll page right or left as long as the mouse is not hovering a card-list (which could have vertical scroll)
    if (
      target.className !== "list-wrapper" &&
      target.className !== "lists" &&
      target.className !== "open-composer-button" &&
      target.className !== "list-title-button"
    ) {
      return;
    }
    // Move the board 80 pixes on every wheel event
    if (Math.sign(deltaY) === 1) {
      window.scrollTo(window.scrollX + 80, 0);
    } else if (Math.sign(deltaY) === -1) {
      window.scrollTo(window.scrollX - 80, 0);
    }
  };

  changeContentHeight = footerIsExpanded => {
    this.setState({
      footerIsExpanded
    });
  };

  render = () => {
    const {
      lists,
      boardTitle,
      boardId,
      pomodoro,
      completedListId,
      habitsListId,
      changeTheme,
      setBoardColor
    } = this.props;
    const otherLists = lists.filter(
      list => list && list._id !== completedListId && list._id !== habitsListId
    );

    return (
      <BoardStyles footerIsExpanded={this.state.footerIsExpanded}>
        <Title>{boardTitle} | Kanban 2.0</Title>
        <Header changeTheme={changeTheme} setBoardColor={setBoardColor} />

        {/* <div className="lists">
          <div className="list">test</div>
          <div className="list">test</div>
          <div className="list">test</div>
          <div className="list">test</div>
          <div className="list">test</div>
          <div className="list">test</div>
        </div> */}

        {/* <main
          className="lists-wrapper"
          onMouseDown={this.handleMouseDown}
          onWheel={this.handleWheel}
        > */}
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
            {provided => (
              <main className="lists" ref={provided.innerRef}>
                {otherLists.map((list, index) => (
                  <List
                    list={list}
                    boardId={boardId}
                    index={index}
                    key={list._id}
                  />
                ))}
                {provided.placeholder}
                <ListAdder boardId={boardId} />
              </main>
            )}
          </Droppable>
        </DragDropContext>
        {/* </main> */}

        <Footer pomodoro={pomodoro} boardId={boardId} />
        <MobileFooter
          pomodoro={pomodoro}
          boardId={boardId}
          changeContentHeight={this.changeContentHeight}
        />

        {/* <Title>{boardTitle} | Kanban 2.0</Title>
        <Header changeTheme={changeTheme} setBoardColor={setBoardColor} />
        <main
          className="lists-wrapper"
          onMouseDown={this.handleMouseDown}
          onWheel={this.handleWheel}
        >
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable
              droppableId={boardId}
              type="COLUMN"
              direction="horizontal"
            >
              {provided => (
                <div className="lists" ref={provided.innerRef}>
                  {otherLists.map((list, index) => (
                    <List
                      list={list}
                      boardId={boardId}
                      index={index}
                      key={list._id}
                    />
                  ))}
                  {provided.placeholder}
                  <ListAdder boardId={boardId} />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
        <Footer pomodoro={pomodoro} boardId={boardId} />
        <MobileFooter
          pomodoro={pomodoro}
          boardId={boardId}
          changeContentHeight={this.changeContentHeight}
        />
        <div className="board-underlay" /> */}
      </BoardStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { board } = ownProps;
  const completedListId = state.boardsById[board._id].settings.completedListId;
  const habitsListId = state.boardsById[board._id].settings.habitsListId;

  return {
    lists: board.lists.map(listId => state.listsById[listId]),
    boardTitle: board.title,
    boardColor: board.settings.color,
    boardId: board._id,
    pomodoro: board.settings.pomodoro,
    completedListId,
    habitsListId
  };
};

export default connect(mapStateToProps)(Board);
