// Tipos para manejo de errores
export interface ApiError extends Error {
  status?: number;
}

// Función helper para crear errores con status
export const createError = (message: string, status: number = 500): ApiError => {
  const error: ApiError = new Error(message);
  error.status = status;
  return error;
};
