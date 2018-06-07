import React from 'react'
import {NavLink} from 'react-router-dom'
import LifeCycle from './lifeCycle'
import './parentLifeCycle.scss'
class ParentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'World',
            destroyed: false,
            rerender: false,
            actived:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.destroyComponent = this.destroyComponent.bind(this);
        this.handleRerender = this.handleRerender.bind(this);
    }

    handleChange() {
        this.setState((prevState, props) => ({
            value: prevState.value + ' react',
            actived: !prevState.actived
        }));
    }

    handleRerender() {
        this.setState({ rerender: true });
    }

    destroyComponent() {
        this.setState({ destroyed: true });
    }

    render() {
        if (this.state.destroyed) return null;
        return (
            <div>
                <p className='changeButton'>
                    <button className={this.state.actived?'actived':''} onClick={this.handleChange}>改变LifeCyle的props</button>
                    <button onClick={this.handleRerender}>父组件重新渲染，子组件re-render</button>
                    <button onClick={this.destroyComponent}>删除组件</button>
                </p>
                <LifeCycle value={this.state.value} />
                <NavLink className="navlink" to={{
                    pathname:'/parentTransValue',
                    search: '?sort=name',
                    hash: '#the-hash',
                    state: { fromDashboard: true }
                }} activeClassName="selected" activeStyle={{
                    fontWeight: 'bold',
                    color: 'red'
                }}>父子及非父子组件之间传值</NavLink>
            </div>
        );
    }
}


export default ParentLifeCycle