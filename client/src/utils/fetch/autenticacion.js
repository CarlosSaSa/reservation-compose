/**
 * Funciones que haran uso de fecth para hacer el registro y el login
*/
import { URL } from "../../config/config";

// body - Objecto que sera enviado como body de la peticion, debe tener nombre, apellido, correo, password
export const RegisterFetch = async ( body ) => {

    // url
    const urlPeticion = `${ URL }/home/register`;

    // opciones para fetch
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( body )
    }

    try {
        const response = await fetch(urlPeticion, opciones);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }

}

// peticion fetch para el login
//Body -> Es un objeto con correo y password
export const LoginFetch = async ( body ) => {

    const urlPeticion = `${ URL }/home/login`;

    // Opciones para la peticion
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( body )
    }

    // realizamos la peticion fetch
    try {
        const respuesta = await fetch(urlPeticion, options);
        const data = await respuesta.json();
        return data;
    } catch (error) {
        return error;
    }

}