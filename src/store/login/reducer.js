import * as pro from './action-types'
let defaultState = {
    userinfo: {},
    error: {}
}
export const loginInfo = (state = defaultState, action) => {
    switch (action.type) {
        case pro.LOGIN_INFO:
            return {...state, ...action }
        case pro.LOGIN_FAILIURE:
            return {...state, ...action }
        default:
            return state;
    }
}