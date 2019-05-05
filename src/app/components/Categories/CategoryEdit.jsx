import React, { useState } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';
import ExpandingInput from '../ExpandingInput';

const SaveButton = styled.button`
  cursor: pointer;
  color: ${props => props.theme.colors.backgroundAccent};
  background: ${props =>
    props.changed
      ? props.theme.colors.mainAccent
      : props.theme.colors.monotoneAccent};
  padding: 2px 6px;
  border-radius: ${props => props.theme.sizes.borderRadius};

  &:hover {
    background: ${props => props.theme.colors.success};
  }
`;

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
        placeholder="Name"
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
          type="submit"
          changed={JSON.stringify(category) !== JSON.stringify(state)}
        >
          <FiSave />
        </SaveButton>
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
