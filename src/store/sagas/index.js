import { delay } from 'redux-saga';
import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects';
import * as pro from '../select/action-type';
import { commingSoon, searchBook } from '../../service/api';
import { instance } from '../../service/apiConfig';
// worker saga
function* showPostsAsync(action) {
    try {
        console.log('action', action);
        //yield delay(10000)//暂停saga执行，然后延迟10s后再执行saga(即后面的部分)
        // const response = yield call(instance.get, '/v2/movie/coming_soon');
        const response = yield call(commingSoon, '');
        // 同时执行多个任务
        // const [top250, comingSoon] = yield [call(instance.get, '/v2/movie/top250'), call(instance.get, '/v2/movie/coming_soon')];
        // console.log('任务并发', top250, comingSoon)
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

// saga可以使用call、fetch等api发起异步操作，操作完成后使用put函数触发action，同步更新state，从而完成整个State的更新

// saga需要一个全局监听器（watcher saga），用于监听组件发出的action，将监听到的action转发给对应的接收器（worker saga），再由接收器执行具体任务，任务执行完后，再发出另一个action交由reducer修改state，所以这里必须注意：watcher saga监听的action和对应worker saga中发出的action不能是同一个，否则造成死循环


// wacther saga
function* watchGetPosts() {
    yield takeLatest(pro.GET_POSTS_SAGA, showPostsAsync);
}

// function* helloSaga() {
//     console.log('hello saga');
//     yield 'hello saga'
// }


function* getBookAsync(action) {
    console.log('bookAction', action);

    const booklist = yield call(searchBook, action.param);
    yield put({ type: pro.GET_BOOKS, bookList: booklist.books });
}

function* takeGet() {
    yield takeLatest(pro.GET_BOOK_SAGA, getBookAsync);
}


// yield all---同时执行多个saga
// root saga
export default function* rootSaga() {
    yield all([watchGetPosts(), takeGet()])
        // yield all([watchGetPosts(), helloSaga()])
        // yield watchGetPosts() //单独调用(只能单独调用一个saga)
        // yield takeGet()
        // yield helloSaga()
}