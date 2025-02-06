import React from 'react';
import { Box } from '@mui/material';
import GoalForm from '../components/GoalForm';
import BackButton from '../components/BackButton';

const GoalsPage: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log('Datos enviados al backend:', data);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        padding: 1, // Espaciado interno
      }}
    >
      {/* Botón Volver */}
      <BackButton />

      {/* Formulario de metas */}
      <GoalForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default GoalsPage;
