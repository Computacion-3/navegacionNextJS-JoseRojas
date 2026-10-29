'use client';

import { NavLinks } from './NavLinks';

// El dropdown de daisyUI se abre con :focus. Al navegar quitamos el foco para que se cierre.
const closeDropdown = () => {
    const element = document.activeElement;
    if (element instanceof HTMLElement) {
        element.blur();
    }
};

/**
 * Escritorio (md en adelante): fila con el menú horizontal debajo del header.
 */
export function Navbar() {
    return (
        <nav className="hidden border-b border-base-300 bg-base-100 px-2 py-2 md:block md:px-4" aria-label="Navegación principal">
            <NavLinks className="menu-horizontal gap-1 p-0" />
        </nav>
    );
}

/**
 * Móvil (menos de md): botón hamburguesa con dropdown dentro del header.
 */
export function MobileNav() {
    return (
        <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-square" aria-label="Abrir menú">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
            <NavLinks
                tabIndex={-1}
                onNavigate={closeDropdown}
                className="dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            />
        </div>
    );
}