import styled from 'styled-components';
// import { media } from "../Theme";

// Header position has to fixed as the user scrolls to the right. Because of a limitation in react-beautiful-dnd library
// the drag-drop context can only have one scroll container so the entire board has to be scrolled. Therefore,
// header has to be part of the page that is being scrolled and as a workaround we use position:fixed.

const HeaderStyles = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100vw;
  height: ${props => `${props.theme.sizes.headerHeight}px`};
  padding: 5px;
  background: #555;
  z-index: 2;
  transition: background 0.3s;
  box-shadow: ${props => props.theme.common.bs};
  background: ${props => props.theme.colors.headerBackground};
  position: fixed;
  box-shadow: 0 5px 10px 0px #55555529;

  .header-title {
    display: inline-flex;
    align-items: center;
    color: white;
    font-size: 22px;
    font-weight: 700;
    text-decoration: none;
    font-family: 'Pacifico', cursive;

    @media ${props => props.theme.media.tablet} {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .header-title img {
    height: 30px;
  }

  .header-right-side {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    color: white;
  }

  .user-thumbnail {
    height: 100%;
    border-radius: ${props => props.theme.sizes.borderRadius};
    margin: 0 6px;
  }

  .guest-icon {
    padding-top: 2px;
    font-size: 24px;
  }

  .signout-link {
    padding: 3px 5px 1px 5px;
    margin-left: 12px;
    color: white;
    text-decoration: none;
  }

  .signout-link:focus,
  .signout-link:hover {
    color: ${props => props.theme.colors.transparentBlack};
  }

  .signout-icon {
    padding-bottom: 2px;
    font-size: 22px;
  }

  .user-thumbnail,
  .guest-icon {
    @media ${props => props.theme.media.tablet} {
      display: none;
    }
  }

  .signout-link {
    @media ${props => props.theme.media.tablet} {
      margin-left: 0px;
    }
  }
`;

export default HeaderStyles;
