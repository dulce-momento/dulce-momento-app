import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { checkIfBoughtPrev, checkIfCanReview, createCartItem, createRating, fetchInfosByProductId, fetchOneProduct, fetchRatings } from '../http/productAPI';
import "../index.css";
import StarRatingReadOnly from '../components/StarRatingReadOnly';
import { CART_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import StarRating from '../components/StarRating';

const ProductPage = observer(() => {
    const [product, setProduct] = useState({ info: [] });
    const { id } = useParams();
    const navigate = useNavigate();
    const { client } = useContext(Context);
    const [ratings, setRatings] = useState('');
    const [canReview, setCanReview] = useState(false);
    const [textAreaComment, setComment] = useState(null);
    const { curRating } = useContext(Context);

    const addToCart = () => {
        createCartItem(client.client.id, product.id);
        navigate(CART_ROUTE);
    }

    const addRating = () => {
        createRating({
            clientId: client.client.id, productId: id,
            comment: textAreaComment, rating: curRating.curRating
        })
            .then(data => console.log(data));
        navigate(0);
    }

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
        fetchInfosByProductId(id).then(infos => setProduct(product + infos));
        fetchRatings(id).then(data => setRatings(data));
        // checkIfCanReview(id).then(data => data == null);
        // checkIfBoughtPrev(id).then(data => data != null);
        let bool = false;
        if (localStorage.getItem('token') != null) {
            checkIfBoughtPrev(id).then(data => {
                bool = data != null;
                setCanReview(bool)
                //console.log(bool);
            });
            checkIfCanReview(id).then(data => {
                bool = bool && data === null;
                setCanReview(bool);
                //console.log(bool);

            });
        }

        // if(canReview===true){
        //     checkIfCanReview(id).then(data => setCanReview(data === null));
        // }
    }, []);
    //console.log(textAreaComment);

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
            <Row className="d-flex flex-column m-3">
                {canReview &&
                    <Container >
                        <h1>Оставьте отзыв 🙏</h1>
                        <textarea value={textAreaComment}
                            placeholder="Комментарий..." style={{ width: '100%' }}
                            onChange={e => setComment(e.target.value)} />

                        <StarRating />

                        <Button
                            variant={"primary"}
                            className="md-4 p-2"
                            onClick={() => addRating()}
                        >
                            Оставить отзыв
                        </Button>
                    </Container>}
                <h1>Отзывы</h1>
                {ratings.length <= 0 && <span>Пока что пусто... 🥨</span>}


                {ratings.length > 0 && ratings?.map((rating, index) =>
                    <Row key={rating.id} style={{
                        background: index % 2 === 0 ? '#fff0ff' : '#fffff0', padding: 10,
                        display: 'flex', flexFlow: 'column'
                    }}>
                        <p style={{ fontWeight: 700 }}>{rating.client.name + " " + rating.client.surname} ({rating.createdAt})</p>
                        <p style={{ marginRight: '20px' }}>{rating.comment}</p>
                        <StarRatingReadOnly rating={rating.rating} />
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default ProductPage;
