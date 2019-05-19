import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from 'react-head';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';
import List from '../List/List';
import ListAdder from '../ListAdder';
import Header from '../Header/Header';
import Sidebar from '../Sidebar';

const BoardStyles = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  align-content: space-between;
  background: ${props => props.theme.colors.background};
  max-height: 100vh;

  .no-focus-mode {
    filter: ${props => (props.isInFocusMode ? 'blur(3px)' : 'none')};
  }

  .changesPending svg {
    color: ${props => props.theme.colors.primary};
  }

  .lists {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 10px;
    grid-template-rows: minmax(
      calc(100vh - ${props => `${props.theme.sizes.headerHeight + 15}px`}),
      1fr
    );
    justify-content: flex-start;

    @media ${props => props.theme.media.tablet} {
      grid-template-rows: minmax(
        calc(
          100vh - ${props => `${props.theme.sizes.headerHeightMobile + 50}px`}
        ),
        1fr
      );
    }
    grid-auto-flow: column;
    scroll-snap-type: x proximity;
    margin: 0;
    max-height: calc(100vh - 220px);
    margin-top: ${props => `${props.theme.sizes.headerHeight}px`};
    margin-left: ${props => `${props.theme.sizes.sidebarWidth}px`};

    @media ${props => props.theme.media.tablet} {
      margin-left: 0;
      margin-top: ${props => `${props.theme.sizes.headerHeightMobile}px`};
    }
  }

  .lists:before,
  .lists:after {
    content: '';
    width: 10px;
  }
`;

class Board extends Component {
  static propTypes = {
    lists: PropTypes.arrayOf(
      PropTypes.shape({ _id: PropTypes.string.isRequired })
    ).isRequired,
    boardId: PropTypes.string.isRequired,
    boardTitle: PropTypes.string.isRequired,
    pomodoro: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    completedListId: PropTypes.string,
    habitsListId: PropTypes.string,
    color: PropTypes.string,
    isInFocusMode: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      startX: null,
      startScrollX: null,
      isKeyboardOpen: false
    };
  }

  // boardId is stored in the redux store so that it is available inside middleware
  componentDidMount = () => {
    const { boardId, dispatch, color } = this.props;
    dispatch({
      type: 'PUT_BOARD_ID_IN_REDUX',
      payload: { boardId }
    });

    dispatch({
      type: 'SET_BOARD_THEME',
      payload: { boardTheme: color }
    });
  };

  componentWillUnmount = () => {
    // const { dispatch, boardId } = this.props;
    // const checkinDate = new Date();
    // dispatch({
    //   type: 'CHANGE_LAST_CHECKIN',
    //   payload: { boardId, checkinDate }
    // });
  };

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, boardId, completedListId, habitsListId } = this.props;

    // Move list
    if (type === 'COLUMN') {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: 'MOVE_LIST',
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
        type: 'MOVE_CARD',
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
    if (target.className !== 'list-wrapper' && target.className !== 'lists') {
      return;
    }
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
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
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
      this.setState({ startX: null, startScrollX: null });
    }
  };

  handleWheel = ({ target, deltaY }) => {
    // Scroll page right or left as long as the mouse is not hovering a card-list (which could have vertical scroll)
    if (
      target.className !== 'list-wrapper' &&
      target.className !== 'lists' &&
      target.className !== 'open-composer-button' &&
      target.className !== 'list-title-button'
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

  toggleIsKeyboardOpen = isOpen => {
    this.setState({
      isKeyboardOpen: isOpen
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
      isInFocusMode
    } = this.props;
    const otherLists = lists.filter(
      list => list && list._id !== completedListId && list._id !== habitsListId
    );
    const { isKeyboardOpen } = this.state;

    return (
      <BoardStyles isInFocusMode={isInFocusMode}>
        <CSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Title>{boardTitle} | Kanban 2.0</Title>
          <Header isInFocusMode={isInFocusMode} />

          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable
              droppableId={boardId}
              type="COLUMN"
              direction="horizontal"
            >
              {provided => (
                <main className="lists" ref={provided.innerRef}>
                  {otherLists.map((list, index) => (
                    <List
                      list={list}
                      boardId={boardId}
                      index={index}
                      key={list._id}
                      toggleIsKeyboardOpen={this.toggleIsKeyboardOpen}
                      isKeyboardOpen={isKeyboardOpen}
                    />
                  ))}
                  {provided.placeholder}
                  <ListAdder boardId={boardId} />
                </main>
              )}
            </Droppable>
          </DragDropContext>
          <Sidebar
            pomodoro={pomodoro}
            boardId={boardId}
            isInFocusMode={isInFocusMode}
            isKeyboardOpen={isKeyboardOpen}
          />
        </CSSTransitionGroup>
      </BoardStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { board } = ownProps;
  const { completedListId, habitsListId, color } = state.boardsById[
    board._id
  ].settings;
  const { isInFocusMode } = state.appState;

  return {
    lists: board.lists.map(listId => state.listsById[listId]),
    boardTitle: board.title,
    boardColor: board.settings.color,
    boardId: board._id,
    pomodoro: board.settings.pomodoro,
    completedListId,
    habitsListId,
    color,
    isInFocusMode
  };
};

export default connect(mapStateToProps)(Board);
