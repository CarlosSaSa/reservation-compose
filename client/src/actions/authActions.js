/**
 * Acciones que seran ejecutadas en el dispatch
 */

import { types } from "../types/types";
import { decodeToken } from "../utils/decode/decodeJWT";
import { LoginFetch } from "../utils/fetch/autenticacion";
import Swal from 'sweetalert2';

// Payload es un objeto con las mismas caracteristicas del state
export const Login = ( payload ) => ({ type: types.Login, payload  });

export const Logout = () => ({ type: types.Logout });

// estado es una variable que es true o false dependiendo de la carga
const isLoading = ( isLoading ) => ({ type: types.Loading, payload: isLoading });

// Funcion para ejecutar el login, esto es una operacion asincrona
// body: Objecto con los campos a enviar al back
export const startLogin = ( body ) => {
    return async ( dispatch ) => {
        // obtenemos el estado asociado al reducer del login
       
        // actualizamos el state para el iniciar el estado de carga
        dispatch( isLoading( true ) );
        const resp = await LoginFetch( body );
        
        
        Swal.fire({
            icon: !resp.token? 'error': 'success',
            titleText: `${resp.mensaje}`,
        })
        // si el token no ha venido en la peticion entonces salimos
        if ( !resp.token ) {
            dispatch( isLoading( false ) );
            return;
        }
        // decodificamos el token
        const payload = decodeToken( resp.token );

        // si el token es nulo entonces es un token no valido
        if ( !payload ) {
            Swal.fire({
                icon: 'error',
                titleText: 'Error del servidor',
            })
            dispatch( isLoading(false) );
            return;
        }
        // eliminamos las propiedades de iat y exp
        delete payload.iat;
        delete payload.exp;

        // Guardamos en localstorage y actualizamos el state
        localStorage.setItem('token', resp.token);
        dispatch( Login( payload ) );
    }
}