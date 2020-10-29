import React, { useEffect, useMemo, useState } from 'react';
import { LogoutModal } from '../../components/Modal/ContentsModel';
import { Modal } from '../../components/Modal/Modal';
import { getReservationPersonal } from '../../utils/fetch/user';
import { customFooter } from '../../components/custom/customFooter';
import { Container, Grid, makeStyles, Snackbar } from '@material-ui/core';
import Page from '../../components/dashboard/Page';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import MuiDataTable from 'mui-datatables';
import { CustomButton } from '../../components/custom/customButton';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

export const Horarios = () => {

    const classes = useStyles();
    const [openModal, setOpenModal] = useState({ open: false, children: null });
    const [data, setData] = useState({ mensaje: '', Reservaciones: [], ok: true });
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, mensaje: {} });

    useEffect(() => {
        // obtenemos el token
        getReservationPersonal().then(data => {
            setData(data)
            console.log('data del then', data);
        }).catch( error => {
            setData({ mensaje: '', Reservaciones: [], ok: true })
        });
    }, []);

    // efecto para revisar cuando los datos ha cambiado
    useEffect(() => {

        // if( data === undefined ) {
        //     setData({ mensaje: '' , Reservaciones: [], ok: true });
        //     return;
        // }

        // es un 401 entonces abrimos el modal para cerrar sesion
        if (!data.ok) {
            setOpenModal({ open: true, children: <LogoutModal setOpenModal={setOpenModal} /> })
            return;
        }
        if (data.Reservaciones === undefined) {
            setData(state => ({ ...state, Reservaciones: [] }))
            return;
        }
        // tres opciones: que data sea un array vacion, que sea un array con objetos o que sea undefined
        // setData({ mensaje: data.mensaje, reservaciones: data.Reservaciones });

    }, [data])

    const columns = useMemo(() => {
        return [
            { name: "usuario.nombre", label: "Nombre", options: { filter: false, sort: false } },
            { name: "usuario.apellido", label: "Apellido", options: { filter: false, sort: false } },
            { name: "salon.nombreSalon", label: "Salón", options: { filter: false, sort: false } },
            { name: "fecha_inicio", label: "Fecha de inicio", options: { filter: false, sort: false } },
            { name: "fecha_fin", label: "Fecha de fin", options: { filter: false, sort: false } },
            { name: "_id", label: "id", options: { display: false, viewColumns: false } },
            {
                name: "Actualizar",
                options: {
                    filter: false, sort: false, empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => <CustomButton setOpenSnackBar={setOpenSnackBar} setOpenModal={setOpenModal} title="Actualizar" tableMeta={tableMeta} icon={<CreateIcon />} />
                },

            },
            {
                name: "Eliminar",
                options: {
                    filter: false, sort: false, empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => <CustomButton setOpenModal={setOpenModal} title="Eliminar" tableMeta={tableMeta} icon={<DeleteIcon />} />
                }
            }
        ]
    }, []);


    // funcion que se ejecuta cuando se cambia la pagina
    const onChangePage = async (numeroPagina) => {
        try {
            const data = await getReservationPersonal(numeroPagina + 1);
            setData(data);
        } catch (error) {
            setData(state => ({ ...state, Reservaciones: [] }))
        }
    }

    // funcion para cerrar el snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar({ ...openSnackBar, open: false });
    };

    const options = {
        download: false,
        selectableRowsHeader: false,
        selectableRows: 'none',
        serverSide: true,
        print: false,
        responsive: 'standard',
        filter: false,
        search: false,
        customFooter: customFooter,
        textLabels: {
            body: {
                noMatch: 'No se encontraron mas registros'
            },
            toolbar: {
                search: "Buscar",
                viewColumns: "Ver columnas",
                filterTable: "Filtro de tabla",
            },
        },
        onChangePage: onChangePage
    }

    return (
        <Page
            className={classes.root}
            title="Mis horarios"
        >
            <Container maxWidth="lg">
                <Grid container >
                    <Grid item xs={12} >
                        <MuiDataTable title={"Mis horarios"} columns={columns} data={  !data?.Reservaciones ? []: data.Reservaciones  } options={options} />
                        <Modal openModal={openModal} />
                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackBar.open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity={!openSnackBar.mensaje.ReservationUpdated ? "error" : "success"}>
                                {openSnackBar.mensaje.mensaje}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}


