import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Title } from 'react-head';
import slugify from 'slugify';
import classnames from 'classnames';
import Header from '../Header/Header';
import BoardAdder from './BoardAdder';
import HomeStyles from './HomeStyles';

class Home extends Component {
  static propTypes = {
    boards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        settings: PropTypes.shape({
          pomodoro: PropTypes.shape({
            notification: PropTypes.boolean,
            audio: PropTypes.boolean
          }).isRequired,
          color: PropTypes.string.isRequired
        }).isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    listsById: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render = () => {
    const { boards, listsById, history } = this.props;
    return (
      <HomeStyles>
        <Title>Home | Kanban 2.0</Title>
        <Header />
        <div className="main-content">
          <div className="boards">
            {boards.map(board => (
              <Link
                key={board._id}
                className={classnames('board-link', board.settings.color)}
                to={`/b/${board._id}/${slugify(board.title, {
                  lower: true
                })}`}
              >
                <div className="board-link-title">{board.title}</div>
                <div className="mini-board">
                  {board.lists.map(listId => (
                    <div
                      key={listId}
                      className="mini-list"
                      style={{
                        height: `${Math.min(
                          (listsById[listId].cards.length + 1) * 18,
                          100
                        )}%`
                      }}
                    />
                  ))}
                </div>
              </Link>
            ))}
            <BoardAdder history={history} />
          </div>
        </div>
      </HomeStyles>
    );
  };
}

const mapStateToProps = ({ boardsById, listsById }) => ({
  boards: Object.keys(boardsById).map(key => boardsById[key]),
  listsById
});

export default connect(mapStateToProps)(Home);
