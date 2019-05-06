import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiSave } from 'react-icons/fi';

const StyledSaveButton = styled.button`
  cursor: pointer;
  color: ${props => props.theme.colors.backgroundAccent};
  background: ${props =>
    props.changed
      ? props.theme.colors.mainAccent
      : props.theme.colors.monotoneAccent};
  padding: 2px 4px;
  border-radius: ${props => props.theme.sizes.borderRadius};

  &:hover {
    background: ${props => props.theme.colors.success};
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
