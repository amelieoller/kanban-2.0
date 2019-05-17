import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalPickerStyles from './ModalPickerStyles';
import IconButton from '../Atoms/IconButton';

const Difficulty = ({ toggleModal, dispatch, card }) => {
  const handleSave = difficulty => {
    if (card.difficulty !== difficulty) {
      dispatch({
        type: 'CHANGE_CARD_DIFFICULTY',
        payload: { difficulty, cardId: card._id }
      });
    }

    toggleModal();
  };

  return (
    <ModalPickerStyles>
      {[
        { num: 1, color: '#EAECEE' },
        { num: 2, color: '#0075A3' },
        { num: 3, color: '#EA725B' }
      ].map(difficulty => (
        <IconButton
          key={difficulty.num}
          onClick={() => handleSave(difficulty.num)}
          background={difficulty.color}
        >
          {difficulty.num}
        </IconButton>
      ))}
    </ModalPickerStyles>
  );
};

Difficulty.propTypes = {
  dispatch: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default connect()(Difficulty);
