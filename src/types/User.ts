//Creamos un interface con el  objeto del user
export interface User {
  usuario_id: number;
  nombre: string;
  correo: string;
  userId?: number; // Opcional para compatibilidad
}