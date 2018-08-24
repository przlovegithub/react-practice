import React from "react";
import { is, fromJS } from "immutable";

// import { movieList } from '../../service/api'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import MovieList from "./movieList";
import "./list.scss";
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagBarPos: "0%",
      movieList: []
    };
  }
  setFlagBarPos = type => {
    let flagBarPos;
    switch (type) {
      case "us_box":
        flagBarPos = "0%";
        break;
      case "coming_soon":
        flagBarPos = "50%";
        break;
      default:
        flagBarPos = "0%";
    }
    this.setState({ flagBarPos });
  };
  componentWillReceiveProps(nextProps) {
    // 属性变化时设置头部底部标签位置
    let currenType = this.props.location.pathname.split("/")[2];
    let type = nextProps.location.pathname.split("/")[2];
    console.log(currenType, type);
    if (currenType !== type) {
      this.setFlagBarPos(type);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  componentWillUpdate(nextProps, nextState) {}
  componentWillMount() {}
  //  visitCount = async ()=> {
  //     try {
  //         const res = await visitCount(this.state.countData);
  //         this.setState({
  //             text:res.msg
  //         })
  //         console.log(res)
  //     } catch (error) {
  //         console.log("catch错误：", error);

  //     }
  // }

  render() {
    return (
      <div>
        <div className="record-nav-con clearfix">
          <NavLink
            to={`${this.props.match.path}/us_box`}
            className="nav-link"
            activeClassName="selected"
          >
            北美排行榜
          </NavLink>
          <NavLink
            to={`${this.props.match.path}/coming_soon`}
            className="nav-link"
            activeClassName="selected1"
            isActive={() => {}}
          >
            即将上映
          </NavLink>
          <i className="nav-flag-bar" style={{ left: this.state.flagBarPos }} />
        </div>
        <Switch>
          <Route
            exact
            path={`${this.props.match.path}/:type(us_box|coming_soon)`}
            component={MovieList}
          />
          <Redirect
            from={`${this.props.match.path}`}
            to={`${this.props.match.path}/us_box`}
            exact
            component={MovieList}
          />
        </Switch>
      </div>
    );
  }
  componentDidMount() {
    // this.visitCount();
  }
  componentDidUpdate() {}
  componentWillUnmount() {}
}
export default List;
