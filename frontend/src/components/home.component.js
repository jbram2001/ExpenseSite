import React, { Component } from "react";
import Moment from 'react-moment';
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      date: new Date()
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );

    var date = this.state.date;
    date.setMonth(date.getMonth()-1);
    this.setState({date});
  }

  render() {
    

    return (
      <div className="container">
        <header className="jumbotron">
          <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            {this.state.content}
          </h2>
          <p><Moment date={this.state.date} format="YYYY/MM/DD"/></p>
        </header>
      </div>
    );
  }
}
