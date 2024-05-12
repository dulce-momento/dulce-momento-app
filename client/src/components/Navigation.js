import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE} from "../utils/consts";
import {Button, Image} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import '../index.css';

const Navigation = observer(() => {
    const {client} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        client.setUser({})
        client.setIsAuth(false)
    }

    return (
        <Navbar bg="transparent" variant="dark">
            <Container>
                <NavLink id='nav-brand' style={{color: '#6d597a', fontFamily: "Polka"}} to={SHOP_ROUTE}>Dulce Momento</NavLink>
                {client.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <NavLink to={LOGIN_ROUTE}>
                        <Image src="/account.png" />
                    </NavLink>
                    <Link to={CART_ROUTE}>
                        <Image src="/cart.png" />
                    </Link>
                    
                </Nav>
            </Container>
        </Navbar>

    );
});

export default Navigation;
