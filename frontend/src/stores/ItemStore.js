import {action, makeAutoObservable, observable} from "mobx";

export default class ItemStore{
    @observable value;
    constructor() {
        makeAutoObservable(this)
        this.value = 0;
    }
    @action
    setValue(data) {
        this.value=data;
    }
}