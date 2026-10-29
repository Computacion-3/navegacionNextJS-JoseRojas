import { RoutineCategoryTone, RoutineItemViewModel } from '../viewmodels/routine.viewmodel';

interface RoutineSummaryCardProps {
    routine: RoutineItemViewModel;
}

// Clases completas escritas a mano para que Tailwind las detecte
const BADGE_TONE_CLASSES: Record<RoutineCategoryTone, string> = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    neutral: 'badge-neutral',
};

/**
 * Tarjeta resumida de rutina: nombre, descripción y badge de categoría.
 */
export function RoutineSummaryCard({ routine }: RoutineSummaryCardProps) {
    return (
        <article className="card bg-base-100 shadow-sm">
            <div className="card-body gap-2 p-5">
                <h2 className="card-title text-lg">{routine.title}</h2>
                <p className="text-sm opacity-70">{routine.descriptionText}</p>
                <div className="card-actions mt-1">
                    <span className={`badge badge-outline ${BADGE_TONE_CLASSES[routine.categoryTone]}`}>
                        {routine.categoryLabel}
                    </span>
                </div>
            </div>
        </article>
    );
}