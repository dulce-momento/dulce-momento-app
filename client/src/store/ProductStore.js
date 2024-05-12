import { makeAutoObservable } from 'mobx';

export default class ProductStore {
    constructor() {
        this._isAuth = false;
        this._client = {};
        makeAutoObservable(this);
    };

    setIsAuth(bool) {
        this._isAuth = bool;
    };

    setClient(client) {
        this._client = client;
    };

    get isAuth() {
        return this._isAuth;
    };

    get client() {
        return this._client;
    };
};