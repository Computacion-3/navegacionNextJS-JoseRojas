'use client';

import { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/src/core/config/navigation';

interface NavLinksProps extends Omit<ComponentProps<'ul'>, 'children'> {
    onNavigate?: () => void;
}

/**
 * Lista de enlaces de la Navbar. Resalta el enlace activo con usePathname().
 * La usan tanto el menú horizontal (escritorio) como el desplegable (móvil).
 */
export function NavLinks({ className = '', onNavigate, ...props }: NavLinksProps) {
    const pathname = usePathname();

    // Activo en la ruta exacta y en sus subrutas (/routines/123)
    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <ul className={`menu ${className}`} {...props}>
            {NAV_ITEMS.map(({ href, label }) => {
                const active = isActive(href);
                return (
                    <li key={href}>
                        <Link
                            href={href}
                            onClick={onNavigate}
                            aria-current={active ? 'page' : undefined}
                            className={active ? 'menu-active' : ''}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}