export interface UserResponseDto {
    id: string;
    full_name: string;
    email: string;
    created_at: string; // ISO 8601 string
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    full_name: string;
    email: string;
    password: string;
}