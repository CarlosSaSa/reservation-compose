import React from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export const CustomIconToolbar = ({ openForm }) => {
    return (
        <Tooltip title="Agregar nuevo horario" aria-label="add">
            <Fab color="secondary" size="small" onClick={openForm} >
                <AddIcon />
            </Fab>
        </Tooltip>
    )
}
