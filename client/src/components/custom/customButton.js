import React from 'react';
import { IconButton } from '@material-ui/core';
import { FormularioModalUpdated, LogoutModal } from '../Modal/ContentsModel';
import moment from 'moment';
import Swal from "sweetalert2";
import { deleteReservation } from '../../utils/fetch/user';

export const CustomButton = ({ tableMeta, title, icon, setOpenModal, setOpenSnackBar }) => {
    
    const Actualizar = () => {
        // console.log( 'datos del usuario', tableMeta.tableData[ tableMeta.rowIndex ] );
        // abriendo el modal
        setOpenModal({ open: true, children: <FormularioModalUpdated setOpenSnackBar={ setOpenSnackBar } setOpenModal={ setOpenModal } dataUser={ tableMeta.tableData[ tableMeta.rowIndex ] } /> })
    }

    // aqui vamos a usar sweet alert
    const Eliminar = () => {

         const idReservacion =  tableMeta.tableData[ tableMeta.rowIndex ]._id ;

        Swal.fire({
            title: "¿ Esta seguro de eliminar esta reservación ?",
            text: "Este proceso es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6200ea',
            cancelButtonColor: '#d50000',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then( result => {
            // si se ha hecho click en 'si' entonces borramos el registro
            if( result.isConfirmed ) {
                // llamar a la api para borrar el registro
                deleteReservation( idReservacion ).then( data => {
                    console.log('data', data);
                    // si la data tiene un ok = false entonces es un unauthotized
                    if ( !data.ok ) {
                        setOpenModal({ open: true, children: <LogoutModal setOpenModal = { setOpenModal } /> })
                    } else {
                        Swal.fire({
                            title: data.mensaje,
                            icon: !data.userDeleted ? "error": "success",
                            confirmButtonColor: '#6200ea'
                        })
                    }
                })
            }
        })
    }

    // deshabilitamos el boton si y solo si la fecha de inicio de la fila actual es menor a la fecha actual
    return (
        <IconButton 
            color={ title === "Actualizar" ? "primary": "secondary"}
            onClick = { title === "Actualizar" ? Actualizar : Eliminar }
            disabled = { 
                moment( tableMeta.tableData[ tableMeta.rowIndex ].fecha_inicio, 'dddd, D [de] MMMM [de] YYYY h:mm:ss a'  ).date() < moment().date()
                || moment( tableMeta.tableData[ tableMeta.rowIndex ].fecha_fin, 'dddd, D [de] MMMM [de] YYYY h:mm:ss a'  ).date() < moment().date()  }
            >
            { icon }
        </IconButton>
    )
}
