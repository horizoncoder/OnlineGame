import React from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes, { string } from "prop-types";
import { drop, map, clone } from "lodash";
import io from "socket.io-client";
import Stats from "./Stats";
import { calcSCore, checkSquare } from "../actions";
import { socket } from "../store";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  makeBoard = () => {
    const putline = async (coord) => {
      const { room } = this.props;
      const roomname = {
        room,
      };
      socket.emit("put", coord, roomname);
    };
    const switchT = async () => {
      const { room } = this.props;
      const roomname = {
        room,
      };

      await socket.emit("switch", roomname);
    };
    const { count, turn, lineCoordinates, boxColors } = this.props;
    const { BoxsCoord, coordsV, coordsH } = this.props;
    const llines = [];
    let cCoordsH = map(coordsH, clone);
    let cCoordsV = map(coordsV, clone);
    let cBoxes = map(BoxsCoord, clone);
    // генерация div
    const Lineh = () => {
      const lines = [];
      for (let j = 0; j < count; j += 1) {
        const coord = cCoordsH[0];
        lines.push(
          <div
            className={`lineH line${
              lineCoordinates[coord[0]] || "black"
            } turn${turn}`}
            onClick={() => {
              putline(coord);
              switchT();
            }}
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
        llinesVertical.push(
          <div
            className={`lineV line${
              lineCoordinates[coord[0]] || "black"
            } turn${turn}`}
            onClick={() => {
              putline(coord);
              switchT();
            }}
            role="presentation"
            coords={coord}
          />
        );
        if (i < count) {
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
      llinesVertical.push(
        <div
          className={`lineV line${
            lineCoordinates[coord[0]] || "black"
          } turn${turn}`}
          onClick={() => {
            putline(coord);
            switchT();
          }}
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
    const test = async (count) => {
      const { room } = this.props;
      const roomname = {
        room,
      };
      await socket.emit("users", count, roomname);
    };
    const calc = async () => {
      const { room } = this.props;
      const roomname = {
        room,
      };
      await socket.emit("calcscore", roomname);
    };
    const { count, turn, numBlue, numRed } = this.props;
    const board = `Размер поля ${count} на ${count}`;
    return (
      <div id="game">
        <div id="header">
          <h1>Точки и квадраты</h1>

          <div className="row">
            <div className="col col-lg-6">
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
          <button
            type="submit"
            onClick={() => {
              test(2);
            }}
          >
            2x2
          </button>
          <button
            type="submit"
            onClick={() => {
              test(4);
            }}
          >
            4x4
          </button>
          <button
            type="submit"
            onClick={() => {
              calc(4);
            }}
          >
            dsl;dls
          </button>
          <button
            id="small"
            type="submit"
            onClick={() => {
              test(6);
            }}
          >
            6x6
          </button>
          <button
            id="small"
            type="submit"
            onClick={() => {
              test(8);
            }}
          >
            8x8
          </button>
          <br />
          {board}
        </div>
        <div className="row">
          <div id="board" className="d-flex justify-content-center">
            {this.makeBoard()}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    calcSCore: () => dispatch(calcSCore()),
    checkSquare: (y, z) => dispatch(checkSquare(y, z)),
  };
};

const mapStateToProps = ({ Counter }) => {
  const {
    turn,
    getLineCoords,
    mBoard,
    numBlue,
    numRed,
    count,
    lineCoordinates,
    boxColors,
    BoxsCoord,
    coordsH,
    coordsV,
  } = Counter;
  return {
    count,
    mBoard,
    numBlue,
    numRed,
    lineCoordinates,
    boxColors,
    turn,
    BoxsCoord,
    getLineCoords,
    coordsH,
    coordsV,
  };
};

Game.propTypes = {
  count: PropTypes.number.isRequired,
  lineCoordinates: PropTypes.objectOf(string).isRequired,
  boxColors: PropTypes.objectOf(string).isRequired,
  numBlue: PropTypes.number.isRequired,
  numRed: PropTypes.number.isRequired,
  setBoardSize: PropTypes.func.isRequired,
  turn: PropTypes.string.isRequired,
  switchTurn: PropTypes.func.isRequired,
  putLine: PropTypes.func.isRequired,
  BoxsCoord: PropTypes.objectOf(string).isRequired,
  coordsV: PropTypes.objectOf(string).isRequired,
  coordsH: PropTypes.objectOf(string).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
