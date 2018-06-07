import React from 'react'
import { is, fromJS } from 'immutable'
import emitter from '../../utils/eventEmitter'
import './child2.scss'
class Child2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
    child2ToChild1(message){
        emitter.emit('changeMessage', message);
    }
    render() {
        return (
            <div style={{ 'backgroundColor': 'green' }}>
                <button onClick={this.child2ToChild1.bind(this,1)}>Child2组件传值给Child1组件</button>
                <button onClick={() => { this.props.child2parent('Child2组件传值给父组件')}}>Child2组件传值给parent父组件</button>
            </div>
        )
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    componentWillUnmount() {

    }
}
export default Child2;