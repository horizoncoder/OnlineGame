import React, { Component } from 'react';

export default class Stats extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    this.addTask = this.addTask.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const list = window.localStorage.getItem('list');
    const parsedList = JSON.parse(list);

    if (list == null) {
      return false;
    }
    return this.setState({
      list: parsedList,
    });
  }

  deleteItem(event) {
    const index = event.target.getAttribute('data-key');
    const listValue = JSON.parse(localStorage.getItem('list'));
    listValue.splice(index, 1);
    this.setState({ list: listValue });
    localStorage.setItem('list', JSON.stringify(listValue));
  }

  addTask() {
    const Items = {
      value: (this.input = `Синий ${JSON.stringify(
        this.props.numBlue
      )} Красный ${JSON.stringify(this.props.numRed)} ${JSON.stringify(
        this.props.winMessage
      )}`),
      Date: new Date().toUTCString(),
    };

    if (localStorage.getItem('list') == null) {
      const list = [];
      list.push(Items);
      localStorage.setItem('list', JSON.stringify(list));
    } else {
      const list = JSON.parse(localStorage.getItem('list'));
      list.push(Items);
      localStorage.setItem('list', JSON.stringify(list));
    }
    this.setState({
      list: JSON.parse(localStorage.getItem('list')),
    });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="main-container">
        <h1>Сохранить результат</h1>
        <hr />
        <div className="container">
          <button type="submit" onClick={this.addTask}>
            Сохранить
          </button>

          <br />
          <br />
          <ol>
            {list.map((item, index) => {
              return (
                <li key={item.id}>
                  {' '}
                  {item.value}
                  <button
                    className="button"
                    type="button"
                    value="delete"
                    data-key={index}
                    onClick={this.deleteItem}
                  >
                    Удалить
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
