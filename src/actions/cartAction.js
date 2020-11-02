import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (product, size) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;

    cartItems.forEach((x) => {
        if (x._id === product._id && size === x.size) {
            // is existed in cart
            alreadyExists = true;
            x.count++;
        }
    });

    if (!alreadyExists) {
        cartItems.push({ ...product, count: 1, size: size });
    }

    dispatch({
        type: ADD_TO_CART,
        payload: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product, size) => (dispatch, getState) => {
    const cartItems = getState()
        .cart.cartItems.slice()
        .filter((x) => x._id !== product._id || (x._id === product._id && size !== x.size));

    dispatch({
        type: REMOVE_FROM_CART,
        payload: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
