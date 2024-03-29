import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddle from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddle();
export const middelwares = [thunk, sagaMiddleware, logger]; 

export const store = createStore(rootReducer, (applyMiddleware(...middelwares)));
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {
  store,
  persistor
};