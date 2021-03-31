import React from "react";
import "./App.css";
import { connect } from "react-redux";
import PropTypes, { string } from "prop-types";
import { drop, map, clone } from "lodash";
import { getRoomid } from "../actions";
import { socket } from "../store";
import AuthService from "../services/auth.service";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  makeBoard = () => {
    const putline = async (coord) => {
      const { turn, userred, userblue } = this.props;
      const currentUser = AuthService.getCurrentUser();
      if (turn === "red" && userred === currentUser.username) {
        const { room } = this.props;
        const roomname = {
          room,
        };
        socket.emit("put", coord, roomname);
      }
      if (turn === "blue" && userblue === currentUser.username) {
        const { room } = this.props;
        const roomname = {
          room,
        };
        socket.emit("put", coord, roomname);
      }
    };
    const switchT = async () => {
      const { turn, userred, userblue } = this.props;
      const currentUser = AuthService.getCurrentUser();
      if (turn === "red" && userred === currentUser.username) {
        const { room } = this.props;
        const roomname = {
          room,
        };
        await socket.emit("switch", roomname);
      }
      if (turn === "blue" && userblue === currentUser.username) {
        const { room } = this.props;
        const roomname = {
          room,
        };
        await socket.emit("switch", roomname);
      }
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
          <div className="row ml-2">
            <div className="dots row  " />
            {Lineh()}
            <div className="dots row ml-4  " />
          </div>
        );
      } else {
        llines.push(<div className="colon">{LineVboxes()}</div>);
      }
    }

    return <div>{llines}</div>;
  };

  render() {
    const setboard = async (count) => {
      const currentUser = AuthService.getCurrentUser();
      const { turn, userred } = this.props;
      if (turn === "red" && userred === currentUser.username) {
        const { room } = this.props;
        const roomname = {
          room,
        };
        socket.emit("users", count, roomname);
      }
    };
    const { count, turn, numBlue, numRed, getRoomid, roomids } = this.props;

    const board = `Размер поля ${count} на ${count}`;
    const info = `Сейчас ход ${turn} Красный: ${numRed} Синий:${numBlue}`;
    return (
      <div id="game">
        <div id="header">
          <h1>Точки и квадраты</h1>
          <button
            type="submit"
            onClick={() => {
              setboard(2);
              getRoomid(roomids);
            }}
          >
            2x2
          </button>
          <button
            type="submit"
            onClick={() => {
              setboard(4);
              getRoomid(roomids);
            }}
          >
            4x4
          </button>
          <button
            id="small"
            type="submit"
            onClick={() => {
              setboard(6);
              getRoomid(roomids);
            }}
          >
            6x6
          </button>
          <button
            id="small"
            type="submit"
            onClick={() => {
              setboard(8);
              getRoomid(roomids);
            }}
          >
            8x8
          </button>
          <br />
          {info}
          <br />
          {board}
          <br />
          <div className="form-row text-center">
            <div className="col-12">
              <div className="btn">{this.makeBoard()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRoomid: (id) => dispatch(getRoomid(id)),
  };
};

const mapStateToProps = ({ Counter }) => {
  const {
    turn,
    roomid,
    getLineCoords,
    getRoomid,
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
    getRoomid,
    roomid,
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
  getRoomid: PropTypes.func.isRequired,
  roomids: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  userred: PropTypes.string.isRequired,
  userblue: PropTypes.string.isRequired,
  lineCoordinates: PropTypes.objectOf(string).isRequired,
  boxColors: PropTypes.objectOf(string).isRequired,
  numBlue: PropTypes.number.isRequired,
  numRed: PropTypes.number.isRequired,
  room: PropTypes.string.isRequired,
  turn: PropTypes.string.isRequired,
  BoxsCoord: PropTypes.objectOf(string).isRequired,
  coordsV: PropTypes.objectOf(string).isRequired,
  coordsH: PropTypes.objectOf(string).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
