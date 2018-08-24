import React from "react";
import { is, fromJS } from "immutable";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../../store/login/action";
// import { message, Button, Input } from "antd";
import { InputItem, Button, List } from "antd-mobile";
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
  // antd的Input组件获取输入值是e.target.value,antd-mobile的InputItem必须用List组件包裹，其输入值就是value
  username = value => {
    this.setState({
      name: value
    });
  };
  password = value => {
    this.setState({
      psd: value
    });
  };
  toLogin = () => {
    if (this.state.name === "") {
      // message.info("用户名不对");
    } else if (this.state.psd === "") {
      // message.info("密码不对");
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
          // message.info("登录成功!");

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
          // message.info("用户名或密码不对!");
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
          <List>
            <InputItem
              type="text"
              placeholder="Basic usage"
              onChange={this.username}
              value={this.state.name}
            />
            <InputItem
              type="password"
              placeholder="Basic usage"
              onChange={this.password}
              value={this.state.psd}
            />
          </List>

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
