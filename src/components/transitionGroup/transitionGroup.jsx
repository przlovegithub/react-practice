import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { is, fromJS } from "immutable";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./transitionGruop.scss";
class TransitionGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleenter: false
    };
  }
  toggleEnter = () => {
    this.setState((prevState, props) => ({
      toggleenter: !prevState.toggleenter
    }));
  };
  // https://reactjs.org/docs/animation.html
  // css动画组件设置为目标组件,用于避免包装在span或其它DOM组件中
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
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
    // ReactCSSTransitionGroup动画原理：  https://cloud.tencent.com/developer/article/1004665
    return (
      <div className="aboutTransition">
        <ReactCSSTransitionGroup
          /*自定义动画最外层的元素，默认是span,采用this.FirstChild是为了避免动画组件被包裹在span或是其它DOM组件中*/
          component={this.FirstChild}
          /*动画名字，样式中以此名作为样式名的开始*/
          transitionName="trans"
          /* transitionName={{
            enter: "itemEnter",
            leave: "itemLeave",
            enterActive: "itemEnterActive",
            leaveActive: "itemLeaveActive"
          }} */
          transitionEnter={true}
          /*过渡离开时禁止使用动画*/
          /* transitionLeave={false} */
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {this.state.toggleenter && (
            <div className="transBox" onClick={this.toggleEnter}>
              <div className="sideBar">
                <NavLink to="/">首页</NavLink>
              </div>
            </div>
          )}
        </ReactCSSTransitionGroup>
        {
          /*初始化的加载动画，例如页面初始化装载的时候执行动画*/
          <ReactCSSTransitionGroup
            component="div"
            transitionName={{
              appear: "showAppear",
              appearActive: "showAppearActive"
            }}
            transitionAppear={true}
            transitionAppearTimeout={2000}
          >
            <button onClick={this.toggleEnter}>transitionEnter</button>
          </ReactCSSTransitionGroup>
        }
      </div>
    );
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {}
  componentWillUnmount() {}
  componentDidEnter() {
    console.log(1111);
  }
}
export default TransitionGroup;
