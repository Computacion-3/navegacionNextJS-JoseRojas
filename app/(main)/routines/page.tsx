'use client';

import { useRoutines } from '@/src/features/routines/presentation/hooks/use-routines';
import { RoutineSummaryCard } from '@/src/features/routines/presentation/components/RoutineSummaryCard';

export default function RoutinesPage() {
    const { routines, isLoading, errorMessage } = useRoutines();

    return (
        <main className="mx-auto w-full max-w-6xl p-4 md:p-6">
            {errorMessage && (
                <div role="alert" className="alert alert-error mb-4 text-sm">
                    <span>{errorMessage}</span>
                </div>
            )}

            {isLoading && routines.length === 0 ? (
                <div className="flex items-center justify-center gap-3 py-12 text-sm opacity-60">
                    <span className="loading loading-spinner loading-md"></span>
                    <span>Cargando rutinas...</span>
                </div>
            ) : (
                // Mobile-first: 1 columna, 2 desde sm y 3 desde md
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {routines.map((routine) => (
                        <RoutineSummaryCard key={routine.id} routine={routine} />
                    ))}
                </div>
            )}
        </main>
    );
}