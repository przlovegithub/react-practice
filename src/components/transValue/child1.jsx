import React from 'react'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import emitter from '../../utils/eventEmitter'
import './child1.scss'
class Child1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            child2ToChild1:1
        }
        this.child2parent=this.child2parent.bind(this);
    }
    componentWillReceiveProps(props) {

    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentWillUpdate(nextProps, nextState) {

    }
    componentWillMount() {

    }
    child2parent(msg){
        return this.props.callback(msg)
    }
    render() {
        let { callback, parent2child}=this.props;
        return (
            <div style={{ 'backgroundColor': 'orange' }}>
                <div className="parent2child" style={{ 'color': '#fff', 'backgroundColor': 'green' }}>{parent2child}</div>
                <button onClick={() => { callback('child1子组件向parent父组件传值')}}>child1子组件向parent父组件传值</button>
                <div className="parent2child" style={{'color':'#fff','backgroundColor':'blue'}}>{this.state.child2ToChild1}</div>
            </div>
        )
    }
    componentDidMount() {
        // this.eventEmitter = emitter.addListener('changeMessage',(info)=>{
        //     // this.setState((prevState, props) => ({
        //     //     child2ToChild1: info
        //     // }))
        //     this.setState({
        //         child2ToChild1: info
        //     })
        // })
        emitter.on('changeMessage', (info)=>{
            this.setState((prevState, props) => ({
                child2ToChild1: prevState.child2ToChild1+info
            }))
            // this.setState({
            //     child2ToChild1: info
            // })
        })
    }
    componentDidUpdate() {

    }
    componentWillUnmount() {
        // emitter.removeListener(this.eventEmitter);
        
    }
}
Child1.propTypes={
    parent2child:PropTypes.string.isRequired
}
export default Child1;