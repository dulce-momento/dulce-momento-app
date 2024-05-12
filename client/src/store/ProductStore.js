import { makeAutoObservable } from 'mobx';

export default class ProductStore {
    constructor() {
        this._products = [
            {id: 1, name: "Тортик Т", price: 999, rating: 4, img: ""}
        ];
        makeAutoObservable(this);
    };

    setProducts(products) {
        this._products = products;
    };


    get products() {
        return this._products;
    };

};