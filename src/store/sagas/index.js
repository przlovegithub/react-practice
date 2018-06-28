import { delay } from 'redux-saga';
import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects';
import * as pro from '../select/action-type';
import { commingSoon } from '../../service/api';
import { instance } from '../../service/apiConfig';
// worker saga
function* showPostsAsync(action) {
    try {
        console.log(111);

        //yield delay(10000)//暂停saga执行，然后延迟10s后再执行saga(即后面的部分)
        const response = yield call(instance.get, '/v2/movie/coming_soon');
        console.log(response.subjects);
        let result = response.subjects.map(item => {
            item.selectStatus = false;
            item.selectNum = 0;
            return item;
        })
        yield put({ type: pro.GET_MOVIES_SAGA, commingSoonList: result });
    } catch (e) {
        // yield put({ type: GET_POSTS_FAIL, error: e });
    }
}

// takeEvery---允许并发（译注：即同时处理多个相同的 action）
// takeLatest---不允许并发，dispatch一个action时,如果之前已经有正在处理这个action中,那么正在处理的action会被取消，执行当前的action
// wacther saga
function* watchGetPosts() {
    yield takeLatest(pro.GET_POSTS_SAGA, showPostsAsync);
}

// function* helloSaga() {
//     console.log('hello saga')
// }


// yield all---同时执行多个saga
// root saga
export default function* rootSaga() {
    // yield all([watchGetPosts(), helloSaga()])
    yield watchGetPosts() //单独调用(只能单独调用一个saga)
}