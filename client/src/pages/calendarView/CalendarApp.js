import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { getAllReservatios } from '../../utils/fetch/user';
import Page from '../../components/dashboard/Page';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from "mui-datatables";
import { customFooter } from '../../components/custom/customFooter';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

const columns = [
    {
        name: 'fecha_inicio',
        label: 'Fecha de inicio',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'fecha_fin',
        label: 'Fecha de fin',
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: 'salon.nombreSalon',
        label: 'Salón'
    },
    {
        name: 'usuario.nombre',
        label: 'Usuario'
    },
    {
        name: 'usuario.correo',
        label: 'Correo'
    },
];



export const CalendarApp = () => {
    const classes = useStyles();
    const [horarios, setHorarios] = useState({ data: [], isLoading: true });

    useEffect(() => {
        // Hacemos la opetracion fetch
        getAllReservatios(1, 5)
            .then(data => {
                setHorarios({ data: data.Reservaciones, isLoading: false });
            })
            .catch(error => {
                setHorarios({ data: [], isLoading: false });
                console.log('error', error)
            });

    }, []);

    const onChangePage = async (currentPage) => {
        try {
            setHorarios({ ...horarios, isLoading: true });
            const { Reservaciones } = await getAllReservatios(currentPage + 1);
            setHorarios({ data: Reservaciones, isLoading: false });

        } catch (error) {
            setHorarios({ data: [], isLoading: false });
            return error;
        }
    }


    const options = {
        serverSide: true,
        print: false,
        download: false,
        responsive: 'standard',
        selectableRowsHeader: false,
        selectableRows: 'none',
        onChangePage: onChangePage,
        customFooter: customFooter,
        textLabels: {
            body: {
                noMatch: 'No se encontrarón mas registros'
            },
            toolbar: {
                search: "Buscar",
                viewColumns: "Ver columnas",
                filterTable: "Filtro de tabla",
            },
        }
    }

    return (
        <Page
            className={classes.root}
            title="Horarios"
        >
            <Grid container justify="center" >
                <Grid item xs={12} md={10} >
                    <Backdrop className={classes.backdrop} open={horarios.isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <MUIDataTable
                        title="Lista de horarios"
                        data={horarios.data}
                        columns={columns}
                        options={options}
                    />
                </Grid>
            </Grid>

        </Page>
    )
}

