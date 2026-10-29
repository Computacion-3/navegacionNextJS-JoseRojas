import { ReactNode } from 'react';
import { Header } from '@/src/core/components/layout/Header';
import { Navbar } from '@/src/core/components/layout/Navbar';
import { UserMenu } from '@/src/features/auth/presentation/components/UserMenu';

/**
 * Layout del grupo (main): todas las pantallas de la app llevan Header + Navbar.
 * Los paréntesis hacen que "(main)" NO aparezca en la URL: /routines sigue siendo /routines.
 */
export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="sticky top-0 z-20">
                <Header userAction={<UserMenu />} />
                <Navbar />
            </div>
            <div className="flex-1 w-full bg-base-200">{children}</div>
        </>
    );
}