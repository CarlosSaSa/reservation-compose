import { makeStyles } from "@material-ui/core/styles";

export const useHeader = makeStyles( (theme) => ({

    header: {
        height: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #8e2de2, #4a00e0);',
    },

    container: {
        height: '90%',
        width: '80%',
        background: '#fff',
        borderRadius: '29px 29px 29px 29px',
        position: 'relative'
    },

    logo: {
        backgroundImage: 'url(/static/images/logo.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderRadius: '29px 0 0 29px',
        [theme.breakpoints.down("sm")] : {
            display: 'none',
        }
    },
    
    texto: {
        padding: '2rem',
    },

    titulo: {
        fontSize: '2rem',
        color: '#4a148c',
        [theme.breakpoints.down("xs")] : {
            fontSize: '1.4rem',
        }
    }

}))