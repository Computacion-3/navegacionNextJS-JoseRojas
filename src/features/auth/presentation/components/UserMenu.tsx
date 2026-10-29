'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/use-auth';

/**
 * Acción de usuario del Header.
 * - Con sesión: avatar con iniciales y dropdown con nombre, correo y "Cerrar sesión".
 * - Sin sesión: botón "Iniciar sesión".
 */
export function UserMenu() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <Link href="/login" className="btn btn-primary btn-sm">
                Iniciar sesión
            </Link>
        );
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Menú de usuario">
                <div className="avatar avatar-placeholder">
                    <div className="bg-primary text-primary-content w-10 rounded-full">
                        <span className="text-sm font-semibold">{user.initials}</span>
                    </div>
                </div>
            </div>

            <ul tabIndex={-1} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow">
                <li className="menu-title flex flex-col">
                    <span className="truncate">{user.displayName}</span>
                    <span className="truncate font-normal opacity-60">{user.email}</span>
                </li>
                <li>
                    <Link href="/login" onClick={logout}>
                        Cerrar sesión
                    </Link>
                </li>
            </ul>
        </div>
    );
}