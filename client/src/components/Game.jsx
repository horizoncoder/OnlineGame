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
      // получаем координаты квадрата
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

    const boxes = [];
    let boxesCoords = [];
    const linesVertical = [];
    const linesHorizontal = [];
    const coordsV = [];
    const coordsH = [];
    for (let y = 0; y < sizeX; y += 1) {
      for (let x = 0; x < sizeY; x += 1) {
        boxesCoords.push(`${x}${y}`);
        for (let p = 0; p < 4; p += 1) {
          if (shouldSetLine(x, y, p)) {
            (p === 0 || p === 2 ? coordsV : coordsH).push(
              getBoxCoords(x, y, p)
            );
          }
        }
      }
    }
    let boxrender = []; // сортировка координат
    boxrender = boxesCoords;
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

    return {
      boxes,
      boxrender,
      linesVertical,
      linesHorizontal,
      coordsV,
      coordsH: sortedCoordsH,
    };
  };

  makeBoard = () => {
    const {
      count,
      turn,
      lineCoordinates,
      putLine,
      switchTurn,
      boxColors,
    } = this.props;
    const { coordsH, coordsV, boxrender } = this.mBoard();
    const llines = [];

    let cCoordsH = [...coordsH];
    let cCoordsV = [...coordsV];
    let cBoxes = [...boxrender];
    // генерация div
    const Lineh = () => {
      const lines = [];
      for (let j = 0; j < count; j += 1) {
        const coord = cCoordsH[0];
        const click = () => {
          putLine(coord);
          switchTurn();
        };
        lines.push(
          <div
            className={`lineH line${
              lineCoordinates[coord[0]] || "black"
            } turn${turn}`}
            onClick={() => click()}
            role="presentation"
            coords={coord}
          />
        );
        cCoordsH = drop(cCoordsH, 1);
      }
      return lines;
    };

    const LineVboxes = () => {
      const llinesVertical = [];
      for (let i = 0; i < count; i += 1) {
        const coord = cCoordsV[0];
        const box = cBoxes[0];
        const click = () => {
          putLine(coord);
          switchTurn();
        };
        llinesVertical.push(
          <div
            className={`lineV line${
              lineCoordinates[coord[0]] || "black"
            } turn${turn}`}
            onClick={() => click()}
            role="presentation"
            coords={coord}
          />
        );
        if (true && i < count) {
          llinesVertical.push(
            <div
              className={"box1 ".concat(
                boxColors[`${box}`] ? boxColors[`${box}`] : "black"
              )}
              coords={box}
            />
          );
        }
        cCoordsV = drop(cCoordsV, 1);
        cBoxes = drop(cBoxes, 1);
      }
      const coord = cCoordsV[0];
      const click = () => {
        putLine(coord);
        switchTurn();
      };
      llinesVertical.push(
        <div
          className={`lineV line${
            lineCoordinates[coord[0]] || "black"
          } turn${turn}`}
          onClick={() => click()}
          role="presentation"
          coords={coord}
        />
      );
      cCoordsV = drop(cCoordsV, 1);
      return llinesVertical;
    };

    for (let i = 1; i < count * 2 + 2; i += 1) {
      if (i % 2 !== 0) {
        llines.push(
          <div className="container-fluid ">
            <div className="row ml-2">
              <div className="dots row  " />
              {Lineh()}
              <div className="dots row ml-4  " />
            </div>
          </div>
        );
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
    const board = `Размер поля ${count} на ${count}`;
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
    row,
    lineCoordinates,
    boxColors,
  } = Counter;
  return {
    count,
    row,
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
