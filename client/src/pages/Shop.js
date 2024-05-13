import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Pages from "../components/Pages";
import { fetchProducts, fetchTypes } from '../http/productAPI';
import ProductList from '../components/ProductList';
import "../index.css";
import TypeBar from '../components/TypeBar';

const Shop = observer(() => {
    const {product} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchProducts(null, 1, 10).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        })
    }, [])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.page, 10).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        })
    }, [product.page, product.selectedType, ])

    return (
        <Container id="shop-cont">
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <ProductList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
