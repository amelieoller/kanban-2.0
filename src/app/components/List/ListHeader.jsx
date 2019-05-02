import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';

const ListHeaderStyles = styled.div`
  .list-title-button {
    flex-grow: 1;
    min-width: 50%;
    padding-top: 5px;
    border: none;
    border-top-left-radius: inherit;
    color: ${props => props.theme.colors.text};
    overflow-wrap: break-word;
    cursor: pointer !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  .list-title-textarea-wrapper {
    width: 100%;
    padding: 3px;
  }

  .list-title-textarea {
    float: left;
    box-sizing: border-box;
    width: 100%;
    padding-top: 2px;
    border: none;
    color: ${props => props.theme.colors.grey};
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
    overflow: hidden;
    resize: none;
    text-align: center;
  }

  .delete-list-button {
    font-size: 20px;
    cursor: pointer;
    padding-left: 6px;
    color: ${props => props.theme.colors.monotoneAccent};
    padding-bottom: 2px;
  }

  .delete-list-button:hover,
  .delete-list-button:focus {
    color: ${props => props.theme.colors.grey};
  }
`;

class ListTitle extends Component {
  static propTypes = {
    listTitle: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired,
    dragHandleProps: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.listTitle
    };
  }

  handleChange = e => {
    this.setState({ newTitle: e.target.value });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSubmit();
    } else if (e.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleSubmit = () => {
    const { newTitle } = this.state;
    const { listTitle, listId, dispatch } = this.props;
    if (newTitle === '') return;
    if (newTitle !== listTitle) {
      dispatch({
        type: 'CHANGE_LIST_TITLE',
        payload: { listTitle: newTitle, listId }
      });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { listTitle } = this.props;
    this.setState({ newTitle: listTitle, isOpen: false });
  };

  deleteList = () => {
    const { listId, cards, boardId, dispatch } = this.props;
    dispatch({
      type: 'DELETE_LIST',
      payload: { cards, listId, boardId }
    });
  };

  openTitleEditor = () => {
    this.setState({ isOpen: true });
  };

  handleButtonKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.openTitleEditor();
    }
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { dragHandleProps, listTitle } = this.props;

    return (
      <ListHeaderStyles>
        {isOpen ? (
          <div className="list-title-textarea-wrapper">
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              value={newTitle}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              className="list-title-textarea"
              onBlur={this.handleSubmit}
              spellCheck={false}
            />
          </div>
        ) : (
          <div
            {...dragHandleProps}
            role="button"
            tabIndex={0}
            onClick={this.openTitleEditor}
            onKeyDown={event => {
              this.handleButtonKeyDown(event);
              dragHandleProps.onKeyDown(event);
            }}
            className="list-title-button"
          >
            {listTitle}
            <FiTrash2
              role="button"
              tabIndex={0}
              className="delete-list-button"
              onClick={() => {
                if (window.confirm('Are you sure?')) this.deleteList();
              }}
              onKeyDown={() => {
                if (window.confirm('Are you sure?')) this.deleteList();
              }}
            />
          </div>
        )}
      </ListHeaderStyles>
    );
  }
}

export default connect()(ListTitle);
