import styled from "styled-components";

const CardStyles = styled.div`
  .card-title {
    position: relative;
    box-sizing: border-box;
    margin: 5px 4px 0 4px;
    border-radius: 3px;
    color: ${props => props.theme.darkGrey};
    background: ${props => props.theme.white};
    box-shadow: ${props => props.theme.bs};
    border: 1px solid ${props => props.theme.lightGrey};
    font-size: 15px;
    overflow-wrap: break-word;
    transition: box-shadow 0.15s;
    user-select: none;
    cursor: pointer !important;
    border-right: 3px solid ${props => props.theme.lightGrey};
    border-left: 3px solid transparent;
  }

  .within-pomodoro.card-title {
    border-left: 3px solid ${props => props.theme.green};
  }

  .difficulty-1.card-title {
    border-right-color: ${props => props.theme.lightGrey};
  }

  .difficulty-2.card-title {
    border-right-color: ${props => props.theme.blue};
  }

  .difficulty-3.card-title {
    border-right-color: ${props => props.theme.red};
  }

  .card-title-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .checkmark {
    color: ${props => props.theme.lightGrey};
    padding: 9px 8px 9px 4px;
    z-index: 2;
  }

  .card-title:hover {
    background-color: ${props => props.theme.lighterGrey};
  }

  .checkmark:hover {
    color: ${props => props.theme.green};
  }

  .card-title:focus {
    box-shadow: 0px 0px 1px 3px rgb(0, 180, 255);
  }

  .card-title--drag {
    box-shadow: ${props => props.theme.bsDragging} !important;
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
