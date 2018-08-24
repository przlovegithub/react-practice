import * as pro from './action-types'

export const login = (param) => {
    return (dispatch) => dispatch({
        type: pro.LOGIN_SUCCESS,
        param
    })
}