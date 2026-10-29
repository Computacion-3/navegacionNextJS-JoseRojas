import { FieldErrors, ValidationError } from '@/src/core/errors/validation.error';
import { User } from '../entities/user';
import { AuthRepository, RegisterParams } from '../repositories/auth.repository';

// Lo que llena el usuario: los datos de registro + la confirmación de contraseña
export interface RegisterInput extends RegisterParams {
    confirmPassword: string;
}

export class RegisterUseCase {
    constructor(private readonly repository: AuthRepository) { }

    async execute(input: RegisterInput): Promise<User> {
        // 1. Sanitizar la entrada
        const name = input.name.trim();
        const email = input.email.trim().toLowerCase();

        // 2. Reglas de la entrega: campos obligatorios y contraseñas iguales
        const errors: FieldErrors = {};
        if (!name) errors.name = 'Ingresa tu nombre.';
        if (!email) errors.email = 'Ingresa tu correo.';
        if (!input.password) errors.password = 'Ingresa una contraseña.';

        if (!input.confirmPassword) {
            errors.confirmPassword = 'Confirma tu contraseña.';
        } else if (input.confirmPassword !== input.password) {
            errors.confirmPassword = 'Las contraseñas no coinciden.';
        }

        if (Object.keys(errors).length > 0) {
            throw new ValidationError(errors);
        }

        // 3. Delegar al repositorio (confirmPassword NO viaja: es solo una regla de este caso de uso)
        return await this.repository.register({ name, email, password: input.password });
    }
}