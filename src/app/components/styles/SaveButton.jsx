import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiSave } from 'react-icons/fi';

const StyledSaveButton = styled.button`
  cursor: pointer;
  color: ${props =>
    props.changed
      ? props.theme.colors.primary
      : props.theme.colors.monotoneAccent};
  background: transparent;
  font-size: ${props => `${props.fontSize}rem`};

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.success};
  }
`;

const SaveButton = ({ changed, onClick, fontSize }) => (
  <StyledSaveButton
    type="submit"
    changed={changed}
    onClick={onClick}
    fontSize={fontSize}
  >
    <FiSave />
  </StyledSaveButton>
);

SaveButton.defaultProps = {
  fontSize: 1
};

SaveButton.propTypes = {
  changed: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  fontSize: PropTypes.number
};

export default SaveButton;
