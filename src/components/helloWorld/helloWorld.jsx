import React from "react";
import "./helloWorld.scss";
import { is, fromJS } from "immutable";

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello World",
      list: []
    };
  }

  goBack() {
    //后退
    this.props.history.goBack();
  }

  //   push = () => {
  //     //前进
  //     this.props.history.push();
  //   };

  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  componentWillUpdate(nextProps, nextState) {}
  componentWillMount() {}

  render() {
    return (
      <div className="flexbox">
        <p>{this.state.text}</p>
        <h3 onClick={this.goBack.bind(this)}>后退</h3>
      </div>
    );
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}

export default HelloWorld;
