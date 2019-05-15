import styled from 'styled-components';

const CardStyles = styled.div`
  .card-title {
    position: relative;
    box-sizing: border-box;
    margin: 5px 0 0 0;
    border-radius: 3px;
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.elevatedTwo};
    box-shadow: ${props => props.theme.common.boxShadowOne};
    font-size: 15px;
    overflow-wrap: break-word;
    transition: box-shadow 0.15s;
    user-select: none;
    cursor: pointer !important;
    border-right: 3px solid transparent;
    border-left: 3px solid transparent;
    display: flex;
    justify-content: space-between;

    &:hover {
      background-color: ${props => props.theme.colors.elevatedThree};
      box-shadow: ${props => props.theme.common.boxShadowTwo};
    }
  }

  .difficulty-1.card-title {
    border-right-color: transparent;
  }

  .difficulty-2.card-title {
    border-right-color: ${props => props.theme.colors.mediumDifficulty};
  }

  .difficulty-3.card-title {
    border-right-color: ${props => props.theme.colors.primary};
  }

  .card-title-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .checkmark {
    color: ${props => props.theme.colors.lightestGrey};
    padding: 9px;

    &:hover {
      color: ${props => props.theme.colors.success};
    }
  }

  /* .card-title:focus {
    box-shadow: 0px 0px 1px 3px rgb(0, 180, 255);
  } */

  .card-title--drag {
    background-color: ${props => props.theme.colors.elevatedFour};
    box-shadow: ${props => props.theme.common.boxShadowThree} !important;
    opacity: 1 !important;
  }

  .card-title-html {
    padding: 6px 4px 6px 8px;
    word-break: break-word;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 8px 0;
    }

    img {
      max-width: 100%;
    }

    p {
      margin: 4px 0;
    }

    code,
    pre {
      white-space: pre-wrap;
    }

    pre {
      margin: 4px 0;
      padding: 4px 2px;
      background: rgba(100, 100, 100, 0.08);
    }
  }

  .within-pomodoro.card-title {
    border-left: 3px solid ${props => props.theme.colors.secondary};
  }
`;

export default CardStyles;
