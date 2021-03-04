import React, { useState, useEffect, Component } from "react";

class Custom extends Component {
  constructor() {
    super();
    this.state = {
      customers:[],
    };
  }
  componentDidMount(){
      fetch('/api/customers')
  }
  render() {
    return (
      <div>
        <h2></h2>
      </div>
    );
  }
}
export default Custom;
