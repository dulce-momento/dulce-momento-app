import {makeAutoObservable} from "mobx";

export default class RatingStore {
    constructor() {
        this._curRating = 0;
        makeAutoObservable(this);
    }

    setCurRating(r) {
        this._curRating = r;
    }

    get curRating() {
        return this._curRating;
    }

}
