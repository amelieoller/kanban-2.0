import styled from "styled-components";

const SidebarStyles = styled.div`
  background-color: ${props => props.theme.backgroundAccent};
  /* width: 220px; */
  padding: 10px;
  /* margin-top: 40px; */
  box-shadow: ${props => props.theme.bs};
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default SidebarStyles;
