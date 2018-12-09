import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { XYPlot, XAxis, VerticalBarSeries } from "react-vis";
import moment from "moment";
import { FiStar } from "react-icons/fi";
import styled from "styled-components";

const HabitStatsStyles = styled.div`
  .habit-target {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;

    .goal {
      color: ${props => props.theme.grey};
      display: flex;
      align-items: center;

      input {
        width: 17px;
        border: none;
        color: ${props => props.theme.grey};
        outline: none;
        text-align: right;
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
      background-color: ${props => props.theme.lightGrey};
      width: 100%;
      float: left;
      margin-right: 15px;

      .habit-progress {
        background-color: ${props => props.theme.green};
        width: 100%;
        height: 20px;
      }
    }
  }

  .number-container {
    text-align: center;
    padding: 10px 10px;

    .numberLarge {
      font-size: 60px;
    }

    .chart-hover {
      height: 8px;
      color: ${props => props.theme.grey};
      line-height: 10px;
      text-align: center;

      .number {
        font-weight: 700;
        font-size: 24px;
      }
    }

    .rv-xy-plot {
      position: relative;
      left: -18px;
    }

    .rv-xy-plot__axis {
      fill: ${props => props.theme.grey};
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
      number: habits || 0,
      index: null,
      datapoint: null
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

  calculateHabits = num => {
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
      const day = new Date(date);
      return {
        x: moment(day).format("dd"),
        y: 0,
        z: date,
        a: moment(day).format("dddd")
      };
    }

		const day = new Date(date);
    return {
      x: moment(day).format("dd"),
      y: result,
      z: date,
      a: moment(day).format("dddd")
    };
  };

  handleSettingsChange = (type, value) => {
    const { dispatch, boardId } = this.props;

    dispatch({
      type: "CHANGE_GOAL_SETTING",
      payload: { boardId, type, value }
    });
  };

  render = () => {
    const { index, datapoint } = this.state;
    const { habitGoals } = this.props;

    const data = [
      this.calculateHabits(3),
      this.calculateHabits(2),
      this.calculateHabits(1),
      this.calculateHabits(0)
    ].map((d, i) => ({
      ...d,
      color: i === index ? "#EA725B" : "#C9CFD3"
    }));

    const myPalette = ["#EA725B", "#C9CFD3"];
    const calculateWidth = this.calculateHabits(0).y / parseInt(habitGoals);
    const progressWidth =
      calculateWidth > 1 ? `100%` : `${calculateWidth * 100}%`;

    return (
      <HabitStatsStyles>
        <div className="header">
          Habit Stats ·{" "}
          <span className="number">{this.calculateHabits(0).y}</span>
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
        <div className="number-container">
          <div className="chart-hover">
            {datapoint && `${datapoint.a}: ${datapoint.y}`}
          </div>

          <XYPlot
            xType="ordinal"
            width={200}
            height={120}
            colorDomain={[0, 1]}
            colorRange={myPalette}
            colorType="literal"
            onMouseLeave={() => this.setState({ index: null, datapoint: null })}
          >
            <XAxis />
            <VerticalBarSeries
              data={data}
              stroke="white"
              onNearestX={(datapoint, { index }) =>
                this.setState({ index, datapoint })
              }
            />
          </XYPlot>
        </div>
      </HabitStatsStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  stats: state.boardsById[ownProps.boardId].stats,
  cards: state.cardsById,
  habitGoals: state.boardsById[ownProps.boardId].settings.goals.habits
});

export default connect(mapStateToProps)(HabitStats);
