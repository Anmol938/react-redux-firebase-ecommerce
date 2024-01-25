import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import rootReducer from './rootReducer';

export const middelwares = [thunk, logger]; 

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middelwares)));

export default store;