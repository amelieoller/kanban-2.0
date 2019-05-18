import styled from 'styled-components';

const CardStyles = styled.div`
  .card-title {
    position: relative;
    box-sizing: border-box;
    border-radius: 3px;
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.elevatedTwo};
    box-shadow: ${props => props.theme.common.boxShadowOne};
    font-size: 15px;
    overflow-wrap: break-word;
    transition: box-shadow 0.15s;
    user-select: none;
    cursor: pointer !important;
    border-left: 3px solid transparent;
    margin: 0 0 5px 0;
    padding-right: 3px;

    &:hover,
    &:focus {
      background-color: ${props => props.theme.colors.elevatedThree};
      box-shadow: ${props => props.theme.common.boxShadowTwo};

      .checkmark {
        visibility: visible;
        opacity: 0.8;
        transition: visibility 0s linear 0s, opacity 200ms;
      }
    }
  }

  .card-title-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .checkmark {
    opacity: 0.7;
    padding: 4px;
    position: absolute;
    right: 3px;
    top: 3px;
    visibility: hidden;
    transition: visibility 0s linear 20ms, opacity 20ms;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.background};
      background-color: ${props => props.theme.colors.secondary};
    }
  }

  .card-title--drag {
    background-color: ${props => props.theme.colors.elevatedFour};
    box-shadow: ${props => props.theme.common.boxShadowThree} !important;
    opacity: 1 !important;
  }

  .card-title-html {
    padding: 5px;
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
