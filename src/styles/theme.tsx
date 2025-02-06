import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4E207C', // Color principal (botones)
    },
    secondary: {
      main: '#C68FF5', // Hover y seleccionado
    },
    text: {
      primary: '#FFFFFF', // Títulos, subtítulos, párrafos
      secondary: '#000000', // Alternativo para textos
    },
    background: {
      default: 'linear-gradient(to right, #160a21, #000000)', // Fondo con gradiente
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Tipografía global
    h1: {
      color: '#92FE74', // Algunos títulos
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      color: '#92FE74', // Algunos títulos
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    body1: {
      color: '#FFFFFF', // Párrafos
      fontSize: '1rem',
    },
    body2: {
      color: '#000000', // Subtítulos
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#4E207C', // Color de botón por defecto
          color: '#FFFFFF', // Texto de botón
          '&:hover': {
            backgroundColor: '#C68FF5', // Hover del botón
          },
          '&.Mui-selected': {
            backgroundColor: '#C68FF5', // Botón seleccionado
          },
        },
      },
    },
  },
});

export default theme;
