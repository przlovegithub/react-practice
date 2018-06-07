import React from 'react'
import { is, fromJS } from 'immutable'
import './comments.scss'
class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'this is List',
            
        }

    }
    componentWillReceiveProps(props) {

    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps.location.pathname.split('/')[2]);
    }
    componentWillMount() {

    }
   
    render() {
        return (
            <div>
                <ul>
                    {this.props.data.map((el,index)=>{
                        return(
                            <li key={index}>
                                <p>{el.user.nickname}</p>
                                <img src={el.user.avatarUrl} alt=''/>
                                <p>{el.content}</p>
                            </li>)
                    })}
                </ul>
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
export default Comments;