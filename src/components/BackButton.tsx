import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <IconButton
      onClick={handleGoBack}
      sx={{
        position: 'absolute', // Para posicionarlo fácilmente en la esquina superior izquierda
        top: 10,
        left: -120,
        backgroundColor: '#4E207C', // Fondo morado
        color: '#FFFFFF', // Flecha blanca
        '&:hover': {
          backgroundColor: '#C68FF5', // Fondo al hacer hover
        },
        width: 50, // Botón pequeño
        height: 50,
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
