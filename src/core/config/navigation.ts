export interface NavItem {
    href: string;
    label: string;
}

/**
 * Secciones de la aplicación que aparecen en la Navbar.
 * Para agregar una sección nueva, solo se agrega aquí.
 */
export const NAV_ITEMS: NavItem[] = [
    { href: '/routines', label: 'Rutinas' },
    { href: '/exercises', label: 'Ejercicios' },
    { href: '/progress', label: 'Progreso' },
];