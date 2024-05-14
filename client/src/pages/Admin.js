import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, Row } from "react-bootstrap";
import CreateProduct from '../components/modals/CreateProduct';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { SHOP_ROUTE } from '../utils/consts';
import { fetchAllDeliveries, updateDeliveryDate } from '../http/productAPI';
import { observer } from 'mobx-react-lite';

const Admin = () => {
    const [productVisible, setProductVisible] = useState(false);
    const { client } = useContext(Context);
    const [deliveries, setDeliveries] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (client.client['role'] != "ADMIN")
            navigate(SHOP_ROUTE);
        else {

            fetchAllDeliveries().then(data => { console.log(data); setDeliveries(data) });

        }
    }, []);

    const updateDelivery = (id) => {
        updateDeliveryDate(id).then(
            data => {
                setDeliveries(deliveries.filter(i => i.id !== data));
                console.log(data);
            }
        );

    }

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-primary"}
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Добавить товар
            </Button>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
            {deliveries.length > 0 &&
                <Card style={{ width: "100%" }} className='mt-4 p-5'>
                    <h2 className="m-auto">Заказы</h2>
                    <Row className="d-flex flex-column m-3">
                        {deliveries?.map((delivery, index) =>
                            <Row key={delivery.id} style={{ justifyContent: 'space-between', background: index % 2 === 0 ? '#fff0ff' : '#fffff0', padding: 10 }}>
                                <span>ID: {delivery.id}; Адрес: {delivery.address}; Сумма: {delivery.sum} руб.;
                                    Статус: <span style={{ color: delivery.status == "Обработано" ? 'green' : 'orange' }}>{delivery.status}</span>;
                                    Дата: {delivery.createdAt}; Пользователь #{delivery.clientId}</span>
                                <Button onClick={() => updateDelivery(delivery.id)} variant={"outline-success"}>✅</Button>
                            </Row>
                        )}
                    </Row>
                </Card>
            }
        </Container>
    );
};

export default observer(Admin);
