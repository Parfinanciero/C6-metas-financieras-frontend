// Enum para los estados de la meta
export enum GoalStatus {
    CREATED = 'CREATED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    SUSPENDED = 'SUSPENDED',
  }
  
  // Interfaz de Goal
  export interface Goal {
    id: number;
    title: string;
    description: string;
    date_start: string; // Formato ISO
    date_end: string; // Formato ISO
    status: GoalStatus;
    goal_amount: number;
    current_amount: number;
    user_id?: number;
  }
  // Función para convertir un estado traducido de vuelta al enum GoalStatus
export const translateStatusToEnum = (translatedStatus: string): GoalStatus | undefined => {
    switch (translatedStatus) {
      case 'Creado':
        return GoalStatus.CREATED;
      case 'En progreso':
        return GoalStatus.IN_PROGRESS;
      case 'Completado':
        return GoalStatus.COMPLETED;
      case 'Cancelado':
        return GoalStatus.CANCELLED;
      case 'Suspendido':
        return GoalStatus.SUSPENDED;
      default:
        return undefined;
    }
  };