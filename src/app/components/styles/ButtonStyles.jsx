import styled from "styled-components";

const HeaderButtonStyles = styled.button`
  padding: 8px 10px 8px 10px;
  border-radius: 3px;
  color: ${props => props.theme.colors.negativeText};
  transition: background 0.1s;
  cursor: pointer;
  background: ${props => props.theme.colors.text};

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.transparentBlack};
  }
`;

export default HeaderButtonStyles;
