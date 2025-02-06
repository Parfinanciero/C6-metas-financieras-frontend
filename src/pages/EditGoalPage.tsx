import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import GoalEditForm from '../components/GoalEditForm';
import BackButton from '../components/BackButton';
import { Goal, GoalStatus } from '../interfaces/goal'; // Asegúrate de importar la interfaz y GoalStatus
import { statusTranslations, } from '../utils/translations'; // Importamos la función de traducción
import {translateStatusToEnum} from '../interfaces/goal'; 
import { getGoalByUserIdAndGoalId } from '../api/goalsApi'; // Asegúrate de importar la API
import { updateGoal } from '../api/goalsApi'; // Asegúrate de importar la función de actualización

const EditGoalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID desde la URL
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener la meta desde la API al cargar la página
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await getGoalByUserIdAndGoalId(1, Number(id)); // Usar el ID de usuario adecuado
        setSelectedGoal(response.data);
      } catch (err) {
        setError('Error al cargar la meta');
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [id]);

  // Si aún estamos cargando o hubo un error
  if (loading) {
    return <Typography variant="h4">Cargando...</Typography>;
  }

  if (error || !selectedGoal) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center', color: '#FFFFFF' }}>
        <Typography variant="h4" gutterBottom>
          {error || 'Meta no encontrada'}
        </Typography>
        <BackButton />
      </Box>
    );
  }

  // Convertir el estado a su traducción para mostrarlo en el formulario
  const translatedStatus = statusTranslations[selectedGoal.status]; // Obtener traducción para el estado actual

  const handleEditSubmit = async (data: { date_end: string; current_amount: number; status: string }) => {
    // Traducir el estado del formulario de vuelta al valor del enum
    const statusEnum = translateStatusToEnum(data.status);

    if (!statusEnum) {
      setError('Estado inválido');
      return;
    }

    const updatedGoal: Goal = { 
      ...selectedGoal,
      date_end: data.date_end,
      current_amount: data.current_amount,
      status: statusEnum, // Usamos el enum GoalStatus
    };
  
    try {
      // Llamada a la función updateGoal, pasando el id y el objeto Goal completo
      await updateGoal(selectedGoal.id, updatedGoal); // updateGoal debería aceptar dos parámetros: el id y el objeto Goal
    } catch (err) {
      setError('Error al editar la meta');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#1c1c1c',
        color: '#FFFFFF',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Botón de volver */}
      <BackButton />

      {/* Título de la página */}
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4, textAlign: 'center' }}>
        Editar Meta: {selectedGoal.title}
      </Typography>

      {/* Formulario de edición */}
      <GoalEditForm
        initialValues={{
          date_end: selectedGoal.date_end,
          current_amount: selectedGoal.current_amount,
          status: selectedGoal.status, // Usamos el estado traducido
          title: selectedGoal.title,
          description: selectedGoal.description,
          date_start: selectedGoal.date_start,
          goal_amount: selectedGoal.goal_amount,
        }}
        onSubmit={handleEditSubmit}
      />
    </Box>
  );
};

export default EditGoalPage;
