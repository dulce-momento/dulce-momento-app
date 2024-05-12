import React, { useContext, useEffect, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { client } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [name, setName] = useState('');
    const [surname, setSur] = useState('');
    const [patronymic, setPatro] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    // if (client.isAuth === true){
    //     location.pathname=PROFILE_ROUTE;
    //     // useEffect(()=>{
    //     //     navigate(PROFILE_ROUTE);
    //     // });
    // }

    const click = async () => {
        try {
            let data;
            if (isLogin === true) {
                data = await login(email, password);
            } else {
                data = await registration(name, surname, patronymic, email, password);
            }
            client.setClient(data);
            client.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container id="auth-cont"
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin === false &&
                        <Form.Control
                            className="mt-3"
                            placeholder="Имя..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />}
                    {isLogin === false &&
                        <Form.Control
                            className="mt-3"
                            placeholder="Фамилия..."
                            value={surname}
                            onChange={e => setSur(e.target.value)}
                        />}
                    {isLogin === false &&
                        <Form.Control
                            className="mt-3"
                            placeholder="Отчество..."
                            value={patronymic}
                            onChange={e => setPatro(e.target.value)}
                        />
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
