import React from 'react';
import { Box, Container, Paper } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode; // El contenido dinámico del módulo
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #160a21, #000000)', // Fondo de gradiente
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '80vw', // Ancho máximo del módulo
          padding: 4,
          backgroundColor: '#1c1c1c', // Fondo del módulo
          borderRadius: 3,
        }}
      >
        <Container>{children}</Container>
      </Paper>
    </Box>
  );
};

export default MainLayout;
