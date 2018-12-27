import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { FiStar } from "react-icons/fi";
import styled from "styled-components";
import ChartistGraph from "react-chartist";

const GraphStyles = styled.div`
  .ct-series-a .ct-line {
    stroke: ${props => props.theme.colors.text};
    stroke-width: 2px;
    fill: none;
  }

  .ct-series-a .ct-point {
    stroke: ${props => props.theme.colors.mainAccent};
    stroke-width: 8px;
    stroke-linecap: round;
  }

  .ct-area {
    opacity: 0.4;
    fill: ${props => props.theme.colors.monotoneAccent};
  }

  .ct-label.ct-horizontal.ct-end {
    display: flex;
    position: relative;
    justify-content: flex-end;
    text-align: right;
    transform-origin: 100% 0;
    transform: translate(-63%) rotate(0deg);
    white-space: nowrap;
    font-size: 12px;
    color: ${props => props.theme.colors.grey};
    font-family: "Pacifico", cursive;
    margin-top: 3px;
  }
`;

const ProgressBarStyles = styled.div`
  .habit-target {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    align-items: center;

    .goal {
      color: ${props => props.theme.colors.monotoneAccent};
      display: flex;
      align-items: center;

      input {
        width: 17px;
        border: none;
        color: ${props => props.theme.colors.monotoneAccent};
        outline: none;
        text-align: right;
        background: transparent;
      }

      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
      }
    }

    .habit-progress-wrapper {
      background-color: ${props => props.theme.colors.mainBackground};
      width: 100%;
      float: left;
      margin-right: 15px;
      height: 13px;

      .habit-progress {
        background-color: ${props => props.theme.colors.success};
        width: 100%;
        height: 13px;
      }
    }
  }
`;

class HabitStats extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    const habits =
      this.props.stats.habits[date] && this.props.stats.habits[date].length;

    this.state = {
      number: habits || 0
    };
  }

  switchClass = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1,
      className: "number numberLarge"
    });

    setTimeout(() => {
      this.setState({
        className: "number"
      });
    }, 1200);
  };

  calculateLabel = num => {
    const today = new Date();
    today.setDate(today.getDate() - num);

		return moment(today).format("ddd");
  };

  calculateSeries = num => {
    const { stats, cards } = this.props;
    let result = 0;
    const today = new Date();
    today.setDate(today.getDate() - num);

    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;

    if (stats.habits[date]) {
      stats.habits[date].map(cardId => {
        if (cards[cardId]) result += cards[cardId].difficulty;
      });
    } else {
      return 0;
    }

    return result;
  };

  handleSettingsChange = (type, value) => {
    const { dispatch, boardId } = this.props;

    dispatch({
      type: "CHANGE_GOAL_SETTING",
      payload: { boardId, type, value }
    });
  };

  render = () => {
    const { habitGoals } = this.props;

    const calculateWidth = this.calculateSeries(0) / parseInt(habitGoals);
    const progressWidth =
      calculateWidth > 1 ? `100%` : `${calculateWidth * 100}%`;

    const data = {
      labels: [
        this.calculateLabel(4),
        this.calculateLabel(3),
        this.calculateLabel(2),
        this.calculateLabel(1),
        this.calculateLabel(0)
      ],
      series: [
        [
          this.calculateSeries(4),
          this.calculateSeries(3),
          this.calculateSeries(2),
          this.calculateSeries(1),
          this.calculateSeries(0)
        ]
      ]
    };

    const options = {
      low: 0,
      showArea: true,
      fullWidth: true,
      chartPadding: 12,
      axisX: {
        showGrid: false
      },
      axisY: {
        offset: 0,
        showLabel: false,
        showGrid: true
      },
      width: "100%",
      height: "140px"
    };

    return (
      <>
        <ProgressBarStyles>
          <div className="header">
            Habits · <span className="number">{this.calculateSeries(0)}</span>
          </div>
          <hr />
          <div className="habit-target">
            <div className="habit-progress-wrapper">
              <div
                className="habit-progress"
                style={{
                  width: progressWidth
                }}
              />
            </div>
            <span className="goal">
              <FiStar />
              <input
                type="number"
                onChange={e =>
                  this.handleSettingsChange("habits", e.target.value)
                }
                value={habitGoals}
              />
            </span>
          </div>
        </ProgressBarStyles>
        <GraphStyles>
          <ChartistGraph data={data} options={options} type="Line" />
        </GraphStyles>
      </>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  stats: state.boardsById[ownProps.boardId].stats,
  cards: state.cardsById,
  habitGoals: state.boardsById[ownProps.boardId].settings.goals.habits
});

export default connect(mapStateToProps)(HabitStats);
