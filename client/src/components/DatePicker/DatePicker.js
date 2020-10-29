import { DateTimePicker } from '@material-ui/pickers';
import React from 'react';
import moment from 'moment';

export const DatePicker = ({ field, form, ...props }) => {
    const labelFunc = (date, invalidLabel) => {
        return moment(date).format('dddd, D [de] MMMM [de] YYYY h:mm:ss a');
    }

    // disablePast lo que hace es poner como fecha minima la fecha actual y deshabilitar las fechas anteriores, 
    // si el valor inicial es decir el value es una fecha anterior a la actual genera un error porque no se puede habilitar
    // una fecha anterior a la actual
    return (
        <DateTimePicker
            fullWidth
            name={field.name}
            value={field.value}
            disablePast
            onChange={date => form.setFieldValue(field.name, date, true)}
            label={props.identificador}
            showTodayButton
            invalidLabel="Verifique bien la fecha"
            labelFunc={labelFunc}
            cancelLabel="Cancelar"
            okLabel="Agregar"
            minDateMessage="No puede actualizar fechas anteriores a la de hoy"
            {...props}
        />
    )


}
