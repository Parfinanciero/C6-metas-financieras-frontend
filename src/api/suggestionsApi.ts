import axios from 'axios';
import { Suggestion } from '../interfaces/suggestion';

const apiSuggestion = axios.create({
  baseURL: 'http://localhost:8080/api/advice', // Asegúrate de que la URL base coincide con el backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el JWT del localStorage y agregarlo a los headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('jwt');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Obtener o generar un consejo financiero para una meta específica
export const generateAdvice = (goalId: number) =>
  apiSuggestion.post<Suggestion>(`/${goalId}`, {}, { headers: getAuthHeaders() });

// Regenerar un consejo financiero para una meta específica
export const regenerateAdvice = (goalId: number) =>
  apiSuggestion.post<Suggestion>(`/${goalId}/regenerate`, {}, { headers: getAuthHeaders() });

// Obtener todos los consejos de una meta específica
export const getAdvicesByGoal = (goalId: number) =>
  apiSuggestion.get<Suggestion[]>(`/goal/${goalId}`, { headers: getAuthHeaders() });

export default apiSuggestion;
