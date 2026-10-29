'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TextField } from '@/src/core/components/ui/TextField';
import { FieldErrors } from '@/src/core/errors/validation.error';
import { LoginParams } from '../../domain/repositories/auth.repository';
import { AuthCard } from './AuthCard';

interface LoginFormProps {
    onSubmit: (params: LoginParams) => Promise<boolean>;
    isLoading: boolean;
    fieldErrors: FieldErrors;
    errorMessage: string | null;
}

export function LoginForm({ onSubmit, isLoading, fieldErrors, errorMessage }: LoginFormProps) {
    // Estado local: solo lo que el usuario va escribiendo
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Sin validaciones aquí: las reglas viven en LoginUseCase
        await onSubmit({ email, password });
    };

    return (
        <AuthCard
            title="Iniciar sesión"
            subtitle="Accede para gestionar tus rutinas de entrenamiento."
            footer={
                <>
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" className="link link-primary">
                        Regístrate
                    </Link>
                </>
            }
        >
            {errorMessage && (
                <div role="alert" className="alert alert-error alert-soft text-sm">
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
                <TextField
                    label="Correo"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    error={fieldErrors.email}
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    error={fieldErrors.password}
                />

                <button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-2">
                    {isLoading ? <span className="loading loading-spinner loading-sm"></span> : null}
                    {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
                </button>
            </form>
        </AuthCard>
    );
}