import styled from "styled-components";

const HomeStyles = styled.div`
  display: inline-flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #eee;
  overflow: auto;

  .main-content {
    display: inline-flex;
    flex-direction: column;
    width: ${props =>
      `${4 * props.theme.sizes.boardWidth + 8 * props.theme.sizes.boardMargin}px`};
    margin: ${props => `${props.theme.sizes.mainMargin}px`};
  }

  @media (max-width: ${props =>
      `${4 * props.theme.sizes.boardWidth +
        8 * props.theme.sizes.boardMargin +
        2 * props.theme.sizes.mainMargin}px`}) {
    .main-content {
      width: ${props =>
        `${3 * props.theme.sizes.boardWidth + 6 * props.theme.sizes.boardMargin}px`};
    }
  }

  @media (max-width: ${props =>
      `${3 * props.theme.sizes.boardWidth +
        6 * props.theme.sizes.boardMargin +
        2 * props.theme.sizes.mainMargin}px`}) {
    .main-content {
      width: ${props =>
        `${2 * props.theme.sizes.boardWidth + 4 * props.theme.sizes.boardMargin}px`};
    }
  }

  @media (max-width: ${props =>
      `${2 * props.theme.sizes.boardWidth +
        4 * props.theme.sizes.boardMargin +
        2 * props.theme.sizes.mainMargin}px`}) {
    .main-content {
      width: ${props =>
        `${props.theme.sizes.boardWidth + 2 * props.theme.sizes.boardMargin}px`};
      margin: ${props => `${props.theme.sizes.mainMargin}px 0`};
    }
  }

  .main-content h1 {
    margin: 20px 5px;
    font-size: 22px;
  }

  .boards {
    display: inline-flex;
    flex-wrap: wrap;
  }

  .board-link {
    box-sizing: border-box;
    width: ${props => `${props.theme.sizes.boardWidth}px`};
    height: ${props => `${props.theme.sizes.boardHeight}px`};
    margin: ${props => `${props.theme.sizes.boardMargin}px`};
    padding: 10px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 700;
    transition: background 0.1s;
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    color: white;
    overflow-wrap: break-word;
    text-decoration: none;
    background: ${props => props.theme.colors.mainBackground};

  }

  .board-link:hover,
  .board-link:focus {
    &.light {
      background: ${props => props.theme.colors.mainBackground};
    }

    &.dark {
      background: ${props => props.theme.colors.text};
    }

    &.blue {
      background: ${props => props.theme.colors.neutralHover};
    }
  }

  .board-link-title {
    padding-bottom: 5px;
  }

  .mini-board {
    display: flex;
    height: 100%;
  }

  .mini-list {
    display: inline-block;
    box-sizing: border-box;
    width: 24px;
    height: 100%;
    margin-right: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.25);
  }

  .add-board-button {
    box-sizing: border-box;
    width: ${props => `${props.theme.sizes.boardWidth}px`};
    height: ${props => `${props.theme.sizes.boardHeight}px`};
    margin: ${props => `${props.theme.sizes.boardMargin}px`};
    padding: 10px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 700;
    transition: background 0.1s;
    cursor: pointer;
    margin-bottom: 20px;
    border: 0;
    background: #ddd;
    color: #444;
  }

  .add-board-button:hover,
  .add-board-button:focus {
    background: #ccc;
  }

  .board-adder {
    box-sizing: border-box;
    width: ${props => `${props.theme.sizes.boardWidth}px`};
    height: ${props => `${props.theme.sizes.boardHeight}px`};
    margin: ${props => `${props.theme.sizes.boardMargin}px`};
    margin-bottom: 20px;
    padding: 8px;
    border-radius: 3px;
    background: #ddd;
    color: #444;
    font-size: 15px;
  }

  .submit-board-button {
    padding: 8px 12px 8px 12px;
    margin: 8px 0 0 0;
    border: none;
    border-radius: 3px;
    background: ${props => props.theme.colors.success};
    color: white;
    font-size: 14px;
    font-weight: 700;
    transition: background 0.2s;
    cursor: pointer;
  }

  .submit-board-button:focus,
  .submit-board-button:hover {
    background: ${props => props.theme.colors.successHover};
  }

  .submit-board-input {
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    border: 0;
    border-radius: 3px;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: 700;
    overflow: hidden;
    resize: none;
  }
`;

export default HomeStyles;
