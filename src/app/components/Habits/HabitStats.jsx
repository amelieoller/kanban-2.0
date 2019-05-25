import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import ChartistGraph from 'react-chartist';
import Slider from '../Molecules/Slider';

const GraphStyles = styled.div`
  .ct-series-a .ct-line {
    stroke: ${props => props.theme.colors.text};
    stroke-width: 2px;
    fill: none;
  }

  .ct-series-a .ct-point {
    stroke: ${props => props.theme.colors.secondary};
    stroke-width: 8px;
    stroke-linecap: round;
  }

  .ct-area {
    opacity: 0.4;
    fill: ${props => props.theme.colors.elevatedOne};
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
    color: ${props => props.theme.colors.textSecondary};
    font-family: 'Pacifico', cursive;
    margin-top: 3px;
  }
`;

const ProgressBarStyles = styled.div`
  .habit-target {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;
    position: relative;

    .progress-text {
      position: absolute;
      font-size: 13px;
      font-family: Pacifico;
      right: 5px;
      bottom: 3px;
    }

    .habit-progress-wrapper {
      background-color: ${props => props.theme.colors.elevatedOne};
      width: 100%;
      float: left;
      height: 18px;
      border-radius: 8px;

      .habit-progress {
        background-color: ${props => props.theme.colors.secondary};
        width: 100%;
        height: 18px;
        border-radius: 8px;
      }
    }
  }
`;

const HabitStats = ({ stats, cards, dispatch, boardId, habitGoals }) => {
  const calculateLabel = num => {
    const today = new Date();
    today.setDate(today.getDate() - num);

    return moment(today).format('ddd');
  };

  const calculateSeries = num => {
    let result = 0;
    const today = new Date();
    today.setDate(today.getDate() - num);

    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;

    if (stats.habits[date]) {
      stats.habits[date].map(cardId => {
        if (cards[cardId]) result += 1;
        // if (cards[cardId]) result += cards[cardId].difficulty;
      });
    } else {
      return 0;
    }

    return result;
  };

  const handleSettingsChange = (type, v) => {
    const value = parseInt(v, 10);

    dispatch({
      type: 'CHANGE_GOAL_SETTING',
      payload: { boardId, type, value }
    });
  };

  const calculateWidth = calculateSeries(0) / parseInt(habitGoals, 10);
  const progressWidth = calculateWidth <= 0 ? 0 : calculateWidth * 100;

  const data = {
    labels: [
      calculateLabel(4),
      calculateLabel(3),
      calculateLabel(2),
      calculateLabel(1),
      calculateLabel(0)
    ],
    series: [
      [
        calculateSeries(4),
        calculateSeries(3),
        calculateSeries(2),
        calculateSeries(1),
        calculateSeries(0)
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
    width: '100%',
    height: '100px'
  };

  const progressMessage = () => {
    if (!progressWidth || progressWidth < 40) {
      return `Today's Progress`;
    }
    if (progressWidth < 70) {
      return `You Can Do This!`;
    }
    if (progressWidth >= 100) {
      return `All Done, Nice Job!`;
    }
    return `Almost there!`;
  };

  return (
    <>
      <ProgressBarStyles>
        <Slider
          value={habitGoals}
          onDragEnd={sliderValue => handleSettingsChange('habits', sliderValue)}
          beforeText="Goal"
        />
        <div className="habit-target">
          <span className="progress-text">{progressMessage()}</span>
          <div className="habit-progress-wrapper">
            <div
              className="habit-progress"
              style={{
                width: `${progressWidth >= 100 ? 100 : progressWidth}%`
              }}
            />
          </div>
        </div>
      </ProgressBarStyles>
      <GraphStyles>
        <ChartistGraph data={data} options={options} type="Line" />
      </GraphStyles>
    </>
  );
};

HabitStats.propTypes = {
  stats: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  habitGoals: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  stats: state.boardsById[ownProps.boardId].stats,
  cards: state.cardsById,
  habitGoals: state.boardsById[ownProps.boardId].settings.goals.habits
});

export default connect(mapStateToProps)(HabitStats);
