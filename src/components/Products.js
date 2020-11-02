import React, { useState, useEffect } from "react";
import { formatCurrency } from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchActions } from "../actions/productAction";
import { addToCart } from "../actions/cartAction";

function Products(props) {
    const [productInModal, setProductInModal] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        props.fetchActions();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openModal = (product) => {
        setSelectedSize("");
        setProductInModal(product);
    };

    const closeModal = () => {
        setProductInModal(null);
    };

    return (
        <div>
            <Fade bottom sascade={true}>
                {!props.products ? (
                    <div>Loading ...</div>
                ) : (
                    <ul className="products">
                        {props.products.map((product) => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} onClick={() => openModal(product)}>
                                        <img src={product.image} alt={product.title} />
                                        <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <select className="product-size" onChange={(e) => setSelectedSize(e.target.value)}>
                                            {product.availableSizes.map((size) => (
                                                <option value={size} key={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                        <button className="button primary" onClick={() => props.addToCart(product, selectedSize ? selectedSize : product.availableSizes[0])}>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Fade>
            {productInModal && (
                <Modal isOpen={true} conRequestClose={closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}>
                            X
                        </button>
                        <div className="product-details">
                            <img src={productInModal.image} alt={productInModal.title} />
                            <div className="product-details-description">
                                <p>
                                    <strong>{productInModal.title}</strong>
                                </p>
                                <p>{productInModal.description}</p>
                                <p>
                                    Avaliable Sizes
                                    {productInModal.availableSizes.map((x) => (
                                        <span>
                                            <button className="button">{x}</button>
                                        </span>
                                    ))}
                                </p>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(productInModal.price)}
                                        <select className="product-size" onChange={(e) => setSelectedSize(e.target.value)}>
                                            {productInModal.availableSizes.map((size) => (
                                                <option value={size} key={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className="button primary"
                                            onClick={() => {
                                                props.addToCart(productInModal, selectedSize ? selectedSize : productInModal.availableSizes[0]);
                                                closeModal();
                                            }}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            )}
        </div>
    );
}

export default connect(
    (state) => ({
        products: state.products.filteredItems,
    }),
    {
        fetchActions,
        addToCart,
    }
)(Products);
