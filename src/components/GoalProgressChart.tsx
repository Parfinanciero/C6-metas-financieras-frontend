import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Goal } from '../interfaces/goal';
import { getGoalsByUserId } from '../api/goalsApi';
import {jwtDecode} from 'jwt-decode';

// Registrar los elementos necesarios en ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const GoalProgressChart: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          setError('Usuario no autenticado');
          setLoading(false);
          return;
        }

        const decoded: any = jwtDecode(token);
        const userId = decoded.userId;

        const response = await getGoalsByUserId(userId);
        setGoals(response.data);
      } catch (err) {
        setError('Error al obtener las metas');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) return <p>Cargando metas...</p>;
  if (error) return <p>{error}</p>;

  // Contar metas según su estado
  const completed = goals.filter((goal) => goal.status === 'COMPLETED').length;
  const inProgress = goals.filter((goal) => goal.status === 'IN_PROGRESS').length;
  const created = goals.filter((goal) => goal.status === 'CREATED').length;
  const cancelled = goals.filter((goal) => goal.status === 'CANCELLED').length;
  const suspended = goals.filter((goal) => goal.status === 'SUSPENDED').length;

  const data = {
    labels: ['Cumplidas', 'En progreso', 'No iniciadas', 'Canceladas', 'Suspendidas'],
    datasets: [
      {
        data: [completed, inProgress, created, cancelled, suspended],
        backgroundColor: ['#92FE74', '#4E207C', '#C68FF5', '#FF4E4E', '#FFB74E'],
        hoverBackgroundColor: ['#6BBF5A', '#351456', '#A678DD', '#BF3C3C', '#E69A40'],
      },
    ],
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Pie data={data} />
    </div>
  );
};

export default GoalProgressChart;
