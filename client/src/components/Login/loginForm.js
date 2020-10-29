import { Button, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useSelector } from "react-redux";
import PersonPinIcon from '@material-ui/icons/PersonPin';
import React, { useState } from 'react';
import { LoginStyles } from '../../styles/styleLogin';

export const LoginForm = ({ errors, handleBlur, handleChange, handleSubmit, isValid, touched, values }) => {

    const [showPassword, setShowPassword] = useState(false);
    const loginStyles = LoginStyles();

    const { isLoading } = useSelector(state => state.auth)

    return (
        <form onSubmit={handleSubmit} >
            <Grid container>
                <Grid item xs={12} className = { loginStyles.spacingLabels } >
                    <TextField
                        value={values.correo}
                        name="correo"
                        label="Correo electronico"
                        placeholder="Ej. yo@yo.com"
                        multiline
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.correo && errors.correo ? true : false}
                        helperText={touched.correo && errors.correo && errors.correo}
                    />
                </Grid>
                <Grid item container justify="center" xs={12} className = { loginStyles.spacingLabels }>
                    <FormControl fullWidth error={touched.password && errors.password ? true : false}>
                        <InputLabel htmlFor="standard-adornment-password"> Contraseña </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            value={values.password}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            endAdornment={<IconPassword setShowPassword={setShowPassword} showPassword={showPassword} />}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {touched.password && errors.password && <FormHelperText> {errors.password} </FormHelperText>}
                    </FormControl>
                    <Button
                        className={ loginStyles.spacingButton }
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={ isLoading }
                        startIcon={< PersonPinIcon />}
                    >
                        Iniciar Sesión
                </Button>
                </Grid>
            </Grid>
        </form>
    )
}

const IconPassword = ({ setShowPassword, showPassword }) => {

    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
            >
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    )

}