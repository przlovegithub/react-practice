import React from "react";
import { is, fromJS } from "immutable";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../../store/login/action";
import { message, Button, Input } from "antd";
import "./login.scss";

class Login extends React.Component {
  static propTypes = {
    loginInfo: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { name: "", psd: "" };
  }
  username = e => {
    this.setState({
      name: e.target.value
    });
  };
  password = e => {
    this.setState({
      psd: e.target.value
    });
  };
  toLogin = () => {
    if (this.state.name === "") {
      message.info("用户名不对");
    } else if (this.state.psd === "") {
      message.info("密码不对");
    } else {
      let data = {};
      data.username = this.state.name;
      data.password = window.encrypt(this.state.psd);
      data.client = 1;
      data.device = "";
      this.props.login(data);
    }
  };
  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      if (Object.keys(this.props.loginInfo).length > 0) {
        if (this.props.loginInfo.result.code === 10000) {
          message.info("登录成功!");

          sessionStorage.setItem(
            "userinfo",
            JSON.stringify(this.props.loginInfo.data[0])
          );
          setTimeout(() => {
            let RedirectUrl = this.props.location.state
              ? this.props.location.state.from.pathname
              : "/";
            console.log(RedirectUrl);
            this.props.history.push(RedirectUrl);
          }, 200);
        } else {
          message.info("用户名或密码不对!");
        }
      }
    }, 200);
  }
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
      <div className="login">
        <h3>登录</h3>
        <div className="main">
          <Input
            type="text"
            placeholder="Basic usage"
            onChange={this.username}
            value={this.state.name}
          />
          <Input
            type="password"
            placeholder="Basic usage"
            onChange={this.password}
            value={this.state.psd}
          />
          <Button type="primary" onClick={this.toLogin}>
            登录
          </Button>
        </div>
      </div>
    );
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}

export default connect(
  state => ({
    loginInfo: state.loginInfo.userinfo
  }),
  { login }
)(Login);
