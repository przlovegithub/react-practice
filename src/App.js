import "babel-polyfill";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Button, Icon } from "antd";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  change = () => {
    this.props.history.push({
      pathname: "/parentTransValue/123",
      search: "?sort=transValue",
      query: {
        name: "componentTransValue"
      },
      hash: "#the-hash",
      state: {
        value: 123
      }
    });
  };
  componentWillMount() {
    // console.log(sessionStorage.getItem("userinfo"));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link
          className="link"
          to={{
            pathname: "/parentLifeCycle",
            search: "?sort=name",
            hash: "#the-hash",
            state: { fromDashboard: true }
          }}
        >
          组件生命周期
        </Link>
        <Link
          className="link"
          to={{
            pathname: "/parentTransValue/456",
            search: "?sort=transValue",
            query: { name: "componentTransValue" },
            hash: "#the-hash",
            state: { value: 123 }
          }}
        >
          组件之间传值(通过Link方式)
        </Link>
        {/* <button onClick={this.change}>组件之间传值(通过JS方式)</button> */}
        <button
          onClick={() => {
            this.props.history.push({
              pathname: "/parentTransValue/456",
              search: "?sort=transValue",
              query: {
                name: "componentTransValue"
              },
              abc: "def", //自定义
              hash: "#the-hash",
              state: {
                value: 123
              }
            });
          }}
        >
          组件之间传值(通过JS方式)
        </button>
        <button
          onClick={() => {
            this.props.history.push("/list");
          }}
        >
          List列表(关于map之列表渲染)
        </button>
        <button
          onClick={() => {
            this.props.history.push("/aboutRedux");
          }}
        >
          关于redux
        </button>
        <Button
          type="primary"
          className="primary-button"
          onClick={() => {
            this.props.history.push("/example");
          }}
        >
          {" "}
          <Icon type="apple" spin="true" />
          关于anti-design(需要登录)
          <Icon type="arrow-right" />{" "}
        </Button>
        <button
          onClick={() => {
            this.props.history.push("/transitionGroup");
          }}
        >
          ReactCSSTransitionGroup
        </button>
        <button
          onClick={() => {
            this.props.history.push("/helloWorld");
          }}
        >
          hello(需要登录)
        </button>
      </div>
    );
  }
}

export default App;
