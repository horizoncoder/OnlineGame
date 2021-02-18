import React from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { drop} from "lodash";
import Stats from "./Stats";
import {
  setBoardSize,
  calcSCore,
  switchTurn,
  checkSquare,
  putLine,
} from "../actions";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mBoard = () => {
    const { count } = this.props;
    const sizeX = count;
    const sizeY = count;
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
    const {
      lineCoordinates,
      boxColors,
      turn,
      putLine,
      switchTurn,
    } = this.props;
    const click = () => {
      // calcSCore();
      switchTurn();
    };
    console.log("BOXES", boxColors);
    const boxes = [];
    const linesV = [];
    const linesH = [];
    const coordsV = [];
    const coordsH = [];

    for (let y = 0; y < sizeX; y += 1) {
      for (let x = 0; x < sizeY; x += 1) {
        boxes.push(
          <div
            className={"box1 ".concat(
              boxColors[`${x}${y}`] ? boxColors[`${x}${y}`] : "black"
            )}
            coords={`${x},${y}`}
          />
        );
        for (let p = 0; p < 4; p += 1) {
          if (shouldSetLine(x, y, p)) {
            (p === 0 || p === 2 ? linesV : linesH).push(
              <div
                className={`${p === 0 || p === 2 ? "lineV" : "lineH"} line${
                  lineCoordinates[getBoxCoords(x, y, p)[0]] || "black"
                } turn${turn}`}
                onClick={() => putLine(getBoxCoords(x, y, p), click())}
                role="presentation"
                coords={getBoxCoords(x, y, p)}
              />
            );
            (p === 0 || p === 2 ? coordsV : coordsH).push(
              getBoxCoords(x, y, p)
            );
          }
        }
      }
    }
   // [linesH[3], linesH[4]] = [linesH[4], linesH[3]];
    linesH.sort(function (a, b) {
      return b - a;
    });
    console.log({ coordsV, coordsH });
    return { boxes, linesV, linesH };
  };

  makeBoard = () => {
    const { count } = this.props;
    let { boxes, linesV, linesH } = this.mBoard();
    const llines = [];
    // const llinesV = [];
    const Lineh = () => {
      const lines = [];
      for (let j = 0; j < count; j ++) {
        lines.push(linesH[0]);
        linesH = drop(linesH, 1);
      }
      return lines;
    };
    const LineVboxes = () => {
      const llinesV = [];
      for (let i = 0; i < count; i += 1) {
        llinesV.push(linesV[0]);
        if (true && i < count) {
          llinesV.push(boxes[0]);
        }
        linesV = drop(linesV, 1);
        boxes = drop(boxes, 1);
      }
      llinesV.push(linesV[0]);
      linesV = drop(linesV, 1);
      return llinesV;
    };
    const LineVboxes2 = () => {
      for (let i = 0; i <= 2; i += 1) {
        // console.log(i + ":First!");
        if (i < 2) {
          // console.log(i + ":Second!")
        }
      }
    };
    LineVboxes2();
    for (let i = 1; i < 24; i += 1) {
      if (i % 2 !== 0) {
        llines.push(
          <div className="row m-0">
            <div className="testdiv" />
            {/* {linesH[0]}
            {linesH[1]} */}
            {Lineh()}
          </div>
        );
      } else {
        llines.push(
          <div className="colon">
            <div className="colon">
              {/* {linesV[0]}
              {boxes[0]}
              {linesV[1]}
              {boxes[1]}
              {linesV[2]} */}
              {LineVboxes()}
            </div>
          </div>
        );
      }
    }

    return <div>{llines}</div>;
  };

  render() {
    const { winMessage } = this.state;
    const {
      setBoardSize,
      count,
      turn,
      numBlue,
      numRed,
      box,
      boxColors,
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
            {winMessage}
            {box}
            {count}
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
        <div id="board">{this.makeBoard()}</div>

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
    putLine: (coord) => dispatch(putLine(coord)),
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
