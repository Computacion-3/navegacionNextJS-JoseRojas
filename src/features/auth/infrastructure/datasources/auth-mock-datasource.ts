import { AuthDatasource } from './auth-datasource.interface';
import { LoginDto, RegisterDto, UserResponseDto } from '../dtos/auth.dto';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class AuthMockDatasource implements AuthDatasource {
    private users: UserResponseDto[] = [
        {
            id: 'usr-1',
            full_name: 'Jose Rojas',
            email: 'jose@rutinas.app',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // Hace 30 días
        },
    ];

    async login(dto: LoginDto): Promise<UserResponseDto> {
        await delay(600); // Simulamos latencia de red de 600ms

        const found = this.users.find((u) => u.email === dto.email);
        if (found) {
            return { ...found };
        }

        // No hay autenticación real: cualquier credencial con los campos llenos inicia sesión
        return {
            id: `usr-${Date.now()}`,
            full_name: 'Usuario Invitado',
            email: dto.email,
            created_at: new Date().toISOString(),
        };
    }

    async register(dto: RegisterDto): Promise<UserResponseDto> {
        await delay(800); // Simulamos latencia de guardado de 800ms

        if (this.users.some((u) => u.email === dto.email)) {
            throw new Error('Ya existe una cuenta con ese correo.');
        }

        // El mock no guarda la contraseña: no hay autenticación real
        const newUser: UserResponseDto = {
            id: `usr-${Date.now()}`,
            full_name: dto.full_name,
            email: dto.email,
            created_at: new Date().toISOString(),
        };

        this.users.push(newUser);
        return { ...newUser };
    }
}