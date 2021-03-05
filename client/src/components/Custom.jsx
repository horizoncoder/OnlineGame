import React, { useState, useEffect, Component } from "react";

class Custom extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }

  componentDidMount(){
    fetch("/api/customers")
      .then((res) => {
        console.log({ res })
      })
      // .then((customers) =>
      //   this.setState({ customers }, () =>
      //     console.log("Customers fetched..", customers)
      //   )
      // );
  }

  render() {
    return (
      <div>
        <h2>Hello</h2>
        <h2>{this.state.customers}</h2>
      </div>
    );
  }
}
export default Custom;
