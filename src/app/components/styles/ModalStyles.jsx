import styled from "styled-components";

const ModalStyles = styled.span`
  .calendar-modal {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .calendar-underlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
  }

  .calendar {
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    background: white;
  }

  .calendar-buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;

    button {
      width: 120px;
      height: 30px;
      border: 0;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 700;
      transition: background 0.2s;
      cursor: pointer;
    }

    button:hover {
      background: #bbb;
    }

    .calendar-save-button {
      color: white;
      background: $success-button-color;
    }

    .calendar-save-button:hover {
      background: $success-button-color-hover;
    }
  }
`;

export default ModalStyles;
