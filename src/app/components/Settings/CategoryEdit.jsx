import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';
import Input from './Input';
import SaveButton from '../Atoms/SaveButton';

const StyledCategoryEdit = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 45px 22px 16px;
  grid-column-gap: 10px;
  grid-template-rows: 24px;

  .delete-category {
    cursor: pointer;
  }
`;

const CategoryEdit = ({
  category,
  boardId,
  dispatch,
  handleSubmit,
  saveButton,
  handleSave
}) => {
  const [state, setState] = useState({
    name: category.name,
    short: category.short,
    color: category.color,
    _id: category._id
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (saveButton) return;
    
    const { name, short, color } = state;

    if (JSON.stringify(category) === JSON.stringify(state)) return;
    if (!name || !short || !color) return;

    handleSubmit(state);
  };

  const handleSaveButton = () => {
    const { name, short, color } = state;

    if (JSON.stringify(category) === JSON.stringify(state)) return;
    if (!name || !short || !color) return;

    handleSave(state);
    setState({ name: '', short: '', color: '', _id: '' });
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

  return (
    <StyledCategoryEdit>
      <Input
        name="name"
        placeholder="New Category"
        value={state.name}
        onChange={e => handleChange(e)}
        onBlur={onSubmit}
        onKeyDown={e => e.keyCode === 13 && onSubmit()}
      />

      <Input
        name="short"
        placeholder="Short"
        value={state.short}
        onChange={e => handleChange(e)}
        onBlur={onSubmit}
        onKeyDown={e => e.keyCode === 13 && onSubmit()}
      />

      <ColorPicker
        handleColorChange={categoryColor => {
          handleEditCategoryColorChange(categoryColor);
        }}
        previousColor={state.color}
        onSubmit={onSubmit}
      />

      {saveButton ? (
        <SaveButton
          changed={
            JSON.stringify(category) !== JSON.stringify(state) &&
            state.name !== ''
          }
          onClick={handleSaveButton}
        />
      ) : (
        <FiX
          className="delete-category"
          onClick={() => handleDelete(category._id)}
        />
      )}
    </StyledCategoryEdit>
  );
};

CategoryEdit.propTypes = {
  category: PropTypes.object,
  boardId: PropTypes.string,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  saveButton: PropTypes.bool,
  handleSave: PropTypes.func
};

export default CategoryEdit;
