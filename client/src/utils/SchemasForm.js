import * as Yup from "yup";

export const SchemaRegister = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('Los apellidos son requeridos'),
    correo: Yup.string().required('El correo es requerido').email('Debe ser un email valido'),
    password: Yup.string().min(5, 'La contraseña debe tener al menos 5 caracteres').required('El password es obligatorio'),
    repeatPassword: Yup.string().oneOf([ Yup.ref('password'), null ], 'Las contraseñas deben coincider').required('Debe escribir la confirmación de la contraseña')
});

// validacion para el login
export const SchemaLogin = Yup.object().shape({
    correo: Yup.string().email('Debe ser un correo válido')
            .required('Este campo es obligatorio'),
    password: Yup.string().required('La contraseña es requerida')
})

// Validacion para los campos de insercion de fechas
export const SchemaDate = Yup.object().shape({
    fecha_inicio: Yup.string().required('Este campo es requerido'),
    fecha_fin: Yup.string().required('La fecha de fin es obligatorio'),
    salon: Yup.string().required('El salon es obligatorio')
})