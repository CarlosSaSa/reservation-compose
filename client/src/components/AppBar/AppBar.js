import React, { Fragment, useState } from 'react';
import { useAppBar } from '../../styles/styleTabs';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import { FormRegister } from '../formRegister';
import { Formik } from 'formik';
import { RegisterForm, LoginFormObject } from '../../utils/FormObjects';
import { SchemaRegister, SchemaLogin } from '../../utils/SchemasForm';
import { LoginForm } from '../Login/loginForm';
import { RegisterFetch } from '../../utils/fetch/autenticacion';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/authActions';

export const AppBarLeft = () => {

    const appBarClasses = useAppBar();
    const [value, setValue] = useState(0);

    // para actualizar el state
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Unicamente se ejecuta cuando el formulario es valido
    const onSubmitRegister = async (field, actions) => {
        // field son todos los values de los campos del formulario
        const resp = await RegisterFetch( field );
        Swal.fire({
            icon: !resp.Usuario? 'error': 'success',
            titleText: `${resp.mensaje}`,
        })
        actions.resetForm();
        // actions.setSubmitting(false);
    }

    // Cuando el formulario sea valido
    // async
    const onSubmitLogin = ( field, actions ) => {
        // field son las etiquetas que corresponden al formulario
        actions.resetForm();
        actions.setSubmitting(false);
        dispatch( startLogin( field ) );
    }

    return (
        <Fragment>
            <AppBar position="static" color="transparent" className={appBarClasses.root}>
                <Tabs variant="fullWidth" value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Iniciar Sesión" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab label="Registrarse" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Formik
                    initialValues = { LoginFormObject }
                    validationSchema = { SchemaLogin }
                    onSubmit = { onSubmitLogin }
                    children = { (props) => <LoginForm { ...props } /> }
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <Formik
                    initialValues = { RegisterForm }
                    validationSchema = { SchemaRegister }
                    onSubmit = { onSubmitRegister }  
                    children = { props => <FormRegister {...props} /> }
                />
            </TabPanel>
        </Fragment>
    )
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    {children}
                </Box>
            )}
        </div>
    );
}
