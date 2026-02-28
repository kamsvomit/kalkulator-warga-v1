export interface Calculator {
  name: string;
  id: string;
  description: string;
  category: string;
  render: (container: HTMLElement) => void;
}

export type Category = 
  | 'Keuangan' 
  | 'Bisnis' 
  | 'Kesehatan' 
  | 'Kehidupan Sehari-hari' 
  | 'Belanja' 
  | 'Produktivitas' 
  | 'Utilitas' 
  | 'Matematika' 
  | 'Konversi' 
  | 'Kebugaran' 
  | 'Rumah' 
  | 'Lain-lain';
