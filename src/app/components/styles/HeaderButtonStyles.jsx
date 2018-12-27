import styled from "styled-components";

const HeaderButtonStyles = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 10px 8px 10px;
  border-radius: 3px;
  color: ${props => props.theme.colors.white};
  transition: background 0.1s;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.transparentBlack};
  }
`;

export default HeaderButtonStyles;
