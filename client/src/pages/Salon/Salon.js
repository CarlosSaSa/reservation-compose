import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getClassRoomById, getReservationsById } from '../../utils/fetch/user'
import { Backdrop, CircularProgress, Grid, makeStyles, Snackbar } from '@material-ui/core';
import { Modal } from '../../components/Modal/Modal';
import { FormularioModal, LogoutModal } from '../../components/Modal/ContentsModel';
import { customFooter } from '../../components/custom/customFooter';
import { CustomIconToolbar } from '../../components/custom/customIconToolbar';
import Page from '../../components/dashboard/Page';
import MUIDataTable from "mui-datatables";
import { Alert } from '@material-ui/lab';



const columns = [
    { name: "fecha_inicio", label: "Fecha de inicio", options: { sort: false } },
    { name: "fecha_fin", label: "Fecha de fin", options: { sort: false } },
    { name: "salon.nombreSalon", label: "Salón", options: { sort: false } },
    { name: "usuario.correo", label: "Correo del usuario", options: { sort: false } },
]

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
    },
    espacio: {
        margin: '10px 0'
    },
    boton: {
        margin: '10px 10px'
    }
}));

export const Salon = () => {

    const { id } = useParams();
    const [reservaciones, setReservaciones] = useState({ data: [], isLoading: true });
    const [salon, setSalon] = useState({ _id: '', nombreSalon: '' });
    const [openModal, setOpenModal] = useState({ open: false, children: null });
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, mensaje: {} });
    const classes = useStyles();

    // efecto para comprobar la existencia del id
    useEffect(() => {
        // obtenemos el token de localstorage
        const token = localStorage.getItem('token') || '';

        Promise.all([getReservationsById(id, token), getClassRoomById(id)])
        .then(values => {
            setReservaciones({ data: values[0].Reservaciones, isLoading: false });
            setSalon(values[1].salon);
        })
        .catch(error => {
                setReservaciones({ data: [], isLoading: false });
                setSalon(state => ({ ...state, _id: '', nombreSalon: '' }));
        });

    }, [id]);

    useEffect(() => {

        // Si es undefined es decir que no se encontraron las reservaciones por algun error del token
        if (reservaciones.data === undefined) {
            setOpenModal({ open: true, children: <LogoutModal setOpenModal = { setOpenModal }  /> } )
        }

    }, [reservaciones]);


    // funcion para el cambio de pagina
    const onChangePage = async (numeroPagina) => {
        // hacemos la peticion hacia el servidor
        try {
            setReservaciones({ ...reservaciones, isLoading: true });
            const token = localStorage.getItem('token') || null;
            const data = await getReservationsById(id, token, numeroPagina + 1);
            setReservaciones({ data: data.Reservaciones, isLoading: false });
        } catch (error) {
            console.log('error', error);
            setReservaciones({ data: [], isLoading: false });
        }

    }

    const openForm = () => {
        setOpenModal({ open: true, children: <FormularioModal setOpenModal = { setOpenModal } salon = { salon } setOpenSnackBar = { setOpenSnackBar } /> })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar({...openSnackBar, open: false});
    };

 
    // opciones
    const opciones = {
        serverSide: true,
        download: false,
        print: false,
        responsive: 'standard',
        selectableRowsHeader: false,
        selectableRows: 'none',
        customFooter: customFooter,
        customToolbar: () => <CustomIconToolbar openForm = { openForm } />,
        onChangePage: onChangePage,
        textLabels: {
            body: {
                noMatch: 'No se encontraron mas registros'
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
            <Grid container justify="center" alignContent="center" >
                <Grid item xs={12} md={10} >
                    <Backdrop className={classes.backdrop} open={reservaciones.isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <MUIDataTable
                        title={`Lista de horario para el salon: ${salon.nombreSalon}`}
                        data={reservaciones.data}
                        columns={columns}
                        options={opciones}
                    />
                    <Modal openModal = { openModal }  />

                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackBar.open } autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={!openSnackBar.mensaje.Reservacion ? "error" : "success"}>
                            { openSnackBar.mensaje.mensaje }
                        </Alert>
                    </Snackbar>

                </Grid>
            </Grid>

        </Page>
    )
}

