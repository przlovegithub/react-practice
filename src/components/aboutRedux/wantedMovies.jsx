import React from 'react'
import { Link } from "react-router-dom"
import {is,fromJS} from 'immutable'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import { clearData } from "../../store/select/action";
import './wantedMovies.scss'
class WantedMovies extends React.Component {
  static propTypes = {
    proData: PropTypes.object.isRequired
  };
  //   constructor(props) {
  //     super(props);
  //     this.state = {};
  //   }

  selectedList = [];

  initData = props => {
    this.selectedList = [];
    props.proData.dataList.forEach(item => {
      if (item.selectStatus && item.selectNum) {
        this.selectedList.push(item);
      }
    });
  };

  clearSelectedData = () => {
      this.props.clearData();
  }

  componentWillMount() {
    this.initData(this.props);
  }

  componentWillReceiveProps(nextProps) {
      this.initData(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return  !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps);
  }

  render() {
    return (
      <div>
            <Link to="/selectedList" className="selectedList">
          {this.selectedList.length ? (
            <ul>
              {this.selectedList.map((item, index) => {
                return (
                  <li key={index}>
                    <p>{item.title}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            "请选择"
          )}
        </Link>
        <button onClick={this.clearSelectedData}>清空数据</button>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {}

  componentWillUnmount(prevProps, prevState) {}
}

export default connect((state)=>({
    proData: state.proData
}),{clearData})(WantedMovies);