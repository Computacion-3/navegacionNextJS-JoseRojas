'use client';

import { useEffect } from 'react';
import { useAuth } from '@/src/features/auth/presentation/hooks/use-auth';
import { RegisterForm } from '@/src/features/auth/presentation/components/RegisterForm';

export default function RegisterPage() {
    const { register, isLoading, fieldErrors, errorMessage, clearErrors, clearFieldError } = useAuth();

    // Limpiamos errores al entrar y al salir de la pantalla (no se arrastran a otra)
    useEffect(() => {
        clearErrors();
        return clearErrors;
    }, [clearErrors]);

    return (
        <RegisterForm
            onSubmit={register}
            onFieldChange={clearFieldError}
            isLoading={isLoading}
            fieldErrors={fieldErrors}
            errorMessage={errorMessage}
        />
    );
}