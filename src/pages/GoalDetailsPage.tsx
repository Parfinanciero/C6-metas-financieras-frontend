import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Grid } from '@mui/material';
import GoalDetails from '../components/GoalDetails';
import GoalProjectionChart from '../components/GoalProjectionChart';
import BackButton from '../components/BackButton'; // Botón de volver
import { Goal } from '../interfaces/goal';
import { getGoalByUserIdAndGoalId } from '../api/goalsApi'; // Asegúrate de importar el servicio
import AdviceList from '../components/AdviceList'; // Importa el componente AdviceList

const GoalDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el id de la URL
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = 1; // Aquí puedes obtener el userId de la sesión del usuario autenticado

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await getGoalByUserIdAndGoalId(userId, Number(id));
        setSelectedGoal(response.data);
      } catch (error) {
        console.error("Error al obtener la meta", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [id, userId]);

  if (loading) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center', color: '#FFFFFF' }}>
        <Typography variant="h4" gutterBottom>
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (!selectedGoal) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center', color: '#FFFFFF' }}>
        <Typography variant="h4" gutterBottom>
          Meta no encontrada
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#1c1c1c',
        minHeight: '100vh',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* Botón Volver */}
      <BackButton />

      {/* Título */}
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
        Detalles de la Meta: {selectedGoal.title}
      </Typography>

      {/* Contenedor para la Meta y el Gráfico */}
      <Grid container spacing={4}>
        {/* Columna izquierda (Meta y Botón Editar) */}
        <Grid item xs={12} sm={6}>
          <GoalDetails goal={selectedGoal} />

          {/* Botón Editar Meta */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 4 }}>
            <Button
              variant="contained"
              onClick={() => navigate(`/edit-goal/${selectedGoal.id}`)}
              sx={{
                backgroundColor: '#FFD700', // Fondo amarillo
                color: '#000000', // Texto negro
                '&:hover': {
                  backgroundColor: '#FFC107', // Hover amarillo más oscuro
                },
              }}
              startIcon={<span role="img" aria-label="edit">✏️</span>} // Icono de editar
            >
              Editar Meta
            </Button>
          </Box>
        </Grid>

        {/* Columna derecha (Gráfico de Proyección) */}
        <Grid item xs={12} sm={6}>
          <GoalProjectionChart
            goalAmount={selectedGoal.goal_amount}
            currentAmount={selectedGoal.current_amount}
            endDate={selectedGoal.date_end}
            startDate={selectedGoal.date_start} 
          />
        </Grid>
      </Grid>

      {/* Añadir las Sugerencias */}
      <Box sx={{ marginTop: 4 }}>
        <AdviceList goalId={selectedGoal.id} /> {/* Pasar el goalId a AdviceList */}
      </Box>
    </Box>
  );
};

export default GoalDetailsPage;
