import React, { useContext } from 'react';
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Profile = observer(() => {
    const { client } = useContext(Context);
    //const location = useLocation();
    const navigate = useNavigate();
    // if (client.isAuth === false)
    //     navigate(LOGIN_ROUTE);
    const name = client.client['name'];
    const email = client.client["email"];

    return (
        <Container id="auth-cont"
            className="d-flex justify-content-top align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Профиль</h2>
                <Container className="d-flex flex-column">
                    ФИО: {name}
                    E-Mail: {email}
                </Container>
            </Card>
        </Container>
    );
});

export default Profile;
