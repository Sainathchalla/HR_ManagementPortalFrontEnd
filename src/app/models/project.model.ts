export interface Project {
    id?: number; // Optional if using auto-generated IDs from backend
    name: string;
    startDate: string;
    endDate: string;
    description: string;
  }