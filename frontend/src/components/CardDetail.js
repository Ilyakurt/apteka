import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import uuid from 'react-uuid'
import {inject, observer} from "mobx-react";

const CardDetail = ( props ) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputURL, setInputURL] = useState("");

    useEffect(() => {
            setInputTitle(props.ShopMain.activeCard?.title);
            setInputDescription(props.ShopMain.activeCard?.description);
            setInputURL(props.ShopMain.activeCard?.url);
        }, [props.ShopMain.activeCard]
    );

    const titleHandler = e => {
        setInputTitle(e.target.value)
    };
    const descriptionHandler = e => {
        setInputDescription(e.target.value)
    };
    const urlHandler = e => {
        setInputURL(e.target.value)
    };

    const insertOrUpdateItemMain = () => {
        props.ShopMain.insertOrUpdateItem(
            {
                id: props.ShopMain.activeCard ? props.ShopMain.activeCard.id : uuid(),
                title: inputTitle,
                description: inputDescription,
                url: inputURL,
                date: props.ShopMain.activeCard ? props.ShopMain.activeCard.date : Date.now()
            }
        )

        setInputTitle("")
        setInputDescription("")
        setInputURL("")

        props.setDialogState(false);
    };

    return (
        <Dialog
            open={props.dialogState}
            onClose={() => props.setDialogState(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Item Details"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">
                                Title
                            </span>
                        <input
                            onChange={titleHandler}
                            type="text"
                            className="form-control"
                            value={inputTitle}
                        />
                    </div>
                    <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">
                                Description
                            </span>
                        <textarea
                            onChange={descriptionHandler}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            value={inputDescription}>
                            </textarea>
                    </div>
                    <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">
                                URL
                            </span>
                        <input
                            onChange={urlHandler}
                            type="text"
                            className="form-control"
                            value={inputURL}
                        />
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={insertOrUpdateItemMain} color="primary">
                    Save
                </Button>
                <Button onClick={() => props.setDialogState(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default inject('ShopMain')(observer(CardDetail));