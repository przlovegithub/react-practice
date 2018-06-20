import * as pro from './action-type';
import Immutable from 'immutable';
// import { List, Map, toJS } from 'immutable';
let defaultState = {
    dataList: [],
}

export const proData = (state = defaultState, action) => {
    let immuDataList;
    let imuItem;
    switch (action.type) {
        case pro.GETMOVIE:
            return {...state, ...action };

        case pro.TOGGLESELECT:
            immuDataList = Immutable.List(state.dataList);
            imuItem = Immutable.Map(state.dataList[action.index]);
            imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'));
            immuDataList = immuDataList.set(action.index, imuItem);
            return {...state, ... { dataList: immuDataList.toJS() } };

        case pro.EDITMOVIE:
            immuDataList = Immutable.List(state.dataList);
            imuItem = Immutable.Map(state.dataList[action.index]);
            imuItem = imuItem.set('selectNum', action.currentNum);
            immuDataList = immuDataList.set(action.index, imuItem);
            return {...state, ... { dataList: immuDataList.toJS() } };

        case pro.CLEARSELECTED:
            immuDataList = Immutable.fromJS(state.dataList);
            for (let index = 0; index < state.dataList.length; index++) {
                immuDataList = immuDataList.update(index, value => {
                    value = value.set('selectStatus', false);
                    value = value.set('selectNum', 0);
                    return value
                })

            }
            return {...state, ... { dataList: immuDataList.toJS() } };

        default:
            return state;
    }
}