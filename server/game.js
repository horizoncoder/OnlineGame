const state = {
  count: 0,
  boxClass: ' box1 ',
  turn: 'red',
  numBlue: 0,
  numRed: 0,
  lineCoordinates: {},
  boxColors: {},
  BoxsCoord: {},
  coordsV: {},
  coordsH: {},
};
const calcScore = () => ({
  Color: state.turn ? state.numRed : state.numBlue,
  // подсчет очков
  numRed: Object.values(state.boxColors).filter((color) => color === "red")
    .length, // считаем очки
  numBlue: Object.values(state.boxColors).filter((color) => color === "blue")
    .length,
});
const EndGame = () => {
  if (Object.keys(state.boxColors).length === state.count ** 2) {
    alert("Buhf");
    console.log(props);
    // document.location.reload();
    const data = {
      status: "started",
      rednum: state.numRed,
      bluenum: state.numBlue,
    };
    RoomDataService.update(23, data)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

module.exports = {
  test, pushCoords,log
};
