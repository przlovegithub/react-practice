import 'babel-polyfill';
import React from 'react'
import { is, fromJS } from 'immutable'
import { movieList } from '../../service/api'
import './movieList.scss'
var urlType;
class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'',
            movieList:[]
        }

    }
    movieList = async type => {
        try {
            const res = await movieList(type);
            this.setState({
                movieList: res.subjects
            })
        } catch (error) {

        }
    }
    componentWillReceiveProps(props) {

    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentWillUpdate(nextProps, nextState) {
        // 判断类型是否重复
        let currenType = this.props.location.pathname.split('/')[2];
        let type = nextProps.location.pathname.split('/')[2];
        urlType = currenType;
        if (currenType !== type) {
            console.log('props:', currenType, ',', 'nextProps:', type);
            this.movieList(type);
        }
    }
    componentWillMount() {
        let type = this.props.location.pathname.split('/')[2];
        this.movieList(type);
    }
   
    render() {
        return (
            <div>
                <ul>
                    {this.state.movieList.map((el,index)=>{
                        return(
                            <li className="movie-list" key={index}>
                                {urlType === 'us_box' ? (<div>
                                    <span>{el.subject.title}</span>
                                </div>) : (<div>
                                    <span>{el.title}</span>
                                </div>)}
                            </li>)
                    })}
                </ul>
            </div>
        )
    }
    componentDidMount() {

        
    }
    componentDidUpdate() {
        window.temp='urlType';
    }
    componentWillUnmount() {

    }
}
export default MovieList;