import React from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Stats from "./Stats";
import {
  incrementAction,
  decrementAction,
  boardsixAction,
  setBoardSize,
} from "../actions";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winMessage: "",
      numBlue: 0,
      numRed: 0,
    };
  }

  makeBoard = () => {
    const cols = [];
    const { count } = this.props;
    const { lineCoordinates, boxColors } = this.props;

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
                className="horizon"
                onMouseEnter={this.changeBackground}
                onMouseLeave={this.untint}
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
              className="vertical"
              onMouseEnter={this.changeBackground}
              onMouseLeave={this.untint}
              onClick={this.PutLine}
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
  PutLine = (event) => {
    const { turn } = this.state;
    const { numBlue, numRed } = this.state;
    const { lineCoordinates, boxColors, count, turnr } = this.props;
    const currentCoord = event.target.dataset.coord;
    if (lineCoordinates[currentCoord] === 0) {
      // определяем кординаты
      const newState = lineCoordinates;

      newState[currentCoord] = turn === "red" ? 1 : -1;

      const splitCoord = currentCoord.split(",");
      const x = splitCoord[0]; // x кордината
      const y = splitCoord[1]; // y кордината
      const z = splitCoord[2]; // z кордината

      const newBoxColors = boxColors;
      //
      let madeSquare = 0;
      if (x === "0") {
        if (this.checkSquare(y, z) === 4) {
          // если квадрат заполнин  с 4 сторон меняем цвет
          madeSquare = 1;
          newBoxColors[`${y},${z}`] =
            turn === "red" ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"; // по последний палочки меняем цвет квадрата
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed, // считаем очки
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
          }));
        }
        if (this.checkSquare(parseFloat(y) - 1, z) === 4) {
          madeSquare = 1;
          newBoxColors[`${parseFloat(y) - 1},${z}`] =
            turn === "red" ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
          }));
        }
      } else {
        if (this.checkSquare(z, y) === 4) {
          madeSquare = 1;
          newBoxColors[`${z},${y}`] =
            turn === "red" ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
          }));
        }
        if (this.checkSquare(z, parseFloat(y) - 1) === 4) {
          madeSquare = 1;
          newBoxColors[`${z},${parseFloat(y) - 1}`] =
            turn === "red" ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
          }));
        }
      }
      if (madeSquare === 0) {
        this.setState((prevState) => ({
          turn: prevState.turn === "red" ? "blue" : "red", // поменять цвет палки
        }));
        console.log(
          ` Красный ${numRed} Синий ${numBlue} Размер ${count * count} Всего ${
            numRed + numBlue
          }`
        );
      } else if (numRed + numBlue + 1 === count * count) {
        alert("Игра завершина");
      }
    }
  };

  changeBackground = (e) => {
    e.target.style.background = "rgba(255,0,0,0.5)";
  };

  NochangeBackground = (e) => {
    e.target.style.background = "rgb(255,255,255)";
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

  // проверяем квадраты на заполнение
  checkSquare(y, z) {
    const { lineCoordinates } = this.props;
    const { boardSize } = this.state;
    const checker1 = Math.abs(lineCoordinates[`0,${y},${z}`]);
    const checker2 = Math.abs(
      parseFloat(y) + 1 > boardSize
        ? 0
        : lineCoordinates[`0,${parseFloat(y) + 1},${z}`]
    );
    const checker3 = Math.abs(lineCoordinates[`1,${z},${y}`]);
    const checker4 = Math.abs(
      parseFloat(z) + 1 > boardSize
        ? 0
        : lineCoordinates[`1,${parseFloat(z) + 1},${y}`]
    );
    return checker1 + checker2 + checker3 + checker4;
  }

  // проверка конца игры

  render() {
    const { winMessage, numBlue, numRed } = this.state;
    const { setBoardSize, count,turnr } = this.props;
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
            {turnr}
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
    increment: () => dispatch(incrementAction()),
    decrement: () => dispatch(decrementAction()),
    boardsix: () => dispatch(boardsixAction()),
    setBoardSize: (size) => dispatch(setBoardSize(size)),
  };
};

const mapStateToProps = ({ Counter }) => {
  return {
    count: Counter.count,
    numBluer: Counter.numBluer,
    numRed: Counter.numRed,
    name: Counter.name,
    sizes: Counter.sizes,
    lineCoordinates: Counter.lineCoordinates,
    boxColors: Counter.boxColors,
    turnr: Counter.turnr,
  };
};

Game.propTypes = {
  count: PropTypes.number.isRequired,
  lineCoordinates: PropTypes.number.isRequired,
  boxColors: PropTypes.number.isRequired,
  numBluer: PropTypes.number.isRequired,
  numRed: PropTypes.number.isRequired,
  setBoardSize: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
