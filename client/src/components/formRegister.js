import React, { useState } from 'react';
import { Button, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useStyleForm } from '../styles/styleTabs';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const FormRegister = ( { handleChange, values, handleSubmit, isValid, dirty, errors, touched, handleBlur } ) => {

  const classesForm = useStyleForm();
  const [showPassword, setShowPassword ] = useState(false);
  const [ showRepeatPassword, setRepeatPassword] = useState(false);

  return (
    // con onSubmit evitacion la propagacion del evento es decir que se recarge de nuevo la pagina 
    <form noValidate autoComplete="off" onSubmit={ handleSubmit }>
      <Grid container justify="space-between">
        <Grid item xs={12} md={5}>
          <TextField
            className={classesForm.espacio}
            label="Nombre"
            margin = "none"
            placeholder="Ej. Ian"
            fullWidth
            multiline
            name="nombre"
            onBlur = { handleBlur }
            onChange={handleChange}
            value ={ values.nombre }
            error = { touched.nombre && errors.nombre ? true : false }
            helperText={ touched.nombre && errors.nombre && errors.nombre }
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            className={classesForm.espacio}
            label="Apellidos"
            placeholder="Ej. Vn"
            margin="none"
            fullWidth
            multiline
            name="apellido"
            onChange={handleChange}
            onBlur = { handleBlur }
            value = { values.apellido }
            error = { touched.apellido && errors.apellido ? true : false  }
            helperText={ touched.apellido && errors.apellido && errors.apellido }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classesForm.espacio}
            label="Correo"
            placeholder="Ej. yo@com.mx"
            fullWidth
            multiline
            margin="none"
            name="correo"
            value = { values.correo }
            onChange={handleChange}
            onBlur = { handleBlur }
            error = { touched.correo && errors.correo ? true: false }
            helperText={ touched.correo && errors.correo && errors.correo  }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className={classesForm.espacio} error = { touched.password && errors.password ? true: false }>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={ showPassword ? 'text' : 'password'}
              value={ values.password }
              name="password"
              onChange={ handleChange }
              onBlur = { handleBlur }
              endAdornment={
                <IconRegister setshowPassword = { setShowPassword } showPassword = { showPassword } />
              }
            />
            { touched.password && errors.password && <FormHelperText> { errors.password } </FormHelperText> }
          </FormControl>
        </Grid>
        <Grid container item xs={12} justify="center">
          <FormControl fullWidth className={classesForm.espacio} error = { touched.repeatPassword && errors.repeatPassword ? true: false }>
            <InputLabel htmlFor="standard-adornment-repeatpassword"> Confirmación de contraseña </InputLabel>
            <Input
              id="standard-adornment-repeatpassword"
              type={ showRepeatPassword ? 'text' : 'password'}
              value={ values.repeatPassword }
              name="repeatPassword"
              onBlur = { handleBlur }
              onChange={ handleChange }
              endAdornment={
                <IconRegister setshowPassword = { setRepeatPassword } showPassword = { showRepeatPassword } />
              }
            />
            {touched.repeatPassword && errors.repeatPassword && <FormHelperText> { errors.repeatPassword } </FormHelperText> }
          </FormControl>

          <Button
            className={ classesForm.boton }
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled= { !(isValid && dirty)  }
            startIcon={<PersonAddIcon />}
          >
            Registrarse
      </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const IconRegister = ({ setshowPassword, showPassword }) => {
  return (
    <InputAdornment position="end">
    <IconButton
      aria-label="toggle password visibility"
      onClick={() => setshowPassword( !showPassword ) }
      onMouseDown={(e) => e.preventDefault()}
    >
      { showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>
  )
}
