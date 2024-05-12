import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (name, surname, patronymic, email, password) => {
    const { data } = await $host.post('api/client/signup', 
    { name, surname, patronymic, email, password, role: 'USER' });
    localStorage.setItem('token', data.token);

    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post('api/client/signin', { email, password });
    localStorage.setItem('token', data.token);
    console.log(jwtDecode(data.token));
    return jwtDecode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get('api/client/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};
