import React from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productAction";

function Filter(props) {
    return !props.filteredProducts ? (
        <div></div>
    ) : (
        <div className="filter">
            <div className="filter-result">{props.filteredProducts.length} Products</div>
            <div className="filter-sort">
                Order{" "}
                <select value={props.sort} onChange={(e) => props.sortProducts(props.filteredProducts, e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="hightest">Hightest</option>
                </select>
            </div>
            <div className="filter-size">
                filter{" "}
                <select value={props.size} onChange={(e) => props.filterProducts(props.products, e.target.value)}>
                    <option value="">All</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
    }),
    {
        filterProducts,
        sortProducts,
    }
)(Filter);
