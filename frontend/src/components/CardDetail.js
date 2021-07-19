import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import uuid from 'react-uuid'

const CardDetail = ( props ) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputURL, setInputURL] = useState("");
    const [editedItem, setEditedItem] = useState(null);
    
    useEffect(() => {
        // console.log(props.item);
        setEditedItem(props.item);
        setInputTitle(props.item?.title);
        setInputDescription(props.item?.description);
        setInputURL(props.item?.url);
        }, [props.item]
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
        // add or update
        props.insertOrUpdateItem(
            {
                id: editedItem ? editedItem.id : uuid(), 
                title: inputTitle, 
                description: inputDescription, 
                url: inputURL, 
                date: editedItem ? editedItem.date : Date.now()
            }
        )

        setInputTitle("")
        setInputDescription("")
        setInputURL("")
        setEditedItem(null);

        props.setDialogState(false);

    };

    return (
        <Dialog
                open={props.dialogState}
                onClose={() => props.setDialogState(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Item Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">Title</span>
                            <input onChange={titleHandler} type="text" className="form-control" value={inputTitle}/>
                        </div>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">Description</span>
                            {/* <input onChange={descriptionHandler} type="text" className="form-control" defaultValue={props.item? props.item.description : ""}/> */}
                            <textarea onChange={descriptionHandler} className="form-control" id="exampleFormControlTextarea1" rows="3" value={inputDescription}></textarea>
                        </div>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">URL</span>
                            <input onChange={urlHandler} type="text" className="form-control" value={inputURL}/>
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

export default CardDetail;