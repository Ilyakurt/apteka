import React, { useState } from 'react';
import ShopItem from './ShopItem';
import AddIcon from '@material-ui/icons/Add';
import CardDetail from './CardDetail';

const ShopBody = ( { items, setItems} ) => {
    const [dialogState, setDialogState] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

    const insertOrUpdateItem = ( data ) => {
        const foundIndex = items.findIndex(item => item.id === data.id);
        // console.log(data)
        if (foundIndex !== -1) {
            // console.log(data.id)
            setItems(items.map(item => (item.id === data.id ? data : item)))
        } else {
            const tempArr = items;
            tempArr.push(data);
            setItems(tempArr);
        }
    };

    const deleteCard = item => {
        setItems(items.filter(el => el.id !== item.id))
    };

    return (
        <div className="shop-body">
            <div>
                <button onClick={() => setDialogState(true)} className="btn">
                    <AddIcon/>
                </button>
                {/* <button onClick={getObjectFromDB} className="btn">
                    <AddIcon/>
                </button> */}
                <CardDetail
                dialogState={dialogState}
                setDialogState={setDialogState}
                item={activeCard}
                insertOrUpdateItem={insertOrUpdateItem}
                />
            </div>
            <div className="grid">
                {
                items.map(item => (
                <ShopItem
                    key={item.id}
                    setItems={setItems}
                    item={item}
                    setActiveCard={setActiveCard}
                    deleteCard={deleteCard}
                    setDialogState={setDialogState}
                />)) }
            </div>
        </div>
    );
}

export default ShopBody;