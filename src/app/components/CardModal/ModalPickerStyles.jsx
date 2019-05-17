import styled from 'styled-components';

const ModalPickerStyles = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: ${props => props.theme.sizes.borderRadius};
  background: ${props => props.theme.colors.background};
  width: 288px;
  flex-wrap: wrap;
  justify-content: flex-start;

  > * {
    margin: 3px;
    width: 35px;
  }
`;

export default ModalPickerStyles;
