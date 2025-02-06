import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface GoalProjectionChartProps {
  goalAmount: number;   // Monto objetivo de la meta
  currentAmount: number; // Monto actual de la meta
  startDate: string;     // Fecha de inicio
  endDate: string;       // Fecha de fin
}

const GoalProjectionChart: React.FC<GoalProjectionChartProps> = ({
  goalAmount,
  currentAmount,
  startDate,
  endDate,
}) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Cálculos
  const daysRemaining = Math.max(0, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const amountRemaining = Math.max(0, goalAmount - currentAmount);
  const requiredDailySavings = daysRemaining > 0 ? amountRemaining / daysRemaining : 0;
  const daysElapsed = Math.max(0, Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const averageSavingsPerDay = daysElapsed > 0 ? currentAmount / daysElapsed : 0;

  // Configuración de datos para el gráfico
  const data = {
    labels: ['Ahorro Diario Requerido', 'Ahorro Promedio Hasta Ahora'],
    datasets: [
      {
        label: 'Ahorro (COP)',
        data: [requiredDailySavings, averageSavingsPerDay],
        backgroundColor: ['#4E207C', '#C68FF5'],
        borderColor: ['#4E207C', '#C68FF5'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: Math.max(1000, goalAmount / 10),
          max: Math.max(goalAmount, 10000),
        },
      },
    },
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Proyección de Ahorros
      </Typography>
      <Bar data={data} options={options} />
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Tiempo restante: {daysRemaining} días <br />
        Monto restante: {amountRemaining.toFixed(2)} COP
      </Typography>
    </Box>
  );
};

export default GoalProjectionChart;
