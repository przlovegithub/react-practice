import React from 'react'
import './lifeCycle.scss'
class LifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: 'React' };
        this.changeState = this.changeState.bind(this);
        console.log('constructor');
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    changeState() {
        this.setState({ name: 'React-World' });
    }

    render() {
        console.log('render');
        return (
            <div>
                <button className='lifeCycle' onClick={this.changeState}>改变lifeCycle的state</button>
                <p>Hello {this.props.value}</p>
                <p>Hello {this.state.name}</p>
            </div>
        );
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
    }

    componentWillUnmount(prevProps, prevState) {
        console.log('componentWillUnmount');
    }
}

export default LifeCycle