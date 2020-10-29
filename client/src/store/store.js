/**
 * Store el cual almacenará los reducers
 */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

// reducers
import { AuthReducer } from "../reducers/authReducer";

// Constante para poder usar middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: AuthReducer
});

// crear la store
export const store = createStore( reducers, composeEnhancers( applyMiddleware( thunk ) ) );

