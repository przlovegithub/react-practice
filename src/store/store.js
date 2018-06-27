import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import * as select from './select/reducer'
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware, logger];
let store = createStore(
    combineReducers(select),
    // combineReducers({...reducer1,...reducer2}),//有多个reducer合并
    composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export default store;