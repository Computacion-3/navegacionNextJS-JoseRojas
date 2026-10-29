export interface RoutineResponseDto {
    id: number;
    name: string;
    description?: string;
    category?: string | null; // 'strength' | 'hypertrophy' | 'endurance'
    created_at: string; // ISO 8601 string
}


export interface CreateRoutineDto {
    name: string;
    description?: string;
    userId?: number;
}