/**
 * Funciones para hacer peticiones fetch al servidor
 * 
 */

import { URL } from "../../config/config";
import moment from 'moment';

export const getAllReservatios = async (page = 1, size = 10) => {

    try {
        const resp = await fetch(`${URL}/user/getAllReservations?page=${page}&size=${size}`);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Error', error);
    }

}

// Funcion para obtener todos los salones
export const getAllClassRoom = async () => {
    try {
        const resp = await fetch(`${URL}/user/obtenerSalones`);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Error', error);
    }
}

export const getReservationsById = async ( idClassRoom, token, page = 1, size = 10 ) => {

    const URI = `${URL}/user/obtenerReservaciones?salon=${idClassRoom}&page=${page}&limit=${size}`;

    try {

        //opciones para la peticion
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        const resp = await fetch(URI, options);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Error', error);
    }


}

export const getClassRoomById = async (id) => {

    const URI = `${URL}/user/obtenerSalon/${id}`;
    
    try {
        const resp = await fetch(URI);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Error', error);
    }

}

// funcion para insertar una reservacion
export const insertarReservacion = async (token, reservacion) => {

    const URI = `${URL}/user/crearReservacion`;
    let respuesta = {};

    // formateo de los datos
    reservacion.fecha_inicio = moment(reservacion.fecha_inicio).format();
    reservacion.fecha_fin = moment(reservacion.fecha_fin).format();

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(reservacion)
    }

    try {
        const resp = await fetch(URI, options);
        const data = await resp.json();
        
        if( resp.status === 401 ) {
            respuesta = { ...data, ok: false };
        } else {
            respuesta = { ...data, ok: true };
        }

        return respuesta;
    } catch (error) {
        throw new Error('Error', error);
    }

}

// funcion para extraer los horarios del usuario
export const getReservationPersonal = async ( pagina=1, limite=10 ) => {

    const URI = `${URL}/user/obtenerHorarioPersonal?page=${pagina}&limit=${limite}`;

    // obtenemos el token
    const token = localStorage.getItem('token') || '';
    let respuesta = {};

    const options = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }

    try {
        const resp = await fetch(URI, options);
        const data = await resp.json();
        // return fetch( URI, options ).then( data => data.json() ).then( data => return data ).catch(error => console.log(error)); 
        // para consumir los datos en json seria funcion_fetch().then( data => console.log( 'datos javascrip', hacer algo ) )
        // si es un 401 es porque el token ha expirado o es invalido
        if( resp.status === 401 ) {
            respuesta = { ...data, ok: false };
        } else {
            respuesta = { ...data, ok: true };
        }
        return respuesta;
    } catch (error) {
        // Promise.reject(error);
        throw new Error('error', error);
    }

}

// funcion para actualizar un evento
export const updateReservation = async ( body, idReservacion ) => {

    const URI = `${URL}/user/updateReservation?idReservacion=${idReservacion}`;

    let respuesta = {};

    // obtenemos el token
    const token = localStorage.getItem('token') || '';

    // parsemoas las fechas
    if ( body.fecha_inicio && body.fecha_fin ) {
        body.fecha_inicio = moment( body.fecha_inicio ).format();
        body.fecha_fin = moment( body.fecha_fin ).format();
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    }

    try {
        const resp = await fetch(URI, options);
        const data = await resp.json();

        if( resp.status === 401 ) {
            respuesta = { ...data, ok: false };
        } else {
            respuesta = { ...data, ok: true };
        }
        return Promise.resolve(respuesta);

    } catch (error) {
        return Promise.reject(error);
    }

}

// funcion para eliminar un evento
export const deleteReservation = async (idReservacion) => {
    
    const URI = `${URL}/user/deleteReservation/${idReservacion}`;

    // obtenemos el token
    const token = localStorage.getItem('token') || '';
    let respuesta = {};

    const options = {
        method: 'DELETE',
        headers : {
            'Authorization': token
        }
    } 

    try {
        const resp = await fetch(URI, options);
        const data = await resp.json();
        if( resp.status === 401 ) {
            respuesta = { ...data, ok: false };
        } else {
            respuesta = { ...data, ok: true };
        }
        return Promise.resolve(respuesta);

    } catch (error) {
        return Promise.reject(error);
    }
}