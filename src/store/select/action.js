import * as pro from './action-type';
import { top250 } from '../../service/api';

export const getData = () => {
    return async(dispatch) => {
        try {
            const res = await top250();
            console.log(res);
            let result = res.subjects.map(item => {
                item.selectStatus = false;
                item.selectNum = 0;
                return item;
            })
            dispatch({
                type: pro.GETMOVIE,
                dataList: result,
            })
        } catch (error) {

        }
    }
}

export const toggleSelectPro = (index) => {
    return {
        type: pro.TOGGLESELECT,
        index
    }
}

export const editNum = (index, currentNum) => {
    return {
        type: pro.EDITMOVIE,
        index,
        currentNum
    }
}

export const clearData = () => {
    return {
        type: pro.CLEARSELECTED
    }
}


export const aboutSaga = () => {
    return (dispatch) => dispatch({
        type: pro.GET_POSTS_SAGA,
    })
}

export const bookSaga = (param) => {
    return (dispatch) => dispatch({
        type: pro.GET_BOOK_SAGA,
        param
    })
}