import React from 'react'
import { Link } from "react-router-dom"
import {is,fromJS} from 'immutable'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import { clearData, bookSaga } from "../../store/select/action";
import './wantedMovies.scss'
import { Input } from "antd";
const Search = Input.Search;
class WantedMovies extends React.Component {
  static propTypes = {
    proData: PropTypes.object.isRequired
  };
    // constructor(props) {
    //   super(props);
    //   this.state = {};
    //   // this.getBook = this.getBook.bind(this)
    // }

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

  // getBook(param){
  //   this.props.bookSaga(param);
  // }

  getBook = (param)=>{
    this.props.bookSaga(param);
  }

  componentWillMount() {
    this.initData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initData(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    );
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {
    return <div>
        <Link to="/selectedList" className="selectedList">
          {this.selectedList.length ? <ul>
              {this.selectedList.map((item, index) => {
                return <li key={index}>
                    <p>{item.title}</p>
                  </li>;
              })}
            </ul> : "请选择"}
        </Link>
        <button onClick={this.clearSelectedData}>清空数据</button>
        <Search placeholder="input search book" enterButton="Search" size="large" onSearch={value => {
            this.getBook(value);
          }} />

        {this.props.proData.bookList.length ?<ul className="bookList">
          {this.props.proData.bookList.map((item,index)=>{
           return <li key={index}>
            <span>{item.author[0]}</span>
            <span>《{item.title}》</span>
           </li>
          })}
          
          </ul>:''
        }

      </div>;
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    
    
  }

  componentWillUnmount(prevProps, prevState) {}
}

export default connect((state)=>({
    proData: state.proData
}), { clearData, bookSaga})(WantedMovies);