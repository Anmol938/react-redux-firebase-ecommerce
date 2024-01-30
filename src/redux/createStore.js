import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddle from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddle();
export const middelwares = [thunk, sagaMiddleware, logger]; 

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middelwares)));
sagaMiddleware.run(rootSaga);

export default store;