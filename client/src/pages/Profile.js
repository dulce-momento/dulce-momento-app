import React, { useContext, useEffect } from 'react';
import { Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Profile = observer(() => {
    const { client } = useContext(Context);
    //const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') == null)
            navigate(LOGIN_ROUTE);
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
            className="d-flex justify-content-center align-items-start mt-5"
            
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
        </Container>
    );
});

export default Profile;
