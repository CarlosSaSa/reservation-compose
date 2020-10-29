/**
 * Funcion para decodificar el token
 */
import jwt_decode from "jwt-decode";

// devuelve el token decodificado como objeto
export const decodeToken = ( token ) => {
    try {
        const decodeToken = jwt_decode(token);
        return decodeToken;
    } catch (error) {
        // es un error al decodificar el token y por lo tanto enviamos null
        return null;
    }
}
