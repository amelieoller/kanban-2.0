import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import shortid from 'shortid';
import CategoryEdit from './CategoryEdit';

const Categories = ({ categories, dispatch, boardId }) => {
  const handleSubmit = category => {
    const { name, short, color, _id } = category;

    dispatch({
      type: 'CHANGE_CATEGORY',
      payload: {
        boardId,
        _id,
        name,
        short,
        color
      }
    });
  };

  const handleNewCategorySubmit = category => {
    const { name, short, color } = category;
    const newCategory = {
      name,
      short,
      color,
      _id: shortid.generate()
    };

    dispatch({
      type: 'ADD_CATEGORY',
      payload: {
        boardId,
        category: newCategory
      }
    });
  };

  return (
    <>
      {categories
        .filter(category => category.short !== '')
        .map(category => (
          <CategoryEdit
            category={category}
            boardId={boardId}
            dispatch={dispatch}
            key={category._id}
            handleSubmit={handleSubmit}
          />
        ))}
      <CategoryEdit
        category={{ name: '', short: '', color: '', _id: '' }}
        boardId={boardId}
        dispatch={dispatch}
        handleSave={handleNewCategorySubmit}
        saveButton
      />
    </>
  );
};

Categories.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ boardId: PropTypes.string })
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  boardId: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const {
    boardsById: {
      [boardId]: {
        title,
        settings: { categories }
      }
    }
  } = state;

  return {
    boardTitle: title,
    categories,
    boardId
  };
};

export default withRouter(connect(mapStateToProps)(Categories));
