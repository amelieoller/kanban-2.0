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
    border-right: 3px solid transparent;
    margin: 0 0 5px 0;
    padding-right: 3px;

    .minutes-wrapper {
      margin-top: 2px;
      margin-left: 4px;

      svg {
        color: ${({ theme }) => theme.colors.elevated};
        height: 25px;
      }

      .minutes {
        letter-spacing: -1px;
        font-family: "Pacifico", cursive;
        font-size: .72rem;
        position: absolute;
        left: ${props => props.minutePosition};
        top: 10px;    
        color: ${({ theme }) => theme.colors.cardButtonHover};
      }
    }

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

    /* @media ${props => props.theme.media.tablet} {
      font-size: 17px;
    } */
  }

  .card-title-top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;    
  }

  .checkmark {
    opacity: 0.7;
    padding: 4px;
    position: absolute;
    right: 2px;
    top: 3px;
    visibility: hidden;
    transition: visibility 0s linear 20ms, opacity 20ms;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.secondary};
      background: transparent;
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
      margin: 2px 0;
    }

    code,
    pre {
      white-space: pre-wrap;
    }

    pre {
      margin: 2px 0;
      padding: 4px 2px;
      background: rgba(100, 100, 100, 0.08);
    }

    ul {
      margin: 0;

      li {
        > p {
          display: inline;
        }

        &::before {
          content: '•';
          color: ${props => props.theme.colors.textSecondary};
          font-size: 1em;
          padding-right: 0.4rem;
          position: relative;
          top: 0em;
        }
      }
    }
  }

  .within-pomodoro.card-title {
    border-left: 3px solid ${props => props.theme.colors.secondary};
  }

  .with-category.card-title {
    border-right: 3px solid ${props => props.categoryColor};
  }
`;

export default CardStyles;
