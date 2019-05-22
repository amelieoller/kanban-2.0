import styled from 'styled-components';

const HomeStyles = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr;
  align-content: flex-start;
  background: #eeeeee;

  .main-content {
    padding: 60px 20px;

    .boards {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .board {
        box-sizing: border-box;
        width: ${props => `${props.theme.sizes.boardWidth}px`};
        height: ${props => `${props.theme.sizes.boardHeight}px`};
        margin: ${props => `${props.theme.sizes.boardMargin}px`};
        padding: 10px;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 500;
        transition: background 0.1s;
        cursor: pointer;
        display: inline-flex;
        flex-direction: column;
        color: #121212;
        overflow-wrap: break-word;
        text-decoration: none;
        background: #eeeeee;
        box-shadow: ${props => props.theme.common.boxShadowOne};

        .board-title {
          padding-bottom: 5px;
        }

        .mini-board {
          display: flex;
          height: 100%;

          .mini-list {
            display: inline-block;
            box-sizing: border-box;
            width: 24px;
            height: 100%;
            margin-right: 6px;
            border-radius: 3px;
            background: rgba(255, 255, 255, 0.25);
          }
        }

        &.light {
          background: #fcfcfc;
          color: rgba(0, 0, 0, 0.87);

          .mini-list {
            background: #e6e6e6;
          }
        }

        &.dark {
          background: #2e2e2e;
          color: rgba(255, 255, 255, 0.87);

          .mini-list {
            background: #515151;
          }
        }

        &:hover,
        &:focus {
          box-shadow: ${props => props.theme.common.boxShadowTwo};

          &.light {
            background: #f2f2f2;

            .mini-list {
              background: #bbbbbb;
            }
          }

          &.dark {
            background: #353535;

            .mini-list {
              background: #616161;
            }
          }
        }
      }

      /* Adding a new board */
      .add-board-button {
        box-sizing: border-box;
        width: ${props => `${props.theme.sizes.boardWidth}px`};
        height: ${props => `${props.theme.sizes.boardHeight}px`};
        margin: ${props => `${props.theme.sizes.boardMargin}px`};
        padding: 10px;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 500;
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
        font-weight: 500;
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
        font-weight: 500;
        overflow: hidden;
        resize: none;
      }
    }
  }
`;

export default HomeStyles;
