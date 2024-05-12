// import {$authHost, $host} from "./index";
// import jwt_decode from "jwt-decode";

// export const registration = async (email, password) => {
//     const {data} = await $host.post('api/client/registration', {email, password, role: 'USER'})
//     localStorage.setItem('token', data.token)
//     return jwt_decode(data.token)
// }

// export const login = async (email, password) => {
//     const {data} = await $host.post('api/client/login', {email, password})
//     localStorage.setItem('token', data.token)
//     return jwt_decode(data.token)
// }

// export const check = async () => {
//     const {data} = await $authHost.get('api/client/auth' )
//     localStorage.setItem('token', data.token)
//     return jwt_decode(data.token)
// }
