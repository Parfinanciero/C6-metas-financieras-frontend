import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { Goal } from '../interfaces/goal';
import { statusTranslations } from '../utils/translations';

interface GoalDetailsProps {
  goal: Goal; // Meta seleccionada
}

const GoalDetails: React.FC<GoalDetailsProps> = ({ goal }) => {
  const progress = (goal.current_amount / goal.goal_amount) * 100;

  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: 4,
        borderRadius: 2,
      }}
    >
      {/* Título */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {goal.title}
      </Typography>

      {/* Descripción */}
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        {goal.description}
      </Typography>

      {/* Progreso */}
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Progreso:
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            backgroundColor: '#4E207C',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#C68FF5',
            },
          }}
        />
        <Typography variant="body2" sx={{ textAlign: 'right', marginTop: 1 }}>
          {progress.toFixed(2)}% cumplido
        </Typography>
      </Box>

      {/* Detalles adicionales */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1">
          <strong>Meta financiera:</strong> {goal.goal_amount.toLocaleString()} COP
        </Typography>
        <Typography variant="body1">
          <strong>Cantidad actual:</strong> {goal.current_amount.toLocaleString()} COP
        </Typography>
        <Typography variant="body1">
          <strong>Fecha de inicio:</strong>{' '}
          {new Date(goal.date_start).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha de fin:</strong> {new Date(goal.date_end).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Estado:</strong> {statusTranslations[goal.status]}
        </Typography>
      </Box>
    </Box>
  );
};

export default GoalDetails;
