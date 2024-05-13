import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
//import star from '/star.png'
import {useNavigate} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";
import "../index.css";

const ProductItem = ({product}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className={"mt-3 product-item"} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{cursor: 'pointer'}} className='item-card' border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL+"/" + product.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className='product-name-text'>{product.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{product.rating}</div>
                        <Image width={18} height={18} src={'/star_full.png'}/>
                    </div>
                </div>
                <div>{product.price} руб.</div>
            </Card>
        </Col>
    );
};

export default ProductItem;
