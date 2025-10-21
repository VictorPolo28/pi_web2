export interface Transaction {
  id?: number;
  descripcion: string;
  monto: number;
  fecha: string; // O Date si prefieres
  tipo: "GASTO" | "INGRESO";
  categoriaId: number;
  usuarioId?: number;
  categoria?: {
    id: number;
    nombreCategoria: string;
  };
}

export interface FinancialSummary {
  totalIngresos: number;
  totalGastos: number;
  balance: number;
}