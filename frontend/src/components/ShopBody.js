import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import ShopItem from './ShopItem';
import CardDetail from './CardDetail';
import {inject, observer} from 'mobx-react';

const ShopBody= props => {
    const [dialogState, setDialogState] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

    // console.log(props.ShopMain.deleteCard);

    return (
        <div className="shop-body">
            <div>
                <button onClick={() => setDialogState(true)} className="btn">
                    <AddIcon/>
                </button>
                <CardDetail
                    dialogState={dialogState}
                    setDialogState={setDialogState}
                    item={activeCard}
                />
            </div>
            <div className="grid">
                {
                  props.ShopMain.items.map(item => (
                        <ShopItem
                            key={item.id}
                            item={item}
                            setActiveCard={setActiveCard}
                            setDialogState={setDialogState}
                        />)) }
            </div>
        </div>
    );
}

export default inject('ShopMain')(observer(ShopBody));