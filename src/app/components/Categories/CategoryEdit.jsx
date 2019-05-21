import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';
import ExpandingInput from '../ExpandingInput';
import SaveButton from '../Atoms/SaveButton';

const CategoryEdit = ({ category, boardId, dispatch, handleSubmit }) => {
  const [state, setState] = useState({
    name: category.name || '',
    short: category.short || '',
    color: category.color || '#F29985',
    _id: category._id || ''
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleEditCategoryColorChange = color => {
    setState({ ...state, color });
  };

  const handleDelete = categoryId => {
    if (!state._id) {
      setState({ name: '', short: '', color: '', _id: '' });
      return;
    }

    dispatch({
      type: 'DELETE_CATEGORY',
      payload: {
        boardId,
        categoryId
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, short, color, _id } = state;

    if (JSON.stringify(category) === JSON.stringify(state)) return;
    if (!name || !short || !color) return;

    handleSubmit(e, state);

    if (!_id) {
      setState({ name: '', short: '', color: '', _id: '' });
    }
  };

  return (
    <form action="" className="edit-category-form" onSubmit={onSubmit}>
      <ExpandingInput
        placeholder="New Category"
        name="name"
        value={state.name}
        onChange={e => handleChange(e)}
        max="140"
      />
      <div className="right-form-section">
        <ExpandingInput
          placeholder="Short"
          name="short"
          value={state.short}
          onChange={e => handleChange(e)}
          max="40"
        />
        <ColorPicker
          handleColorChange={categoryColor =>
            handleEditCategoryColorChange(categoryColor)
          }
          previousColor={state.color || category.color}
        />

        <FiX
          className="delete-button"
          onClick={() => handleDelete(category._id)}
        />
        <SaveButton
          changed={
            JSON.stringify(category) !== JSON.stringify(state) &&
            state.name !== ''
          }
        />
      </div>
    </form>
  );
};

CategoryEdit.propTypes = {
  category: PropTypes.object,
  boardId: PropTypes.string,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default CategoryEdit;
