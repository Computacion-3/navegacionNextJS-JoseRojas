import { Routine, RoutineCategory } from '../../domain/entities/routine';

// Color del badge según la categoría (la vista lo traduce a clases de daisyUI)
export type RoutineCategoryTone = 'primary' | 'secondary' | 'accent' | 'neutral';

export interface RoutineItemViewModel {
    readonly id: number;
    readonly title: string;
    readonly descriptionText: string;
    readonly formattedDate: string;
    readonly isRecent: boolean;
    readonly badgeText: string;
    readonly categoryLabel: string;
    readonly categoryTone: RoutineCategoryTone;
}

const CATEGORY_LABELS: Record<RoutineCategory, string> = {
    STRENGTH: 'Fuerza',
    HYPERTROPHY: 'Hipertrofia',
    ENDURANCE: 'Resistencia',
};

const CATEGORY_TONES: Record<RoutineCategory, RoutineCategoryTone> = {
    STRENGTH: 'primary',
    HYPERTROPHY: 'secondary',
    ENDURANCE: 'accent',
};

export class RoutineViewModelMapper {
    static toViewModel(entity: Routine): RoutineItemViewModel {
        // Regla de presentación: una rutina es reciente si tiene menos de 2 días de creada
        const twoDaysInMs = 1000 * 60 * 60 * 24 * 2;
        const isRecent = Date.now() - entity.createdAt.getTime() <= twoDaysInMs;

        return {
            id: entity.id,
            title: entity.name,
            descriptionText: entity.hasDescription()
                ? entity.description!
                : 'Sin descripción asignada.',
            formattedDate: entity.createdAt.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
            isRecent,
            badgeText: isRecent ? 'Reciente' : `ID #${entity.id}`,
            categoryLabel: entity.category ? CATEGORY_LABELS[entity.category] : 'General',
            categoryTone: entity.category ? CATEGORY_TONES[entity.category] : 'neutral',
        };
    }
}