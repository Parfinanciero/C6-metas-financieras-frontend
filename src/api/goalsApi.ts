import axios from 'axios';
import { Goal } from '../interfaces/goal';

const apiGoal = axios.create({
  baseURL: 'http://localhost:8080/goals',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el JWT del localStorage y agregarlo a los headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('jwt');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Crear una nueva meta
export const createGoal = (goal: Omit<Goal, 'id'>) => 
  apiGoal.post<Goal>('/', goal, { headers: getAuthHeaders() });

// Obtener todas las metas del usuario autenticado
export const getAllGoals = () => 
  apiGoal.get<Goal[]>('/', { headers: getAuthHeaders() });

// Obtener metas por estado
export const getGoalsByStatus = (status: string) => 
  apiGoal.get<Goal[]>(`/status/${status}`, { headers: getAuthHeaders() });

// Obtener metas por título
export const getGoalsByTitle = (title: string) => 
  apiGoal.get<Goal[]>(`/title/${title}`, { headers: getAuthHeaders() });

// Actualizar una meta existente
export const updateGoal = (id: number, goal: Partial<Goal>) => 
  apiGoal.put<Goal>(`/${id}`, goal, { headers: getAuthHeaders() });

// Obtener metas por usuario
export const getGoalsByUserId = (userId: number) => 
  apiGoal.get<Goal[]>(`/user/${userId}`, { headers: getAuthHeaders() });

// Obtener una meta específica por usuario y meta
export const getGoalByUserIdAndGoalId = (userId: number, goalId: number) => 
  apiGoal.get<Goal>(`/user/${userId}/goal/${goalId}`, { headers: getAuthHeaders() });

export default {
  createGoal,
  getAllGoals,
  getGoalsByStatus,
  getGoalsByTitle,
  updateGoal,
  getGoalsByUserId, // Asegúrate de exportar esta función
  getGoalByUserIdAndGoalId
};
