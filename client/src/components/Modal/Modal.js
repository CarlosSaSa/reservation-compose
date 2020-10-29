import React from 'react'
import { Dialog, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export const Modal = ({ openModal}) => {

    return (
        <Dialog
            TransitionComponent={ Transition }
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            fullWidth
            open={openModal.open}
            aria-labelledby="responsive-dialog-title"
        >
            {  openModal.children }
        </Dialog>
    )
}
