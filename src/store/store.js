import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as select from './select/reducer'

let store = createStore(
    combineReducers(select),
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;