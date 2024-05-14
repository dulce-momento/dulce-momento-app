import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import "../../index.js"
import { createDelivery, updateCartItemsDeliveryId } from '../../http/productAPI.js';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../utils/consts.js';

const OrderProduct = observer(({ show, onHide }) => {
    const { cart } = useContext(Context);
    //console.log(cart.sum);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const addDelivery = () => {
        createDelivery({address: address, sum: cart.sum}, cart.cart).then(data => onHide());
        navigate(0);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оформить заказ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='order-form'>
                    <Form.Control
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="mt-3"
                        placeholder="Адрес..."
                    />
                    <Form.Select aria-label="Default select example">
                        <option disabled selected hidden>Способ оплаты</option>
                        <option value="1">Наличными</option>
                        <option value="2">Картой</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                        <option disabled selected hidden>Способ доставки</option>
                        <option value="1">Курьер</option>
                        <option value="2">Самовызов</option>
                    </Form.Select>
                    <span>Сумма: {cart.sum} руб.</span>
                    <hr />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDelivery}>Оплатить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default OrderProduct;
