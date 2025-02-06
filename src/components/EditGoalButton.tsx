import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

interface EditGoalButtonProps {
  goalId: number; // ID de la meta que se quiere editar
}

const EditGoalButton: React.FC<EditGoalButtonProps> = ({ goalId }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit-goal/${goalId}`); // Redirige a la página de edición de la meta
  };

  return (
    <Tooltip title="Editar meta" arrow>
      <IconButton
        onClick={handleEditClick}
        sx={{
          backgroundColor: '#FFD700', // Fondo amarillo
          color: '#000000', // Ícono negro
          '&:hover': {
            backgroundColor: '#FFC107', // Fondo amarillo más oscuro en hover
          },
          padding: 1,
        }}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditGoalButton;
