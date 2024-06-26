import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Pages from "../components/Pages";
import { fetchProducts, fetchTypes } from '../http/productAPI';
import ProductList from '../components/ProductList';
import "../index.css";

const Shop = observer(() => {
    const {product} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchProducts(null, 1, 12).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        })
    }, [])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.page, 12).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        })
    }, [product.page, product.selectedType])

    return (
        <Container id="shop-cont">
            <h3>Каталог 🧁</h3>

            <Container className="mt-2">
                    <ProductList/>
                    <Pages id="pages-bar"/>
            </Container>
        </Container>
    );
});

export default Shop;
