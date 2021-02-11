import React from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Stats from "./Stats";
import { setBoardSize, calcSCore, switchTurn, checkSquare } from "../actions";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeBoard = () => {
    const cols = [];
    const { lineCoordinates, boxColors, count, turn } = this.props;

    for (let i = 0; i <= 2 * count; i += 1) {
      // проверка на одинаковое количество строки
      const row = [];
      for (let j = 0; j <= 2 * count; j += 1) {
        // проверка на одинаковое количество строки
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            row.push(
              <div
                className="dot"
                id={`dot${Math.floor(i / 2)},${Math.floor(j / 2)}`}
              />
            );
          } else {
            row.push(
              <div
                className={turn === "red" ? "horizonred" : "horizonblue"}
                onClick={this.PutLine}
                role="presentation"
                style={{
                  backgroundColor: this.selectColor(
                    lineCoordinates[
                      `0,${Math.floor(i / 2)},${Math.floor(j / 2)}`
                    ]
                  ),
                }}
                data-coord={`0,${Math.floor(i / 2)},${Math.floor(j / 2)}`}
              />
            );
          }
        } else if (j % 2 === 0) {
          row.push(
            <div
              data-coord={`1,${Math.floor(j / 2)},${Math.floor(i / 2)}`}
              className={turn === "red" ? "verticalred" : "verticalblue"}
              onClick={this.PutLine} // {() => putLine(`${ij}`)}
              role="presentation"
              style={{
                backgroundColor: this.selectColor(
                  lineCoordinates[`1,${Math.floor(j / 2)},${Math.floor(i / 2)}`]
                ),
              }}
            />
          );
        } else {
          row.push(
            <div
              className="box"
              id={`box${Math.floor(i / 2)},${Math.floor(j / 2)}`}
              style={{
                backgroundColor:
                  boxColors[`${Math.floor(i / 2)},${Math.floor(j / 2)}`],
              }}
            />
          );
        }
      }
      cols.push(<div className="colon">{row}</div>);
    }
    return <div id="game-board">{cols}</div>;
  };

  // поставить палочку

  PutLine = (e) => {
    const {
      lineCoordinates,
      boxColors,
      box,
      box2,
      box3,
      box4,
      count,
      turn,
      switchTurn,
      calcSCore,
      checkSquare,
      numBlue,
      numRed,
    } = this.props;
    if (lineCoordinates[e.target.dataset.coord] === 0) {
      // определяем кординаты

      lineCoordinates[e.target.dataset.coord] = turn === "red" ? 1 : -1;

      const splitCoord = e.target.dataset.coord.split(",");
      const x = splitCoord[0]; // x кордината
      const y = splitCoord[1]; // y кордината
      const z = splitCoord[2]; // z кордината

      //
      let madeSquare = 0;
      checkSquare(y, z);
      if (x === "0") {
        if (turn === "red") {
          // если квадрат заполнин  с 4 сторон меняем цвет
          //madeSquare = 1;
          boxColors[`${y},${z}`] = "green";
          calcSCore();
        } else {
          boxColors[`${y},${z}`] = "white";
        }
        if (turn === "red") {
          //madeSquare = 1;
          boxColors[`${parseFloat(y) - 1},${z}`] = "red";
          calcSCore();
        } else {
          boxColors[`${y},${z}`] = "blue";
        }
      } else {
        if (turn === "red") {
         // madeSquare = 1;
          boxColors[`${z},${y}`] = "red";
          calcSCore();
        } else {
          boxColors[`${y},${z}`] = "blue";
        }
        if (turn === "red") {
         // madeSquare = 1;
          boxColors[`${z},${parseFloat(y) - 1}`] = "red";
          calcSCore();
        } else {
          boxColors[`${y},${z}`] = "blue";
        }
      }
      if (madeSquare === 0) {
        switchTurn();
      } else if (numRed + numBlue + 1 === count * count) {
        alert("Игра завершина");
      }
    }
  };

  selectColor = (int) => {
    if (this.int === 0) {
      return "rgb(255,255,255)";
    }
    if (int === 1) {
      return "rgb(255,0,0)";
    }
    if (int === -1) {
      return "rgb(0,0,255)";
    }
    return false;
  };

  //проверяем квадраты на заполнение
  // checkSquare = (y, z) => {
  //   const { lineCoordinates, count } = this.props;
  //   const checker1 = Math.abs(lineCoordinates[`0,${y},${z}`]);
  //   const checker2 = Math.abs(
  //     parseFloat(y) + 1 > count
  //       ? 0
  //       : lineCoordinates[`0,${parseFloat(y) + 1},${z}`]
  //   );
  //   const checker3 = Math.abs(lineCoordinates[`1,${z},${y}`]);
  //   const checker4 = Math.abs(
  //     parseFloat(z) + 1 > count
  //       ? 0
  //       : lineCoordinates[`1,${parseFloat(z) + 1},${y}`]
  //   );
  //   return checker1 + checker2 + checker3 + checker4;
  // };

  render() {
    const { winMessage } = this.state;
    const {
      setBoardSize,
      count,
      turn,
      numBlue,
      numRed,
      box,
      box2,
      box3,
    } = this.props;
    const board = `Размер поля ${count} на ${count} `;
    return (
      <div id="game">
        <div id="header">
          <h1>Точки и квадраты</h1>
          <p id="score">
            Красный:
            {numRed}
            Синий:
            {numBlue}
            {turn}
            {box}
            {box2}
            {box3}
            {winMessage}
          </p>
          {board}
          <button type="submit" onClick={() => setBoardSize(2)}>
            2x2
          </button>
          <button type="submit" onClick={() => setBoardSize(4)}>
            4x4
          </button>
          <button id="small" type="submit" onClick={() => setBoardSize(6)}>
            6x6
          </button>
        </div>
        <div id="board">{this.makeBoard(count)}</div>

        <Stats numBlue={numBlue} numRed={numRed} />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setBoardSize: (size) => dispatch(setBoardSize(size)),
    switchTurn: () => dispatch(switchTurn()),
    calcSCore: () => dispatch(calcSCore()),
    checkSquare: (y, z) => dispatch(checkSquare(y, z)),
  };
};

const mapStateToProps = ({ Counter }) => {
  const {
    turn,
    box,
    box2,
    box3,
    box4,
    numBlue,
    numRed,
    count,
    name,
    lineCoordinates,
    boxColors,
  } = Counter;
  return {
    count,
    box,
    box2,
    box3,
    box4,
    numBlue,
    numRed,
    name,
    lineCoordinates,
    boxColors,
    turn,
  };
};

Game.propTypes = {
  count: PropTypes.number.isRequired,
  lineCoordinates: PropTypes.number.isRequired,
  boxColors: PropTypes.number.isRequired,
  numBlue: PropTypes.number.isRequired,
  numRed: PropTypes.number.isRequired,
  setBoardSize: PropTypes.func.isRequired,
  turn: PropTypes.string.isRequired,
  calcSCore: PropTypes.func.isRequired,
  switchTurn: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
