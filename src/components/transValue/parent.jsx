import React from 'react'
import ReactDOM from 'react-dom'
import { is, fromJS } from 'immutable'
import Child1 from './child1'//引入组件命名首字母需要大写
import Child2 from './child2'
import './parent.scss'
class Parent extends React.Component{
    constructor(props){
        // 初始化执行一次
        super(props);
        this.state = {
            text:'',
            child2parent:'',
            child12parent:'',
            num:0,
            count:10
        }
        this.callBack=this.callBack.bind(this); //绑定this
    }
    componentWillReceiveProps(props){
        // props变化时执行
    }
    shouldComponentUpdate(nextProps,nextState){
        // props、state变化时执行
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentWillUpdate(nextProps, nextState){
        // 组件更新时执行
        if (nextState.count <= 0) {//监听count变化，清除定时器
            clearInterval(this.timerID)
        }
    }
    componentWillMount(){
        // 初始化时执行一次
    }
    tick=()=>{//使用箭头函数绑定this
        this.setState((prevState, props) => ({
            count: prevState.count-1
            // count: prevState.count--(--不管用)
        }))
    }
    callBack(msg){
        this.setState((prevState,props)=>({
            child12parent:msg
        }))
        console.log(msg)
    }
    child2parent(info,num){
        this.setState((prevState,props)=>({
            child2parent: info + prevState.num++
        }))
    }
    parent2child(msg){
        this.setState({
            text:msg
        })
        console.log(msg)
    }
    render(){
        // shouldComponentUpdate返回true时执行
        return(
            <div>
                <div ref='content' className={this.state.child2parent ? 'content' :'nocontent'}>{this.state.child2parent}</div>
                <div className={this.state.child2parent ? 'content' :'nocontent'}>{this.state.child12parent}</div>
                {<button id="button" ref={(btn)=>{this.nameBtn=btn}} onClick={this.parent2child.bind(this, 'parent父组件向child1子组件传值')}>parent父组件向child1子组件传值</button>}
                <Child1 ref="subComponent" parent2child={this.state.text} callback={this.callBack}/>
                <Child2 child2parent={this.child2parent.bind(this)}/>
                {/* 条件判断需要在{}大括号中进行，表达式嵌入在{}中，以便用来在{}中嵌入任何的javascript表达式 */}
                {this.state.count>0 ? (<div className='timer'>定时器：{this.state.count}</div>) : (<div className='timer'>定时器：定时器已清除</div>)}
            </div>
        )
    }
    componentDidMount(){
        // 初始化时执行一次，此时可操作DOM
        // React操作DOM的两种方式：1、使用选择器；2、使用ref
        let Btn = document.getElementById('button');
        ReactDOM.findDOMNode(Btn).style.backgroundColor = 'green';
        // ref方式一：string形式
        this.refs.content.style.backgroundColor='springgreen';
        // ref方式二：回调函数形式(官方推荐)，回调函数形式共有三种触发方式：1、组件渲染后；2、组件卸载后；3、ref改变后
        this.nameBtn.style.color='orange';

        console.log(this.props,this.props.match.params.id)
        console.log(this.refs.subComponent)
        // this.refs.subComponent.style.color='red'
        this.timerID = setInterval(() => this.tick(), 1000);
       
        
    }
    componentDidUpdate(){
        // 组件更新时执行
    }
    componentWillUnmount(){
        // 组件销毁时执行一次
        clearInterval(this.timerID)
    }
}
export default Parent;