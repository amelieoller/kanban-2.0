import styled from "styled-components";

const PomodoroStyles = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-bottom: 30px;

  /* Main section
------------------------------- */
  .timer {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 6px;
  }

  /* Display */
  .time {
    font-size: 45px;
    font-weight: 400;
    color: ${props => props.theme.darkGrey};
    display: block;
    width: 100%;
    text-align: center;
  }

  .timeType {
    display: block;
    font-size: 20px;
    color: ${props => props.theme.darkGrey};
    font-weight: 300;
    width: 100%;
    text-align: center;
  }

  /* Time control */
  .btn {
    border: 0;
    background: ${props => props.theme.grey};
    color: ${props => props.theme.white};
    padding: 5px 0;
    border-radius: ${props => props.theme.borderRadius};
    width: 30px;
    margin: 1px;
    font-weight: 300;
    -webkit-transition: background 0.3s;
    transition: background 0.3s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn:hover {
    background: ${props => props.theme.darkGrey};
  }

  .btn:active,
  .btn:focus {
    outline: 0;
    background: ${props => props.theme.darkGrey};
  }

  .btnIcon {
    border: 0;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    width: 40px;
    height: 40px;
    background-size: 40px;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
    cursor: pointer;
  }

  .btnIcon:hover {
    opacity: 0.8;
  }

  .btnIcon:active,
  .btnIcon:focus {
    opacity: 0.5;
  }

  .btnIcon.pause {
    color: ${props => props.theme.grey};
  }

  .btnIcon.play {
    color: ${props => props.theme.red};
  }

  /* Bottom section
------------------------------- */

  .controls {
    padding: 2.5px 0;
  }

  .settings {
    width: 100%;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 10px 0;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    display: flex;
  }

  .check {
    display: inline-block;
    font-size: 12px;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
    margin: 0px 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #pomodori {
    width: 27px;
    border: none;
    color: ${props => props.theme.grey};
  }

  @media (max-width: 500px) {
    .check {
      width: 100%;
      margin: 10px;
    }
  }

  .checkTitle {
    color: ${props => props.theme.grey};
    display: inline-block;
    margin: 0px 4px 0px 7px;
    font-size: 15px;
  }

  /* Checkbox style and UI feedback */
  .check input[type="checkbox"] {
    display: none;
  }

  .check label {
    border: 1px solid ${props => props.theme.lightGrey};
    height: 10px;
    width: 10px;
    margin: 0;
    padding: 0;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
  }

  .check label:hover {
    cursor: pointer;
  }

  .check input[type="checkbox"]:checked + label {
    border: 1px solid ${props => props.theme.red};
  }

  .check input[type="checkbox"]:checked + label:after {
    background-color: ${props => props.theme.red};
    position: absolute;
    display: block;
    bottom: 4px;
    left: -3px;
    width: 10px;
    height: 4px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    content: "";
  }

  .check input[type="checkbox"]:checked + label:before {
    background-color: ${props => props.theme.red};
    position: absolute;
    display: block;
    bottom: 0px;
    right: -2px;
    width: 3px;
    height: 15px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    content: "";
  }

  .link {
    color: ${props => props.theme.darkGrey};
    text-decoration: none;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
  }

  .link:hover {
    opacity: 0.8;
  }

  .link:active,
  .link:focus {
    outline: 0;
    opacity: 0.5;
  }

  .container-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 6px 0;

    .time-switcher {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .done {
      padding-left: 3px;
      margin-bottom: 3px;
      color: ${props => props.theme.red};
      text-transform: capitalize;
      font-size: 22px;
      font-style: italic;
      font-family: "Pacifico", cursive;
    }
  }
  .play-count {
    display: flex;
    align-items: center;
  }
`;

export default PomodoroStyles;
