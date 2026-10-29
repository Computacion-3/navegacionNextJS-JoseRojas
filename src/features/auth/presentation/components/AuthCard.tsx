import { ReactNode } from 'react';

interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    footer?: ReactNode;
}

/**
 * Tarjeta contenedora reutilizable para Login y Registro.
 */
export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
    return (
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-200">
            <div className="card-body gap-4">
                <div>
                    <h1 className="card-title text-2xl">{title}</h1>
                    {subtitle && <p className="text-sm opacity-70 mt-1">{subtitle}</p>}
                </div>

                {children}

                {footer && <p className="text-center text-sm">{footer}</p>}
            </div>
        </div>
    );
}