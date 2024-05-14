import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { createCartItem, fetchInfosByProductId, fetchOneProduct } from '../http/productAPI';
import "../index.css";
import StarRatingReadOnly from '../components/StarRatingReadOnly';
import { CART_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import {Context} from "../index";

const ProductPage = observer(() => {
    const [product, setProduct] = useState({ info: [] });
    const { id } = useParams();
    const navigate = useNavigate();
    const { client } = useContext(Context);

    const addToCart = () =>{
        createCartItem(client.client.id, product.id);
        navigate(CART_ROUTE);
    }

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
        fetchInfosByProductId(id).then(infos => setProduct(product + infos));

    }, []);
    return (
        <Container className="mt-3">
            <Container id='item-desc'>
                <Image width={300} height={300} src={process.env.REACT_APP_API_URL + "/" + product.img} />
                <Container>
                    <h4 className='mb-2'>{product.name}</h4>
                    <StarRatingReadOnly rating={product.rating} />
                    <div id='price-div'>
                        {client.isAuth && <Button variant={"outline-primary"} onClick={addToCart}
                         style={{ padding: "5px", marginTop: "10px" }}>Добавить в корзину</Button>
                         }
                        <span>{product.price} руб.</span>
                    </div>
                </Container>
            </Container>
            <Row className="d-flex flex-column m-3">
                <h1>Описание</h1>
                {product.product_infos?.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? '#fff0ff' : '#fffff0', padding: 10 }}>
                        {info.title}: {info.info}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default ProductPage;
