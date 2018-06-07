import React from 'react'
import './helloWorld.scss'
import { is, fromJS } from 'immutable'
import { comments} from '../../service/getData'
class HelloWorld extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'Hello World',
            list:[]
        }
        // this.visitCount = this.visitCount.bind(this)
        this.songCommonts = this.songCommonts.bind(this)
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
    // async visitCount() {
    //     try {
    //         const res = await visitCount(this.state.countData);
    //         this.setState({
    //             text: res.msg
    //         })
    //         console.log(res)
    //     } catch (error) {
    //         console.log("catch错误：", error);

    //     }
    // }
    async songCommonts(){
        console.log('commont')
        try{
            const res = await comments({ type: 'comments', id:'446875807'});
            console.log(res)
            this.setState({
                list:res.comments
            })
        }catch(error){

        }
    }
    render(){
        return(
            <div>
                <p>{this.state.text}</p>
            </div>
        )
    }
    componentDidMount(){
        // this.visitCount();
        this.songCommonts()
    }
    componentDidUpdate(){

    }
    componentWillUnmount(){

    }
}

export default HelloWorld;