import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useHeader } from '../../styles/styleHeader';
import { AppBarLeft  } from '../AppBar/AppBar';


export const Header = () => {

    const classes = useHeader();
    return (
        <header className={classes.header}>
            <Grid container className={classes.container}>
                <Grid item xs={12} md={6} className={classes.logo}  >
                </Grid>
                <Grid item xs={12} md={6} className={classes.texto}>
                    <Typography variant="h1" align="center" className={classes.titulo}> Bienvenido al sistema de reservación de aulas </Typography>
                    <AppBarLeft />
                </Grid>
            </Grid>
        </header>
    )
}

