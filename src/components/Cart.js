import React, { useState } from "react";
import { formatCurrency } from "../util";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartAction";
import { createOrder, clearOrder } from "../actions/orderAction";

function Cart(props) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [showCheckout, setShowCheckout] = useState(false);

    const creatOrder = (e) => {
        e.preventDefault();

        const order = {
            name: name,
            email: email,
            address: address,
            cartItems: props.cartItems,
            total: props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };

        props.createOrder(order);
    };

    const closeModal = () => {
        props.clearOrder();
    };

    return (
        <div>
            {props.cartItems.length === 0 ? <div className="cart cart-header">Cart is empty !</div> : <div className="cart cart-header">You have {props.cartItems.length} in the cart </div>}

            {props.order && (
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}>
                            x
                        </button>
                        <div className="order-details">
                            <h3 className="success-message">Your order has been placed.</h3>
                            <h2>Order {props.order._id}</h2>
                            <ul>
                                <li>
                                    <div>Name:</div>
                                    <div>{props.order.name}</div>
                                </li>
                                <li>
                                    <div>Email:</div>
                                    <div>{props.order.email}</div>
                                </li>
                                <li>
                                    <div>Address:</div>
                                    <div>{props.order.address}</div>
                                </li>
                                <li>
                                    <div>Date:</div>
                                    <div>{props.order.createdAt}</div>
                                </li>
                                <li>
                                    <div>Total:</div>
                                    <div>{formatCurrency(props.order.total)}</div>
                                </li>
                                <li>
                                    <div>Cart Items:</div>
                                    <div>
                                        {props.order.cartItems.map((x) => (
                                            <div>
                                                {console.log(x)}
                                                {x.size}
                                                {" - "} {x.count} {" x "} {x.title}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Zoom>
                </Modal>
            )}
            <div>
                <div className="cart">
                    <Fade left cascade={true}>
                        <ul className="cart-items">
                            {props.cartItems.map((item, index) => (
                                <li key={item._id + index}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            <span className="cart-product-size">{item.size}</span>
                                            {formatCurrency(item.price)} X {item.count}{" "}
                                            <button className="button" onClick={() => props.removeFromCart(item, item.size)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                {props.cartItems.length !== 0 && (
                    <div>
                        <div className="cart">
                            <div className="total">
                                <div>Total : {formatCurrency(props.cartItems.reduce((a, c) => a + c.price * c.count, 0))}</div>
                            </div>
                            <button className="button primary" onClick={() => setShowCheckout(true)}>
                                Proceed
                            </button>
                        </div>

                        {showCheckout && (
                            <Fade right cascase={true}>
                                <div className="cart">
                                    <form onSubmit={creatOrder}>
                                        <ul className="form-container">
                                            <li>
                                                <label htmlFor="">Email</label>
                                                <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </li>
                                            <li>
                                                <label htmlFor="">Name</label>
                                                <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
                                            </li>
                                            <li>
                                                <label htmlFor="">Address</label>
                                                <input type="text" name="address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </li>
                                            <li>
                                                <button type="submit" className="button primary">
                                                    Checkout
                                                </button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </Fade>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    { removeFromCart, createOrder, clearOrder }
)(Cart);
