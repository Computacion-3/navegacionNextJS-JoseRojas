'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/features/auth/presentation/hooks/use-auth';
import { LoginForm } from '@/src/features/auth/presentation/components/LoginForm';
import { LoginParams } from '@/src/features/auth/domain/repositories/auth.repository';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, fieldErrors, errorMessage, clearErrors } = useAuth();

    // Al entrar a la pantalla, limpiamos errores que hayan quedado en el store
    useEffect(() => {
        clearErrors();
        return clearErrors;
    }, [clearErrors]);

    const handleLogin = async (params: LoginParams): Promise<boolean> => {
        const success = await login(params);
        if (success) {
            // replace: el login no queda en el historial (el botón "atrás" no vuelve aquí)
            router.replace('/routines');
        }
        return success;
    };

    return (
        <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            fieldErrors={fieldErrors}
            errorMessage={errorMessage}
        />
    );
}