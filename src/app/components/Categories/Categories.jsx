import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { FiX } from 'react-icons/fi';
import ColorPicker from './ColorPicker';
import ButtonStyles from '../styles/ButtonStyles';
import ExpandingInput from '../ExpandingInput';

const CategoriesStyles = styled.div`
  .edit-category-form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right-form-section {
      display: flex;
      align-items: center;
    }
    .edit-category {
      background: transparent;
      border: none;
      font-size: 16px;
      max-width: 140px;
      color: ${props => props.theme.colors.text};
    }
    .short {
      max-width: 40px;
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

const Categories = ({ categories, defaultCategory, match, dispatch }) => {
  const [state, setState] = useState({
    categoryName: '',
    categoryShort: '',
    categoryColor: '#F29985',
    defaultCategory: 'none'
  });

  const handleSubmit = e => {
    e.preventDefault();
    const { categoryName, categoryShort, categoryColor } = state;
    if (!categoryName || !categoryShort || !categoryColor) return;

    const { boardId } = match.params;
    const categoryId = shortid.generate();
    const category = {
      name: categoryName,
      short: categoryShort,
      color: categoryColor,
      _id: categoryId
    };

    dispatch({
      type: 'ADD_CATEGORY',
      payload: {
        boardId,
        category
      }
    });

    setState({ ...state, categoryName: '', categoryShort: '' });
  };

  const handleNewCategoryChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleEditCategoryChange = (e, id, type) => {
    setState({ ...state, [`${id}-${type}`]: e.target.value });
  };

  const handleEditCategoryColorChange = (color, id) => {
    setState({ ...state, [`${id}-color`]: color });
  };

  const handleEditCategorySubmit = (
    e,
    categoryId,
    oldName,
    oldShort,
    oldColor
  ) => {
    e.preventDefault();
    const { boardId } = match.params;
    const name = state[`${categoryId}-name`] || oldName;
    const short = state[`${categoryId}-short`] || oldShort;
    const color = state[`${categoryId}-color`] || oldColor;
    dispatch({
      type: 'CHANGE_CATEGORY',
      payload: {
        boardId,
        categoryId,
        name,
        short,
        color
      }
    });
  };

  const handleDelete = categoryId => {
    const { boardId } = match.params;
    dispatch({
      type: 'DELETE_CATEGORY',
      payload: {
        boardId,
        categoryId
      }
    });
  };

  const handleDefaultCategoryChange = categoryId => {
    const { boardId } = match.params;
    dispatch({
      type: 'CHANGE_DEFAULT_CATEGORY',
      payload: {
        boardId,
        categoryId
      }
    });
  };

  const { categoryName, categoryShort } = state;
  const filteredCategories = categories.filter(
    category => category.name !== ''
  );

  return (
    <CategoriesStyles>
      <h2>Categories</h2>
      <h3>Set Default Category:</h3>
      <form className="category-list">
        {filteredCategories.map(category => (
          <label key={category._id}>
            <input
              type="radio"
              value={category._id}
              checked={defaultCategory === category._id}
              onChange={() => handleDefaultCategoryChange(category._id)}
            />
            {category.name}
          </label>
        ))}
        <label key="none">
          <input
            type="radio"
            value="none"
            checked={defaultCategory === 'none'}
            onChange={() => handleDefaultCategoryChange('none')}
          />
          none
        </label>
      </form>
      <h3>Edit Categories:</h3>
      {filteredCategories.map(category => (
        <form
          action=""
          className="edit-category-form"
          onSubmit={e =>
            handleEditCategorySubmit(
              e,
              category._id,
              category.name,
              category.short,
              category.color
            )
          }
          key={category._id}
        >
          <ExpandingInput
            placeholder="Name"
            name="name"
            value={state[`${category._id}-name`] || category.name}
            onChange={e => handleEditCategoryChange(e, category._id, 'name')}
            max="140"
          />
          <div className="right-form-section">
            <ExpandingInput
              placeholder="Name"
              name="short"
              value={state[`${category._id}-short`] || category.short}
              onChange={e => handleEditCategoryChange(e, category._id, 'short')}
              max="30"
            />
            <ColorPicker
              handleColorChange={categoryColor =>
                handleEditCategoryColorChange(categoryColor, category._id)
              }
              previousColor={state[`${category._id}-color`] || category.color}
            />

            <FiX
              className="delete-button"
              onClick={() => handleDelete(category._id)}
            />
            <ButtonStyles>Save</ButtonStyles>
          </div>
        </form>
      ))}

      <h3>Add a New Category:</h3>
      <form onSubmit={handleSubmit} className="new-category-form">
        <div className="input-areas">
          <ExpandingInput
            placeholder="Name"
            name="categoryName"
            value={categoryName}
            onChange={handleNewCategoryChange}
            max=""
          />
          <ExpandingInput
            placeholder="Short"
            name="categoryShort"
            value={categoryShort}
            onChange={handleNewCategoryChange}
          />
        </div>

        <div className="buttons">
          <ColorPicker
            handleColorChange={categoryColor =>
              setState({ ...state, categoryColor })
            }
          />
          <ButtonStyles>Add Category</ButtonStyles>
        </div>
      </form>
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
  defaultCategory: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    categories: state.boardsById[boardId].settings.categories,
    defaultCategory: state.boardsById[boardId].settings.defaultCategory
  };
};

export default withRouter(connect(mapStateToProps)(Categories));
