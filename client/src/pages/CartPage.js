import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Image, Row } from "react-bootstrap";
import CreateProduct from '../components/modals/CreateProduct';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { deleteCartItem, fetchClientCart } from '../http/productAPI';
import "../index.css";
import { observer } from 'mobx-react-lite';

const CartPage = () => {
    
    const { client } = useContext(Context);

    //const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState({});

    const [sum, setSum] = useState(0);


    const removeItem = (id) => {
        deleteCartItem(id).then(data => {
            //console.log(cart.filter(cartItem => {return cartItem.id==data })[0].product.price);
            setSum(sum - cart.filter(cartItem => {return cartItem.id==data })[0].product.price);
            setCart(cart.filter(cartItem => cartItem.id != data));
        });
        
    }
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate(LOGIN_ROUTE);
        } else {
            fetchClientCart().then(data => {
                setCart(data);
                let s = Number(0);
                for (let i = 0; i < data.length; i++) {
                    s += Number(data[i].product.price);
                }
                setSum(s);
                
                //console.log(sum)
            });

            //console.log(cart);
        }
    }, []);

    return (
        <Container className="d-flex flex-column" id="cart-cont">
            {cart.length <= 0 ? <h3>Корзина пуста 🧁</h3> : <h3>Корзина 🧁</h3>}

            {cart.length > 0 &&
                <div id='cart-items-div'>
                    {cart?.map(cartItem => <Row key={cartItem.id} style={{ background: cartItem.id % 2 === 0 ? '#fff0ff' : '#fffff0', padding: 10 }}>
                        <Image width={50} height={50} src={process.env.REACT_APP_API_URL + "/" + cartItem.product.img} />
                        <span>{cartItem.product.name} - {cartItem.product.price} руб.</span>
                        <Button onClick={() => removeItem(cartItem.id)} variant={"outline-danger"}>❌</Button>
                    </Row>)}
                    <span style={{ alignSelf: 'end', marginTop: '10px', fontWeight: "700" }}>
                        Сумма: {sum} руб.
                    </span>
                </div>
            }
        </Container>
    );
};

export default observer(CartPage);
