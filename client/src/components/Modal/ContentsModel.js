/**
 * Archivo donde se encuentran los componentes a ser renderizados en el cuerpo del modal
 */
import React, { Fragment, useEffect, useState } from "react";
import {
    Button, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl, Grid, InputLabel, makeStyles, MenuItem, Select
} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch } from "react-redux";
import { Field, Formik } from "formik";
import { Logout } from "../../actions/authActions";
import { SchemaDate } from "../../utils/SchemasForm";
import { getAllClassRoom, insertarReservacion, updateReservation } from "../../utils/fetch/user";
import { DatePicker } from "../DatePicker/DatePicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";


import MomentUtils from "@date-io/moment";
import moment from 'moment';
import "moment/locale/es-mx";

moment.locale('es-mx');

const useStyles = makeStyles(({
    espacio: {
        margin: '10px 0'
    },
    boton: {
        margin: '10px 10px'
    }
}));



export const LogoutModal = ({ setOpenModal }) => {

    const dispatch = useDispatch();
    const cerrarSesion = () => {
        setOpenModal({ open: false, children: null });
        // iniciar logout
        localStorage.clear();
        dispatch(Logout());
    }
    return (
        <Fragment >
            <DialogTitle> {"La sesíon ha caducado"} </DialogTitle>
            <DialogContent >
                <DialogContentText> La sesión ha caducado, por favor inicie sesión de nuevo </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={cerrarSesion}> Ok </Button>
            </DialogActions>
        </Fragment>
    )

}

// Componente para hacer la insercion de un evento
export const FormularioModal = ({ setOpenModal, salon, setOpenSnackBar }) => {


    const onSubmit = async (values, actions) => {

        // obtenemos el token
        const token = localStorage.getItem('token') || '';
        try {
            const data = await insertarReservacion(token, values);
            // actions.setSubmitting(false);
            // si la data viene con el mensaje ok = false indica que se tiene un 401 es decir
            // el token es invalido y debemos cerrar sesion
            if (!data.ok) {
                setOpenModal(state => ({ ...state, children: <LogoutModal setOpenModal={setOpenModal} /> }))
            } else {
                setOpenModal({ open: false, children: null });
                setOpenSnackBar({ open: true, mensaje: data });
            }

        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <Fragment>
            <DialogTitle> {"Insertar nueva reservación"} </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{ fecha_inicio: moment().toDate(), fecha_fin: moment().add(1, 'hour').toDate(), salon: `${salon._id}` }}
                    validationSchema={SchemaDate}
                    onSubmit={onSubmit}
                    children={(props) => <Formulario {...props} setOpenModal={setOpenModal} salon={salon} />}
                />
            </DialogContent>
        </Fragment>
    )
}

// Formulario asociado al modal
const Formulario = ({ handleSubmit, values, setOpenModal, salon }) => {

    const classes = useStyles();

    const cerrarModal = () => {
        setOpenModal({ open: false, children: null });
    }

    return (
        <MuiPickersUtilsProvider libInstance={moment} locale={"es-mx"} utils={MomentUtils} >
            <form onSubmit={handleSubmit}  >
                <Grid container>
                    <Grid item xs={12} >
                        <Field className={classes.espacio} name="fecha_inicio" component={props => <DatePicker {...props} identificador="fecha_inicio" />} />
                        <Field className={classes.espacio} name="fecha_fin" component={props => <DatePicker {...props} identificador="fecha_fin" />} />
                        <InputLabel id="demo-simple-select-disabled-label"> Salón </InputLabel>
                        <FormControl disabled fullWidth>
                            <Select fullWidth defaultValue={values.salon} >
                                <MenuItem value={values.salon} > {salon.nombreSalon} </MenuItem>
                            </Select>
                        </FormControl>
                        <Grid container justify="flex-end" >
                            <Button
                                className={classes.boton}
                                variant="contained"
                                color="secondary"
                                endIcon={<CancelIcon />}
                                onClick={cerrarModal}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className={classes.boton}
                                variant="contained"
                                color="primary"
                                endIcon={<CreateIcon />}
                            >
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </form>
        </MuiPickersUtilsProvider>
    )


}

// formulario asociado a la actualizacion de un evento
export const FormularioModalUpdated = ({ dataUser, setOpenModal, setOpenSnackBar }) => {

    const onSubmit = async (values, actions) => {
        // hacemos la operacion fetch con los valores
        try {
            const resp = await updateReservation(values, dataUser._id);
            // si la data viene con el mensaje ok = false indica que se tiene un 401 es decir
            // el token es invalido y debemos cerrar sesion
            if (!resp.ok) {
                setOpenModal(state => ({ ...state, children: <LogoutModal setOpenModal={setOpenModal} /> }))
            } else {
                setOpenModal({ open: false, children: null });
                setOpenSnackBar({ open: true, mensaje: resp });
            }
        } catch (error) {
            console.log('error');
        }
    }


    return (
        <Fragment>
            <DialogTitle> {"Actualizar evento"} </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        { fecha_inicio: moment(dataUser.fecha_inicio,'dddd, D [de] MMMM [de] YYYY h:mm:ss a').toDate(), 
                          fecha_fin: moment(dataUser.fecha_fin,'dddd, D [de] MMMM [de] YYYY h:mm:ss a').toDate(), 
                          salon: dataUser["salon._id"] 
                        } }
                    validationSchema={SchemaDate}
                    onSubmit={onSubmit}
                    children={(props) => <FormularioUpdated {...props} setOpenModal={setOpenModal} />}
                />
            </DialogContent>
        </Fragment>
    )

}

// vista del formulario
const FormularioUpdated = ({ handleSubmit, handleChange, handleBlur, values, setOpenModal }) => {

    const classes = useStyles();
    const [salones, setSalones] = useState([]);

    // Obtener los salones
    useEffect(() => {
        getAllClassRoom().then( salones => setSalones(salones.Salones) ).catch(error => setSalones([]))
    }, [])

    const cerrarModal = () => {
        console.log('cerrando modal');
        setOpenModal({ open:false, children: null });
    } 


    return (
        <MuiPickersUtilsProvider libInstance={moment} locale={"es-mx"} utils={MomentUtils} >
            <form onSubmit={handleSubmit}  >
                <Grid container>
                    <Grid item xs={12} >
                        <Field className={classes.espacio} name="fecha_inicio" component={props => <DatePicker {...props} identificador="fecha_inicio" />} />
                        <Field className={classes.espacio} name="fecha_fin" component={props => <DatePicker {...props} identificador="fecha_fin" />} />
                        <InputLabel id="demo-simple-select-disabled-label"> Salón </InputLabel>
                        <FormControl fullWidth>
                            <Select name="salon" fullWidth  value={ values.salon } onChange={ handleChange } onBlur={ handleBlur } >
                               {
                                   salones.length <= 0 ? 
                                   <MenuItem value={ values.salon } > { "Cargando salones ..." } </MenuItem>
                                   : salones.map( salon => {
                                       return (
                                           <MenuItem key={ salon._id } value={ salon._id } > { salon.nombreSalon } </MenuItem>
                                       )
                                   } )
                               }
                            </Select>
                        </FormControl>
                        <Grid container justify="flex-end" >
                            <Button
                                className={classes.boton}
                                variant="contained"
                                color="secondary"
                                endIcon={<CancelIcon />}
                                onClick={cerrarModal}
                            >
                                Cancelar
                        </Button>
                            <Button
                                type="submit"
                                className={classes.boton}
                                variant="contained"
                                color="primary"
                                endIcon={<CreateIcon />}
                            >
                                Actualizar
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </form>
        </MuiPickersUtilsProvider>
    )


}
