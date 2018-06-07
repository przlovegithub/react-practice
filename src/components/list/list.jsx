import React from 'react'
import { is, fromJS } from 'immutable'
// import { comments } from '../../service/api'
// import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Comments from './comments'
import  './list.scss'
class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'this is List',
            comments: [{
                "user": {
                    "nickname": "阿让的狐狸",
                    "avatarUrl": "https://p1.music.126.net/Qxet_PkzB26oGWC1c8hLNw==/109951163331703486.jpg",
                },
                "content": "十年。再见，十年",
            },
                {
                    "user": {
                        "nickname": "彡枫雨灬白狐",
                        "avatarUrl": "https://p1.music.126.net/Z4AUNUMgFIBEM-iMukMdHg==/109951163325307405.jpg",
                    },
                    "content": "十年之后，我希望我还可以看见你，与你一起玩耍",
                },
                {
                    "user": {
                        "nickname": "---Pluto--",
                        "avatarUrl": "https://p1.music.126.net/tmuenXGJDLbQivxL5RLv1A==/18705991325421304.jpg",
                    },
                    "content": "话说，距离北京奥运会已经十年了。。。。",
                }]
        }
        // this.visitCount=this.visitCount.bind(this)
        // this.songCommonts = this.songCommonts.bind(this)
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
    // async visitCount() {
    //     try {
    //         const res = await visitCount(this.state.countData);
    //         this.setState({
    //             text:res.msg
    //         })
    //         console.log(res)
    //     } catch (error) {
    //         console.log("catch错误：", error);

    //     }
    // }
    // async songCommonts() {
    //     try {
    //         const res = await comments();
    //         console.log(res)
    //         this.setState({
    //             list: res.comments
    //         })
    //     } catch (error) {

    //     }
    // }
    // songCommonts(){
    //     comments().then((res)=>{
    //         console.log(res)
    //     })
    // }
    render() {
        return (
           <div>
                <div>{this.state.text}</div>
                <button onClick={this.visitCount}>点击触发ajax</button>
                {/* <section className="record-nav-con">
                    <nav className="record-nav">
                        <NavLink to={`${this.props.match.path}/passed`} className="nav-link" activeClassName="selected">已通过</NavLink>
                        <NavLink to={`${this.props.match.path}/audited`} className="nav-link" >待审核</NavLink>
                        <NavLink to={`${this.props.match.path}/failed`} className="nav-link" activeStyle={{ color: '#ccc', 'borderBottomColor': '#ccc' }}>未通过</NavLink>
                    </nav>
                    <i className="nav-flag-bar" style={{ left: this.state.flagBarPos }}></i>
                </section>
                <Switch>
                    <Route path={`${this.props.match.path}/:type(passed|audited|failed)`} component={Comments} />
                    <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/passed`} exact component={Comments} />
                </Switch> */}
                <Comments data={this.state.comments}/>
            </div>
        )
    }
    componentDidMount() {
        // this.visitCount();
        // this.songCommonts()
    }
    componentDidUpdate() {

    }
    componentWillUnmount() {

    }
}
export default List;