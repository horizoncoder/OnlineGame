/* eslint-disable no-shadow */
import React from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { drop } from "lodash";
// eslint-disable-next-line import/no-cycle
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
      switchTurn();
    };
    const boxes = [];
    let boxesCoords = [];
    const linesVertical = [];
    const linesHorizontal = [];
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
        boxesCoords.push(`${x}${y}`);
        for (let p = 0; p < 4; p += 1) {
          if (shouldSetLine(x, y, p)) {
            // (p === 0 || p === 2 ? linesVertical : linesHorizontal).push(
            //   <div
            //     className={`${p === 0 || p === 2 ? "lineV" : "lineH"} line${
            //       lineCoordinates[getBoxCoords(x, y, p)[0]] || "black"
            //     } turn${turn}`}
            //     onClick={() => putLine(getBoxCoords(x, y, p), click())}
            //     role="presentation"
            //     coords={getBoxCoords(x, y, p)}
            //   />
            // );
            (p === 0 || p === 2 ? coordsV : coordsH).push(
              getBoxCoords(x, y, p)
            );
          }
        }
      }
    }
    const sortedCoordsH = [];
    for (let i = 0; i < count; i += 1) {
      for (let j = i * count; j < i * count + count * 3; j += 1) {
        const s = j > count ? j - count : j;
        const lineP = j > count ? 3 : 1;
        const boxC = boxesCoords[s];
        const lineIdx = coordsH.findIndex((c) =>
          c.find((item) => item === `${boxC}${lineP}`)
        );
        sortedCoordsH.push(coordsH[lineIdx]);
      }
      boxesCoords = drop(boxesCoords, count * 2);
    }

    return { boxes, linesVertical, coordsV, coordsH: sortedCoordsH };
  };

  makeBoard = () => {
    const { count, turn, lineCoordinates,switchTurn } = this.props;
    let { boxes, coordsH, linesVertical, linesHorizontal, p } = this.mBoard();
    const llines = [];
    const Lineh = () => {
      const lines = [];
      for (let j = 0; j < count; j += 1) {
        lines.push(linesHorizontal[0]);
        linesHorizontal = drop(linesHorizontal, 1);
      }
      return lines;
    };
    const LineVboxes = () => {
      const llinesVertical = [];
      for (let i = 0; i < count; i += 1) {
        llinesVertical.push(linesVertical[0]);
        if (true && i < count) {
          llinesVertical.push(boxes[0]);
        }
        linesVertical = drop(linesVertical, 1);
        boxes = drop(boxes, 1);
      }
      llinesVertical.push(linesVertical[0]);
      linesVertical = drop(linesVertical, 1);
      return llinesVertical;
    };
    for (let i = 1; i < 24; i += 1) {
      if (i % 2 !== 0) {
        llines.push(
          <div className="container-fluid ">
            <div className="row ml-2">
              <div className="dots row  " />
              {coordsH.map((coord) => (
                <div
                  className={`${p === 0 || p === 2 ? "lineV" : "lineH"} line${
                    lineCoordinates[() => coord[0]] || "black"
                  } turn${turn}`}
                  onClick={(() => putLine(coord), switchTurn())}
                  role="presentation"
                  coords={() => coord}
                />
              ))}
              <div className="dots row ml-4  " />
            </div>
          </div>
        );
        coordsH = drop(coordsH, 4);
      } else {
        llines.push(
          <div className="container-fluid">
            <div className="colon">{LineVboxes()}</div>
          </div>
        );
      }
    }

    return <div>{llines}</div>;
  };

  render() {
    const { setBoardSize, count, turn, numBlue, numRed } = this.props;
    const board = `Размер поля ${count} на ${count} `;
    return (
      <div id="game">
        <div id="header">
          <h1>Точки и квадраты</h1>

          <div className="row">
            <div className="col col-lg-2">
              Сейчас ход:
              {turn}
            </div>
            <div className="col-md-auto">
              Красный:
              {numRed}
            </div>
            <div className="col col-lg-2">
              Синий:
              {numBlue}
            </div>
            <br />
          </div>
          <button type="submit" onClick={() => setBoardSize(2)}>
            2x2
          </button>
          <button type="submit" onClick={() => setBoardSize(4)}>
            4x4
          </button>
          <button id="small" type="submit" onClick={() => setBoardSize(6)}>
            6x6
          </button>
          <button id="small" type="submit" onClick={() => setBoardSize(8)}>
            8x8
          </button>
          <br />
          {board}
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
  const {
    turn,
    numBlue,
    numRed,
    box,
    style,
    linedel,
    count,
    lineCoordinates,
    boxColors,
  } = Counter;
  return {
    count,
    style,
    linedel,
    numBlue,
    box,
    numRed,
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
  switchTurn: PropTypes.func.isRequired,
  putLine: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
