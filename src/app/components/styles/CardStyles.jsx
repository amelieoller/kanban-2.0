import styled from "styled-components";

const CardStyles = styled.div`
  .card-title {
    position: relative;
    box-sizing: border-box;
    margin: 5px 0 0 0;
    border-radius: 3px;
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.backgroundAccent};
    box-shadow: ${props => props.theme.common.bs};
    border: 1px solid ${props => props.theme.colors.mainBackground};
    font-size: 15px;
    overflow-wrap: break-word;
    transition: box-shadow 0.15s;
    user-select: none;
    cursor: pointer !important;
    border-right: 3px solid ${props => props.theme.colors.mainBackground};
    border-left: 3px solid transparent;
  }

  .difficulty-1.card-title {
    border-right-color: ${props => props.theme.colors.mainBackground};
  }

  .difficulty-2.card-title {
    border-right-color: ${props => props.theme.colors.mediumDifficulty};
  }

  .difficulty-3.card-title {
    border-right-color: ${props => props.theme.colors.mainAccent};
  }

  .card-title-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .checkmark {
    color: ${props => props.theme.colors.mainBackground};
    padding: 9px 8px 9px 4px;
  }

  .card-title:hover {
    background-color: ${props => props.theme.colors.cardHover};
  }

  .checkmark:hover {
    color: ${props => props.theme.colors.success};
  }

  .card-title:focus {
    box-shadow: 0px 0px 1px 3px rgb(0, 180, 255);
  }

  .card-title--drag {
    box-shadow: ${props => props.theme.common.bsDragging} !important;
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
`;

export default CardStyles;
