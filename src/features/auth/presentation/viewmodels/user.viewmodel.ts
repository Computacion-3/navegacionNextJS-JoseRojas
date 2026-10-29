import { User } from '../../domain/entities/user';

export interface SessionUserViewModel {
    readonly id: string;
    readonly displayName: string;
    readonly email: string;
    readonly initials: string;
}

export class UserViewModelMapper {
    static toViewModel(entity: User): SessionUserViewModel {
        // Regla de presentación: iniciales para el avatar del header (máximo 2 letras)
        const initials = entity.name
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');

        return {
            id: entity.id,
            displayName: entity.name,
            email: entity.email,
            initials,
        };
    }
}