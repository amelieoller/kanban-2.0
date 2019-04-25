import styled from 'styled-components';

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
    /* border-left: 3px solid transparent; */
    display: flex;
    justify-content: space-between;
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
    color: ${props => props.theme.colors.lighterGrey};
    padding: 9px;
    background-color: white;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(197, 198, 197, 0.15870098039215685) 44%,
      rgba(197, 198, 197, 0.5060399159663865) 100%
    );
  }

  .card-title:hover {
    background-color: ${props => props.theme.colors.cardHover};
  }

  .checkmark:hover {
    color: ${props => props.theme.colors.success};
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 173, 69, 0.42) 100%
    );
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
