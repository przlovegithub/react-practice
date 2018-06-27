import 'babel-polyfill';
import React from 'react'
import './example.scss'
import { is, fromJS } from 'immutable'
import {  DatePicker } from "antd";
import locale from "antd/lib/date-picker/locale/zh_CN";
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'anti',
            list: []
        }

    }


    componentWillReceiveProps(nextProps) {

    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentWillUpdate(nextProps, nextState) {

    }
    componentWillMount() {

    }

    render() {
        return (
            <div>
                <DatePicker locale={locale} />
                <p>{this.state.text}</p>
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

export default Example;