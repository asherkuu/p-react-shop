import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orderAction";
import { formatCurrency } from "../util";

const Orders = (props) => {
    const orders = props.orders;

    useEffect(() => {
        props.fetchOrders();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return !orders ? (
        <div>Orders</div>
    ) : (
        <div className="orders">
            <h2>Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADDRESS</th>
                        <th>ITEMS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td> {formatCurrency(order.total)}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.address}</td>
                            <td>
                                {order.cartItems.map((item, index) => (
                                    <div key={index}>
                                        {item.size} {" - "}
                                        {item.count} {" x "} {item.title}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default connect(
    (state) => ({
        orders: state.order.orders,
    }),
    {
        fetchOrders,
    }
)(Orders);
