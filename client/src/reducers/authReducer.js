/**
 * Reducers para el tema de la autenticación
 */

import { types } from "../types/types";

 // Estado inicial para el usuario
 const UserInitial = {
     _id: '',
     nombre: '',
     apellido: '',
     correo: '',
     isLogged: false,
     isLoading: false
 }

// Un reducer no es mas que una funcion pura 
export const AuthReducer = ( state = UserInitial, actions ) => {

    switch (actions.type) {
        case types.Login:
            return {
                ...state,
                ...actions.payload,
                isLogged: true,
                isLoading: false
            }
        
        case types.Logout:
            return {
                ...state, 
                ...UserInitial
            }
        case types.Loading:
            return {
                ...state,
                isLoading: actions.payload
            }

        default:
            return state;
    }

}