import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import shortid from 'shortid';
import CategoryEdit from './CategoryEdit';

const CategoriesStyles = styled.div`
  .edit-category-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.1rem;

    .right-form-section {
      display: flex;
      align-items: center;

      > * {
        margin-left: 4px;
      }
    }

    .edit-category {
      background: transparent;
      border: none;
      font-size: 16px;
      max-width: 140px;
      color: ${props => props.theme.colors.text};
    }
  }

  .category-list {
    display: flex;
    flex-direction: column;
  }

  .new-category-form {
    label {
      display: inline-block;
    }

    .input-areas {
    }
    .buttons {
      display: flex;
      justify-items: center;
    }
    .new-input {
      display: block;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  }
`;

const Categories = ({ categories, defaultCategory, dispatch, boardId }) => {
  const handleSubmit = (e, category) => {
    e.preventDefault();
    const { name, short, color, _id } = category;

    if (_id) {
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
    } else {
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
    }
  };

  const filteredCategories = categories.filter(
    category => category.short !== ''
  );

  return (
    <CategoriesStyles>
      {filteredCategories.map(category => (
        <CategoryEdit
          category={category}
          boardId={boardId}
          defaultCategory={defaultCategory}
          dispatch={dispatch}
          key={category._id}
          handleSubmit={handleSubmit}
        />
      ))}

      <CategoryEdit
        category={{ name: '', short: '', color: '', _id: '' }}
        boardId={boardId}
        defaultCategory={defaultCategory}
        dispatch={dispatch}
        handleSubmit={handleSubmit}
      />
    </CategoriesStyles>
  );
};

Categories.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ boardId: PropTypes.string })
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  defaultCategory: PropTypes.string,
  boardId: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const {
    boardsById: {
      [boardId]: {
        title,
        settings: { categories, defaultCategory }
      }
    }
  } = state;

  return {
    boardTitle: title,
    categories,
    defaultCategory,
    boardId
  };
};

export default withRouter(connect(mapStateToProps)(Categories));
