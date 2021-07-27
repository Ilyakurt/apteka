import {action, makeAutoObservable, observable} from "mobx";

export default class ItemStore{
    @observable items=[];
    @observable activeCard;

    constructor() {
        makeAutoObservable(this)
    }

    @action
    insertOrUpdateItem = ( data ) => {
        const foundIndex = this.items.findIndex(item => item.id === data.id);
        if (foundIndex !== -1) {
            this.items=(this.items.map(item => (item.id === data.id ? data : item)))
        } else {
            const tempArr = this.items;
            tempArr.push(data);
            this.items=tempArr;
        }
    };

    @action
    deleteCard = item => {
        this.items=(this.items.filter(el => el.id !== item.id))
    }
}