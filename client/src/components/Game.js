import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Stats } from './Stats';
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialBoard(2);
  }

  initialBoard(size) {
    let state = {
      boardSize: size,
      numRed: 0,
      numBlue: 0,
      turn: 'red',
      winMessage: '',
      lineCoordinates: {},
      boxColors: {},
    };

    //палочки
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < state.boardSize + 1; j++) {
        for (let k = 0; k < state.boardSize; k++) {
          state.lineCoordinates[i + ',' + j + ',' + k] = 0;
        }
      }
    }
    // квадраты
    for (let i = 0; i < state.boardSize; i++) {
      for (let j = 0; j < state.boardSize; j++) {
        state.boxColors[i + ',' + j] = 'white';
      }
    }
    return state;
  }

  //поставить палочку
  PutLine(event) {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      //опредиляем кординаты
      let newState = this.state.lineCoordinates;

      newState[currentCoord] = this.state.turn === 'red' ? 1 : -1;

      var splitCoord = currentCoord.split(',');
      var x = splitCoord[0]; //x кордината
      var y = splitCoord[1]; //y кордината
      var z = splitCoord[2]; //z кордината

      let newBoxColors = this.state.boxColors;
      //
      var madeSquare = 0;
      if (x === '0') {
        if (this.checkSquare(y, z) === 4) {
          //если квадрат заполнин  с 4 сторон меняем цвет
          madeSquare = 1;
          newBoxColors[y + ',' + z] =
            this.state.turn === 'red'
              ? 'rgba(255,0,0,0.5)'
              : 'rgba(0,0,255,0.5)'; //по последний палочки меняем цвет квадрата
          this.setState((prevState) => ({
            numRed:
              prevState.turn === 'red'
                ? prevState.numRed + 1
                : prevState.numRed, //считаем очки
            numBlue:
              prevState.turn === 'blue'
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors,
          }));
        }
        if (this.checkSquare(parseFloat(y) - 1, z) === 4) {
          madeSquare = 1;
          newBoxColors[parseFloat(y) - 1 + ',' + z] =
            this.state.turn === 'red'
              ? 'rgba(255,0,0,0.5)'
              : 'rgba(0,0,255,0.5)';
          this.setState((prevState) => ({
            numRed:
              prevState.turn === 'red'
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === 'blue'
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors,
          }));
        }
      } else {
        if (this.checkSquare(z, y) === 4) {
          madeSquare = 1;
          newBoxColors[z + ',' + y] =
            this.state.turn === 'red'
              ? 'rgba(255,0,0,0.5)'
              : 'rgba(0,0,255,0.5)';
          this.setState((prevState) => ({
            numRed:
              prevState.turn === 'red'
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === 'blue'
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors,
          }));
        }
        if (this.checkSquare(z, parseFloat(y) - 1) === 4) {
          madeSquare = 1;
          newBoxColors[z + ',' + (parseFloat(y) - 1)] =
            this.state.turn === 'red'
              ? 'rgba(255,0,0,0.5)'
              : 'rgba(0,0,255,0.5)';
          this.setState((prevState) => ({
            numRed:
              prevState.turn === 'red'
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === 'blue'
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors,
          }));
        }
      }
      if (madeSquare === 0) {
        this.setState((prevState) => ({
          turn: prevState.turn === 'red' ? 'blue' : 'red', //поменять цвет палки
        }));
      } else {
        this.checkGameOver();
      }
    }
  }
  //проверяем квадраты на заполнение
  checkSquare(y, z) {
    var checker1 = Math.abs(this.state.lineCoordinates['0,' + y + ',' + z]);
    var checker2 = Math.abs(
      parseFloat(y) + 1 > this.state.boardSize
        ? 0
        : this.state.lineCoordinates['0,' + (parseFloat(y) + 1) + ',' + z]
    );
    var checker3 = Math.abs(this.state.lineCoordinates['1,' + z + ',' + y]);
    var checker4 = Math.abs(
      parseFloat(z) + 1 > this.state.boardSize
        ? 0
        : this.state.lineCoordinates['1,' + (parseFloat(z) + 1) + ',' + y]
    );
    return checker1 + checker2 + checker3 + checker4;
  }
  //проверка конца игры
  checkGameOver() {
    this.setState((prevState) => ({
      winMessage:
        prevState.numRed + prevState.numBlue == prevState.boardSize * 2
          ? this.makeWinMessage(prevState)
          : '',
    }));
  }

  makeWinMessage(state) {
    var winMessage;
    if (state.numRed > state.numBlue) {
      winMessage = 'Красный победил';
    } else if (state.numRed < state.numBlue) {
      winMessage = 'Синий победил';
    } else {
      winMessage = 'ничья';
    }
    return winMessage;
  }

  changeBoardSize(event) {
    if (window.confirm('Создать новое поле?')) {
      var newState;
      if (event.target.id === 'small') {
        newState = this.initialBoard(2);
      } else if (event.target.id === 'medium') {
        newState = this.initialBoard(8);
      } else if (event.target.id === 'large') {
        newState = this.initialBoard(12);
      }
      this.setState((prevState) => newState);
    }
  }

  selectColor(int) {
    if (int === 0) {
      return 'rgb(255,255,255)';
    } else if (int === 1) {
      return 'rgb(255,0,0)';
    } else if (int === -1) {
      return 'rgb(0,0,255)';
    }
  }
  //закрасить квадарат
  tint(event) {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      if (this.state.turn === 'red') {
        event.target.style.backgroundColor = 'rgba(255,0,0,0.5)';
      } else {
        event.target.style.backgroundColor = 'rgba(0,0,255,0.5)';
      }
    }
  }

  untint(event) {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      event.target.style.backgroundColor = 'rgb(255,255,255)';
    }
  }

  makeBoard(boardSize) {
    var cols = [];
    for (let i = 0; i <= 2 * boardSize; i++) {
      // проверка на одинаковое количество строки
      var row = [];
      for (let j = 0; j <= 2 * boardSize; j++) {
        // проверка на одинаковое количество строки
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            row.push(
              React.createElement(
                'div',
                {
                  className: 'dot',
                  id: 'dot' + Math.floor(i / 2) + ',' + Math.floor(j / 2),
                },
                ''
              )
            );
          } else {
            row.push(
              React.createElement(
                'div',
                {
                  className: 'horizon',
                  'data-coord':
                    '0,' + Math.floor(i / 2) + ',' + Math.floor(j / 2), //добавляем координаты точкам
                  onClick: this.PutLine,
                  style: {
                    backgroundColor: this.selectColor(
                      this.state.lineCoordinates[
                        '0,' + Math.floor(i / 2) + ',' + Math.floor(j / 2)
                      ]
                    ),
                  }, //добавляем палке класс с цветом
                  onMouseEnter: this.tint,
                  onMouseLeave: this.untint,
                },
                ''
              )
            );
          }
        } else {
          if (j % 2 === 0) {
            row.push(
              React.createElement(
                'div',
                {
                  className: 'vertical',
                  'data-coord':
                    '1,' + Math.floor(j / 2) + ',' + Math.floor(i / 2),
                  onClick: this.PutLine,
                  style: {
                    backgroundColor: this.selectColor(
                      this.state.lineCoordinates[
                        '1,' + Math.floor(j / 2) + ',' + Math.floor(i / 2)
                      ]
                    ),
                  },
                  onMouseEnter: this.tint,
                  onMouseLeave: this.untint,
                },
                ''
              )
            );
          } else {
            row.push(
              React.createElement(
                'div',
                {
                  className: 'box',
                  id: 'box' + Math.floor(i / 2) + ',' + Math.floor(j / 2),
                  style: {
                    backgroundColor: this.state.boxColors[
                      Math.floor(i / 2) + ',' + Math.floor(j / 2)
                    ],
                  },
                },
                ''
              )
            );
          }
        }
      }
      cols.push(React.createElement('div', { className: 'colon' }, row));
    }

    return React.createElement('div', { id: 'game-board' }, cols);
  }

  render() {
    return (
      <div id="game">
        <div id="header">
          <h1>Точки и квадраты</h1>
          <p id="score">
            {' '}
            Красный: {this.state.numRed} Синий: {this.state.numBlue} Сейчас
            ходит: {this.state.turn}{' '}
          </p>{' '}
          <p id="winner"> {this.state.winMessage} </p>
          Размер поля:
          <button id="small" onClick={this.changeBoardSize}>
            {' '}
            2x2{' '}
          </button>
          <button id="medium" onClick={this.changeBoardSize}>
            {' '}
            8x8{' '}
          </button>
          <button id="large" onClick={this.changeBoardSize}>
            {' '}
            12x12{' '}
          </button>
        </div>
        <div id="board">{this.makeBoard(this.state.boardSize)}</div>

        <Stats
          numBlue={this.state.numBlue}
          numRed={this.state.numRed}
          winMessage={this.state.winMessage}
        />
      </div>
    );
  }
}

//ReactDOM.render(<Game/>,document.getElementById('root'))

export { Game };
