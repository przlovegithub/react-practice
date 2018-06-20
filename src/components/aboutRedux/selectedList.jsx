import React from 'react'
import {Link} from 'react-router-dom'
import { is, fromJS } from "immutable"
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { getData, toggleSelectPro, editNum } from '../../store/select/action';
import './selectedList.scss'
class SelectedList extends React.Component {
    static propTypes = {
        proData: PropTypes.object.isRequired,
        getData: PropTypes.func.isRequired
    }

    // constructor(props) {
    //     super(props);
    //     this.toggleSelect = this.toggleSelect.bind(this);
    // }

    toggleSelect(index){
        this.props.toggleSelectPro(index);
    }

    handleEdit(index,num){
        let currentNum = this.props.proData.dataList[index].selectNum + num;
        if (currentNum < 0) {
            return
        }
        this.props.editNum(index, currentNum);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    componentWillUpdate(nextProps, nextState) {

    }

    render() {
        return( 
            <div>
                <Link to='./aboutRedux' className="confirm">确定</Link>
                <ul className="item-list">
                    {
                        this.props.proData.dataList.map((item, index) => {
                            return <li className="item-single clearfix" key={index}>
                                <div className={`item-select ${item.selectStatus ? 'actived' : ''}`} onClick={()=>this.toggleSelect(index)}>
                                {/* <div className={`item-select ${item.selectStatus ? 'actived' : ''}`} onClick={this.toggleSelect.bind(this,index)}> */}
                                  <p>{item.title}</p>
                                </div>
                                <div className="item-edit">
                                    <span className="minus" onClick={this.handleEdit.bind(this,index,-1)}>-</span>
                                    <span className="selectNum">{item.selectNum}</span>
                                    <span className="plus" onClick={this.handleEdit.bind(this,index,1)}>+</span>
                                </div>
                              </li>;
                        })
                    }
                </ul>
            </div>);
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentDidMount() {
        if (!this.props.proData.dataList.length){
            this.props.getData();
        }
        
    }

    componentWillUnmount(prevProps, prevState) {

    }
}

export default connect((state)=>({
    proData:state.proData
}), { getData, toggleSelectPro, editNum})(SelectedList);