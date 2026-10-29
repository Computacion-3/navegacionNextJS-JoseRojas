import { FieldErrors, ValidationError } from '@/src/core/errors/validation.error';
import { User } from '../entities/user';
import { AuthRepository, LoginParams } from '../repositories/auth.repository';

export class LoginUseCase {
    constructor(private readonly repository: AuthRepository) { }

    async execute(params: LoginParams): Promise<User> {
        // 1. Sanitizar la entrada
        const sanitized: LoginParams = {
            email: params.email.trim().toLowerCase(),
            password: params.password,
        };

        // 2. Regla de la entrega: los campos no pueden estar vacíos
        const errors: FieldErrors = {};
        if (!sanitized.email) errors.email = 'Ingresa tu correo.';
        if (!sanitized.password.trim()) errors.password = 'Ingresa tu contraseña.';

        if (Object.keys(errors).length > 0) {
            throw new ValidationError(errors);
        }

        // 3. Delegar al repositorio
        return await this.repository.login(sanitized);
    }
}