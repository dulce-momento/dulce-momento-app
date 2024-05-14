import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchClientDeliveries } from '../http/productAPI';

const Profile = observer(() => {
    const { client } = useContext(Context);
    const [deliveries, setDeliveries] = useState('');
    //const location = useLocation(); fetchClientDeliveries
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate(LOGIN_ROUTE);
        }
        else {
            fetchClientDeliveries().then(data => { console.log(data); setDeliveries(data) });

            //console.log(deliveries[0]);
        }
    }, []);

    const name = client.client['name'] + " " + client.client['surname']
        + (client.client['patronymic'] == null || client.client['patronymic'] == '' ? '' : " " + client.client['patronymic']);
    const email = client.client["email"];

    const logOut = () => {
        client.setClient({});
        client.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(0);
    };

    return (
        <Container id="auth-cont"
            className="d-flex justify-content-center flex-column align-items-center mt-5"

        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Профиль</h2>
                <Container className="d-flex flex-column">
                    <div>
                        ФИО: {name}
                    </div>
                    <div>
                        E-Mail: {email}
                    </div>
                    <Button
                        variant={"outline-primary"}
                        onClick={() => logOut()}
                        className="mt-4"
                    >
                        Выйти
                    </Button>
                </Container>
            </Card>
            {deliveries.length > 0 &&
                <Card style={{ width: "100%" }} className='mt-4 p-5'>
                    <h2 className="m-auto">Заказы</h2>
                    <Row className="d-flex flex-column m-3">
                        {deliveries?.map((delivery, index) =>
                            <Row key={delivery.id} style={{ background: index % 2 === 0 ? '#fff0ff' : '#fffff0', padding: 10 }}>
                                ID: {delivery.id}; Адрес: {delivery.address}; Сумма: {delivery.sum} руб.;
                                Статус: <span style={{ color: delivery.status == "Обработано" ? 'green' : 'orange' }}>{delivery.status}</span>; Дата: {delivery.createdAt}
                            </Row>
                        )}
                    </Row>
                </Card>
            }
        </Container>
    );
});

export default Profile;
