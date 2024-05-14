import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._cartItems = [];
        this._sum = 0;
        makeAutoObservable(this);
    }

    setCart(cartItems) {
        this._cartItems = cartItems;
    }
    setSum(sum) {
        this._sum = sum;
    }

    get cart() {
        return this._cartItems;
    }
    get sum() {
        return this._sum;
    }
}
