import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Home } from '../pages/Home'
import AccountView from "../pages/account/AccountView";
import { useEffect } from 'react'
import { decodeToken } from '../utils/decode/decodeJWT'
import { Login, Logout } from '../actions/authActions'
import { CalendarApp } from '../pages/calendarView/CalendarApp'
import { Salon } from '../pages/Salon/Salon'
import { Horarios } from '../pages/Horario/Horarios'

export const AppRouter = () => {

    const { isLogged } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        // debemos de preguntar si en el localstorage hay un token, por el momento solo nos interesa que haya un token
        // independientemente si tiene un formato valido ya que este sera checado en el backend
        // solamente si y solo si el token existe
        const getToken = localStorage.getItem('token') || null;
        const token = decodeToken(getToken);

        // si el token no es valido
        if ( !token ) {
            dispatch( Logout() );
            return;
        }

        // si el token es nulo entonces es un token invalido y por lo tanto redireccionamos a la pagina de inicio
        // en caso contrario actualizamos el state
        if ( !isLogged && token ) {
            // actualizamos el state
            delete token.exp;
            delete token.iat;
            // actualizamos el state
            dispatch( Login( token ) );
            return;
        }
        
    }, [dispatch, isLogged ])

    return (
        <Router>
            <Routes>
                <Route path="home" element={isLogged ? <Navigate to="/home/dashboard" /> : <Home />} />
                {/* <Route path="home/dashboard" element={ isLogged ?  <Dashboard /> : <Navigate to="/home" />  } /> */}
                {/* <Route path="home/dashboard" element={  <Dashboard />   } > */}
                <Route path="home/dashboard" element={isLogged ? <Dashboard /> : <Navigate to="/home" />} >
                    <Route path="/" element={ <CalendarApp /> } />
                    <Route path="/account" element={<AccountView />} />
                    <Route path="/mishorarios" element={ <Horarios /> } />
                    <Route path="/salones/:id" element={ <Salon /> } />
                </Route>
                <Route path="*" element={<Navigate to="/home" replace={true} />} />
            </Routes>
        </Router >
    )
}
