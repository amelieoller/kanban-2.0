import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '../Atoms/IconButton';
import ModalPickerStyles from './ModalPickerStyles';

const Category = ({ toggleModal, dispatch, card, categories }) => {
  const handleSave = category => {
    if (card.category !== category) {
      if (category.color === 'white') {
        dispatch({
          type: 'DELETE_CARD_CATEGORY',
          payload: { cardId: card._id }
        });
      } else {
        dispatch({
          type: 'CHANGE_CARD_CATEGORY',
          payload: { categoryId: category._id, cardId: card._id }
        });
      }
    }

    toggleModal();
  };

  return (
    <ModalPickerStyles>
      {categories.map(category => (
        <IconButton
          onClick={() => handleSave(category)}
          key={category.name}
          background={category.color}
        >
          {category.short}
        </IconButton>
      ))}
    </ModalPickerStyles>
  );
};

Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

export default connect()(Category);
