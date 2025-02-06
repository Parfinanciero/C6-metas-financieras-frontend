import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoalList from '../components/GoalList';
import GoalProgressChart from '../components/GoalProgressChart';
import { Goal } from '../interfaces/goal';
import goalService from '../api/goalsApi';
import { jwtDecode } from 'jwt-decode'; // Importación correcta para ESModules


const GoalsPage: React.FC = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUserIdFromJwt = (): number | null => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = jwtDecode<{ userId: number }>(token); // Se indica el tipo esperado
      return decodedToken.userId;
    }
    return null;
  };
  
  

  useEffect(() => {
    const userId = getUserIdFromJwt();
    if (userId) {
      const fetchGoals = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await goalService.getGoalsByUserId(userId);
          setGoals(response.data);
        } catch (err) {
          console.error('Error fetching goals:', err);
          setError('No se pudieron cargar las metas.');
        } finally {
          setLoading(false);
        }
      };

      fetchGoals();
    } else {
      setError('Usuario no autenticado.');
    }
  }, []);

  const handleCreateGoal = () => {
    navigate('/crear-meta');
  };

  return (
    <Box sx={{ padding: 4, minHeight: '100vh', backgroundColor: '#1c1c1c', color: '#FFFFFF' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Mis Metas Financieras
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateGoal}
        sx={{
          backgroundColor: '#4E207C',
          '&:hover': {
            backgroundColor: '#C68FF5',
          },
          marginBottom: 3,
        }}
      >
        Crear Nueva Meta
      </Button>

      {loading ? (
        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
          Cargando metas...
        </Typography>
      ) : error ? (
        <Typography variant="h6" sx={{ color: '#FF0000' }}>
          {error}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{ width: { xs: '100%', md: '48%' } }}>
            <GoalList goals={goals} />
          </Box>

          <Box sx={{ width: { xs: '100%', md: '48%' }, marginTop: { xs: 4, md: 0 } }}>
            <GoalProgressChart goals={goals} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GoalsPage;
