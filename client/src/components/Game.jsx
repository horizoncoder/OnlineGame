import React from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Stats from "./Stats";
import { incrementAction, DECREMENT } from "../actions";

class Game extends React.Component {
  static initialBoard(size) {
    const state = {
      boardSize: size,
      numRed: 0,
      numBlue: 0,
      turn: "red",
      winMessage: "",
      lineCoordinates: {},
      boxColors: {},
    };

    // палочки
    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < state.boardSize + 1; j += 1) {
        for (let k = 0; k < state.boardSize; k += 1) {
          state.lineCoordinates[`${i},${j},${k}`] = 0;
        }
      }
    }
    // квадраты
    for (let i = 0; i < state.boardSize; i += 1) {
      for (let j = 0; j < state.boardSize; j += 1) {
        state.boxColors[`${i},${j}`] = "white";
      }
    }
    return state;
  }

  static selectColor(int) {
    if (int === 0) {
      return "rgb(255,255,255)";
    }
    if (int === 1) {
      return "rgb(255,0,0)";
    }
    if (int === -1) {
      return "rgb(0,0,255)";
    }
    return false;
  }

  constructor(props) {
    super(props);
    const { count } = this.props;
    this.state = Game.initialBoard(count);
    this.PutLine = this.PutLine.bind(this);
    this.changeBoardSize = this.changeBoardSize.bind(this);
    this.tint = this.tint.bind(this);
    this.untint = this.untint.bind(this);
  }

  makeBoard(boardSize) {
    const cols = [];
    const { lineCoordinates } = this.state;
    const { boxColors } = this.state;
    for (let i = 0; i <= 2 * boardSize; i += 1) {
      // проверка на одинаковое количество строки
      const row = [];
      for (let j = 0; j <= 2 * boardSize; j += 1) {
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
                onMouseEnter={this.tint}
                onMouseLeave={this.untint}
                onClick={this.PutLine}
                role="presentation"
                style={{
                  backgroundColor: Game.selectColor(
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
              onMouseEnter={this.tint}
              onMouseLeave={this.untint}
              onClick={this.PutLine}
              role="presentation"
              style={{
                backgroundColor: Game.selectColor(
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
  }

  // поставить палочку
  PutLine(event) {
    const { lineCoordinates } = this.state;
    const { turn } = this.state;
    const currentCoord = event.target.dataset.coord;
    const { boxColors } = this.state;
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
            boxColors: newBoxColors,
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
            boxColors: newBoxColors,
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
            boxColors: newBoxColors,
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
            boxColors: newBoxColors,
          }));
        }
      }
      if (madeSquare === 0) {
        this.setState((prevState) => ({
          turn: prevState.turn === "red" ? "blue" : "red", // поменять цвет палки
        }));
      } else {
        this.checkGameOver();
      }
    }
  }

  changeBoardSize() {
    const { count } = this.props;
    if (window.confirm("Создать новое поле?")) {
      this.setState(() => Game.initialBoard(count));
    }
  }

  // закрасить квадарат
  tint(event) {
    const e = event;
    const { turn } = this.state;
    const { lineCoordinates } = this.state;
    const currentCoord = event.target.dataset.coord;
    if (lineCoordinates[currentCoord] === 0) {
      if (turn === "red") {
        e.target.style.backgroundColor = "rgba(255,0,0,0.5)";
      } else {
        e.target.style.backgroundColor = "rgba(0,0,255,0.5)";
      }
    }
  }

  untint(event) {
    const e = event;
    const { lineCoordinates } = this.state;
    const currentCoord = event.target.dataset.coord;
    if (lineCoordinates[currentCoord] === 0) {
      e.target.style.backgroundColor = "rgb(255,255,255)";
    }
  }

  // проверяем квадраты на заполнение
  checkSquare(y, z) {
    const { lineCoordinates } = this.state;
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
  // checkGameOver() {
  //   this.setState((prevState) => ({
  //     winMessage:
  //       prevState.numRed + prevState.numBlue === prevState.boardSize * 2
  //         ? console.log("Игра завершена")
  //         : "",
  //   }));
  // }

  render() {
    const { numRed } = this.state;
    const { numBlue } = this.state;
    const { turn } = this.state;
    const { boardSize } = this.state;
    const { count } = this.props;
    const { increment } = this.props;
    const { decrement } = this.props;
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
          </p>
          {board}
          <button type="submit" onClick={() => increment()}>
            Добавить
          </button>
          <button type="submit" onClick={() => decrement()}>
            Убавить
          </button>
          <button id="small" type="submit" onClick={this.changeBoardSize}>
            создать поле
          </button>
        </div>
        <div id="board">{this.makeBoard(boardSize)}</div>

        <Stats numBlue={numBlue} numRed={numRed} />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (x, y) => dispatch(incrementAction(x, y)),
    decrement() {
      dispatch({ type: DECREMENT });
    },
  };
};

const mapStateToProps = ({ Counter }) => {
  return {
    count: Counter.count,
    name: Counter.name,
  };
};

Game.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.number.isRequired,
  decrement: PropTypes.number.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
