import "babel-polyfill";
import React from "react";
import "./example.scss";
import { is, fromJS } from "immutable";
// import { DatePicker } from "antd";
import { DatePicker, List, Button, WhiteSpace, WingBlank } from "antd-mobile";

import locale from "antd/lib/date-picker/locale/zh_CN";
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "anti",
      list: []
    };
  }

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
      <div>
        {/* <DatePicker locale={locale} /> */}
        <DatePicker
          mode="date"
          title="Select Date"
          extra="Optional"
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal">Date</List.Item>
        </DatePicker>
        <p>{this.state.text}</p>
        <WingBlank>
          <Button loading>loading button</Button>
          <WhiteSpace />
        </WingBlank>
      </div>
    );
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}

export default Example;
