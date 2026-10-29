import { ReactNode } from 'react';
import Link from 'next/link';
import { MobileNav } from './Navbar';

interface HeaderProps {
    // Acción de usuario (avatar / botón de perfil). Se recibe por props para que
    // core no dependa de la feature auth.
    userAction?: ReactNode;
}

/**
 * Header: nombre de la aplicación + acción de usuario.
 * En móvil incluye también el botón hamburguesa.
 */
export function Header({ userAction }: HeaderProps) {
    return (
        <header className="navbar border-b border-base-300 bg-base-100 px-2 md:px-4">
            <div className="navbar-start gap-1">
                <MobileNav />
                <Link href="/routines" className="px-2 text-xl font-bold">
                    GymRoutines
                </Link>
            </div>

            <div className="navbar-end">{userAction}</div>
        </header>
    );
}