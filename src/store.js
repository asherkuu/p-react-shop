import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducers } from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import { orderReducers } from "./reducers/orderReducers";

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        products: productsReducers,
        cart: cartReducers,
        order: orderReducers,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
