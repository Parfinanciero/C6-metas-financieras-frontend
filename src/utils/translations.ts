// Traducción del enum de estados con tipos estrictos
export const statusTranslations: Record<
  'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'SUSPENDED',
  'Creado' | 'En progreso' | 'Completado' | 'Cancelado' | 'Suspendido'
> = {
  CREATED: 'Creado',
  IN_PROGRESS: 'En progreso',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
  SUSPENDED: 'Suspendido',
};

// Traducción inversa para los estados
export const statusReverseTranslations: Record<
  'Creado' | 'En progreso' | 'Completado' | 'Cancelado' | 'Suspendido',
  'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'SUSPENDED'
> = {
  Creado: 'CREATED',
  'En progreso': 'IN_PROGRESS',
  Completado: 'COMPLETED',
  Cancelado: 'CANCELLED',
  Suspendido: 'SUSPENDED',
};

// Traducción de los atributos
export const attributeTranslations: Record<
  'title' | 'description' | 'date_start' | 'date_end' | 'status' | 'goal_amount' | 'current_amount',
  string
> = {
  title: 'Título',
  description: 'Descripción',
  date_start: 'Fecha de inicio',
  date_end: 'Fecha de fin',
  status: 'Estado',
  goal_amount: 'Meta financiera',
  current_amount: 'Cantidad actual',
};

// Traducción inversa de atributos
export const reverseAttributeTranslations: Record<
  'Título' | 'Descripción' | 'Fecha de inicio' | 'Fecha de fin' | 'Estado' | 'Meta financiera' | 'Cantidad actual',
  'title' | 'description' | 'date_start' | 'date_end' | 'status' | 'goal_amount' | 'current_amount'
> = {
  Título: 'title',
  Descripción: 'description',
  'Fecha de inicio': 'date_start',
  'Fecha de fin': 'date_end',
  Estado: 'status',
  'Meta financiera': 'goal_amount',
  'Cantidad actual': 'current_amount',
};



