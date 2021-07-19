import React from 'react';

const ShopItem = ( props ) => {

    const detailHandler = () => {
        props.setActiveCard(props.item);
        props.setDialogState(true);
    }

    return(
        <div className="card">
            <div className="card-topbar">
                <button onClick={() => props.deleteCard(props.item)}>X</button>
            </div>
            <div className="card-body" onClick={detailHandler}>
                <div className="title">{props.item.title}</div>
                <div className="description">{props.item.description}</div>
                <div className="url">{props.item.url}</div>
                <div className="date">{props.item.date}</div>
            </div>
        </div>
    );
}

export default ShopItem;