import React from "react";
import ReactDOM from "react-dom";
class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <div id="protal" />
        {/* 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 片段(fragment)。第二个参数（container）则是一个 DOM 元素 */}
        {ReactDOM.createPortal(this.props.children, this.el)}
      </div>
    );
  }
  componentDidMount() {
    document.getElementById("protal").appendChild(this.el);
  }
  componentWillUnmount() {
    document.getElementById("protal").removeChild(this.el);
  }
}
export default Hello;
