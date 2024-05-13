import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateProduct from '../components/modals/CreateProduct';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { SHOP_ROUTE } from '../utils/consts';

const Admin = () => {
    const [productVisible, setProductVisible] = useState(false);
    const { client } = useContext(Context);
    const navigate = useNavigate();

    useEffect(()=>{
        if(client.client['role']!="ADMIN")
            navigate(SHOP_ROUTE);
    },[]);

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Добавить товар
            </Button>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
        </Container>
    );
};

export default Admin;
