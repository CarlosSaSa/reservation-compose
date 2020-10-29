import { makeStyles } from "@material-ui/core/styles";

export const useAppBar = makeStyles((theme) => ({
    root: {

        padding: '1rem 0',
        
        [theme.breakpoints.down("xs")] : {
            padding: '0'
        },

        '&.MuiPaper-elevation4': {
            boxShadow: 'none'
        },
        '& .MuiTab-root': {
            fontSize: '1.2rem',
            textTransform: "capitalize",
            fontWeight:'500',
            [theme.breakpoints.down("xs")]: {
                fontSize: '0.8rem',
                fontWeight:'300'
            }
        }
    }
}))

export const useStyleForm = makeStyles((theme) => ({
    espacio: {
        marginBottom: '15px',
        [theme.breakpoints.down("xs")] : {
            marginBottom: '5px'
        }
    },

    boton: {
        textAlign: 'center'
    }

}))