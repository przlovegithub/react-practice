import React from 'react'
import './helloWorld.scss'
import { is, fromJS } from 'immutable'

class HelloWorld extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'Hello World',
            list:[]
        }

    }
    componentWillReceiveProps(nextProps){

    }
    shouldComponentUpdate(nextProps,nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentWillUpdate(nextProps,nextState){

    }
    componentWillMount(){

    }

    render(){
        return(
            <div>
                <p>{this.state.text}</p>
            </div>
        )
    }
    componentDidMount(){

    }
    componentDidUpdate(){

    }
    componentWillUnmount(){

    }
}

export default HelloWorld;