import { Routine, RoutineCategory } from '../../domain/entities/routine';
import { CreateRoutineParams } from '../../domain/repositories/routine.repository';
import { RoutineResponseDto, CreateRoutineDto } from '../dtos/routine.dto';

export class RoutineMapper {
    static toDomain(dto: RoutineResponseDto): Routine {
        return new Routine({
            id: dto.id,
            name: dto.name,
            description: dto.description ?? undefined,
            category: RoutineMapper.mapCategory(dto.category),
            createdAt: new Date(dto.created_at),
        });
    }

    static toDto(params: CreateRoutineParams): CreateRoutineDto {
        return {
            name: params.name.trim(),
            description: params.description?.trim(),
            userId: 1,
        };
    }

    // Traduce el texto crudo del backend al tipo del dominio (o undefined si no es válido)
    private static mapCategory(raw?: string | null): RoutineCategory | undefined {
        const value = raw?.toUpperCase();
        const valid: RoutineCategory[] = ['STRENGTH', 'HYPERTROPHY', 'ENDURANCE'];
        return valid.find((category) => category === value);
    }
}