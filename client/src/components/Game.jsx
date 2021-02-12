import React from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Stats from "./Stats";
import { setBoardSize, calcSCore, switchTurn ,checkSquare} from "../actions";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
// в редрюсер
  // getBoxCoords.forEach(c => {
  //   lines[c] = turn === 'red' ? 1 : -1; // c === '011' 
  // });
  // const boxFilled = (boxCoord) =>{
  //   let col = 0;
  //   Object.keys(lines).forEach(coord => {
  //     const splitCoord = coord.split(",");
  //     const x = splitCoord[0]; // x кордината
  //     const y = splitCoord[1]; // y кордината
  //     const p = splitCoord[2]; // z кордината
  //     if (`${x}${y}` === boxCoord) {
  //       col = col +1;
  //     }
  //   });
  //   return col === 4;
  // }

  mBoard = () => {
    const sizeX = 2;
    const sizeY = 2;
    const getBoxCoords = (x, y, p) => {
      if (p === 0 && x > 0) {
        return [`${x - 1}${y}${2}`, `${x}${y}${p}`];
      }
      if (p === 1 && y > 0) {
        return [`${x}${y - 1}${3}`, `${x}${y}${p}`];
      }
      return [`${x}${y}${p}`];
    };
    const shouldSetLine = (x, y, p) => {
      if (p === 2 && x + 1 < sizeX) return false;
      if (p === 3 && y + 1 < sizeY) return false;
      return true;
    };
    const { lineCoordinates, boxColors, count, turn, putLine } = this.props; // TODO: putLine - action
    const boxes = [];
    const lines = [];
    for (let x = 0; x < sizeX; x += 1) {
      for (let y = 0; y < sizeY; y += 1) {
        boxes.push(
          <div
            className={"box ".concat(
              boxColors[`${x},${y}`] ? boxColors[`${x},${y}`] : "black"
            )}
          />
        );
        for (let p = 0; p < 4; p += 1) {
          if (shouldSetLine(x, y, p)) {
            lines.push(
              <div
                // className={turn === "red" ? "horizonred" : "horizonblue"}
                className={"horizon" + lineCoordinates[getBoxCoords(x, y, p)]}
                onClick={() => putLine(getBoxCoords(x, y, p))}
                role="presentation"
              />
            );
          }
        }
      }
    }
    
    return <div id="game-board">{lines}</div>;
  };

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
                // onMouseEnter={this.changeBackground}
                // onMouseLeave={this.NochangeBackground}
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
              // onMouseEnter={this.changeBackground}
              // onMouseLeave={this.NochangeBackground}
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
    const {
      lineCoordinates,
      turn,
      checkSquare,
      switchTurn,
      calcSCore,
    } = this.props;
    const currentCoord = event.target.dataset.coord;
    if (lineCoordinates[currentCoord] === 0) {
      // определяем кординаты

     // lineCoordinates[currentCoord] = turn === "red" ? 1 : -1;

      const splitCoord = currentCoord.split(",");
      const x = splitCoord[0]; // x кордината
      const y = splitCoord[1]; // y кордината
      const z = splitCoord[2]; // z кордината
      const madeSquare = 0;
      //if (x === "0") {
        console.log('VALUE!!!', checkSquare(y, z));
        calcSCore();
      //   if (checkSquare() === 4) {
      //     // если квадрат заполнин  с 4 сторон меняем цвет
      //     calcSCore();
      //   }
      //   if (checkSquare(parseFloat(y) - 1, z) === 4) {
      //     calcSCore();
      //     checkSquare(y, z);
      //   }
      // } else {
      //   if (checkSquare(z, y) === 4) {
      //     calcSCore();
      //   }
      //   if (checkSquare(z, parseFloat(y) - 1) === 4) {
      //     calcSCore();
      //   }
      // }
      if (madeSquare === 0) {
        switchTurn();
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

  // проверяем квадраты на заполнение
  // checkSquare(y, z) {
  //   const { lineCoordinates } = this.props;
  //   const { boardSize } = this.state;
  //   const checker1 = Math.abs(lineCoordinates[`0,${y},${z}`]);
  //   const checker2 = Math.abs(
  //     parseFloat(y) + 1 > boardSize
  //       ? 0
  //       : lineCoordinates[`0,${parseFloat(y) + 1},${z}`]
  //   );
  //   const checker3 = Math.abs(lineCoordinates[`1,${z},${y}`]);
  //   const checker4 = Math.abs(
  //     parseFloat(z) + 1 > boardSize
  //       ? 0
  //       : lineCoordinates[`1,${parseFloat(z) + 1},${y}`]
  //   );
  //   return checker1 + checker2 + checker3 + checker4;
  // }

  // проверка конца игры

  render() {
    this.mBoard();
    const { winMessage } = this.state;
    const { setBoardSize, count, turn, numBlue, numRed, box } = this.props;
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
            {winMessage}
            {box}
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
        <div id="board">{this.mBoard()}</div>

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
  const { turn, numBlue, numRed, box } = Counter;
  return {
    count: Counter.count,
    numBlue,
    box,
    numRed,
    name: Counter.name,
    sizes: Counter.sizes,
    lineCoordinates: Counter.lineCoordinates,
    boxColors: Counter.boxColors,
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
