import React from "react";
import "./helloWorld.scss";
import { is, fromJS } from "immutable";
import Hello from "./hello";
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
  // childClick = () => {
  //   console.log("childClick");
  // };
  parentClick = () => {
    console.log("parentClick");
  };
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
    /**
     * React.Fragment为片段(fragments)，可以让你将子元素列表添加到一个分组中，并且不会在DOM中增加额外节点，
     * 为了渲染有效的 HTML，<Hello/> 需要返回多个<td>元素。如果<Hello />的render()函数里面使用一个父级div，那么最终生成的 HTML 将是无效的，但是return必须有一个父元素包裹，所以此时用上片段，<React.Fragment key={item.id}>可以设置key
     */

    // const Column = () => {
    //   return (
    //     <React.Fragment>
    //       <td>11</td>
    //       <td>11</td>
    //     </React.Fragment>
    //   );
    // };
    return (
      <div className="flexbox" onClick={this.parentClick}>
        <p>{this.state.text}</p>
        <h3 onClick={this.goBack.bind(this)}>后退</h3>
        <table>
          <tbody>
            <tr>
              <Column param={this.state.text} />
            </tr>
          </tbody>
        </table>
        <div />
        <Hello>
          {/** 通过 Portals 进行事件冒泡，一个从 portal 内部会触发的事件会一直冒泡至包含 React tree 的祖先， 
            除html自身元素可添加事件触发外，自己的组件添加事件是不能手动触发的，需要通过props传递，在子组件中手动调用(和子组件向父组件传参，通过回调函数一样)；
            此处点击div，事件向上冒泡到className="flexbox"，然后触发this.parentClick函数
          */}
          <div>
            {/* <div onClick={this.childClick}> */}
            插槽(Protals)：能将子节点渲染到父组件的 DOM 层次之外
          </div>
        </Hello>
      </div>
    );
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
// 函数式组件,接收的参数就是props
function Column(props) {
  const { param } = props;

  return (
    <React.Fragment>
      <td>{param}</td>
      <td>{param}</td>
    </React.Fragment>
  );
}
export default HelloWorld;
