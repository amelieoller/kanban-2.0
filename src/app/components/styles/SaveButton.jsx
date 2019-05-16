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

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.success};
  }
`;

const SaveButton = ({ changed }) => (
  <StyledSaveButton type="submit" changed={changed}>
    <FiSave />
  </StyledSaveButton>
);

SaveButton.propTypes = {
  changed: PropTypes.bool
};

export default SaveButton;
