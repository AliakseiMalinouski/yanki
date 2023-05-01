import React from "react";
import {Alert, Snackbar} from '@mui/material';


export const Snack = React.memo(({state, content, handleClose}) => {
    return (
        <Snackbar open={state} onClose={handleClose} autoHideDuration={3000}>
            <Alert severity={'success'}>
                {content}
            </Alert>
        </Snackbar>
    )
})