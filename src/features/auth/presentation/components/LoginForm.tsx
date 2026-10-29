'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TextField } from '@/src/core/components/ui/TextField';
import { AuthCard } from './AuthCard';

interface LoginErrors {
    email?: string;
    password?: string;
}

export function LoginForm() {
    const router = useRouter();

    // Estado local del formulario (no hay backend ni autenticación real)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginErrors>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación visual: campos obligatorios
        const nextErrors: LoginErrors = {};
        if (!email.trim()) nextErrors.email = 'Ingresa tu correo.';
        if (!password.trim()) nextErrors.password = 'Ingresa tu contraseña.';
        setErrors(nextErrors);

        // Si no hay errores, redirigimos. replace: el login no queda en el historial
        if (Object.keys(nextErrors).length === 0) {
            router.replace('/routines');
        }
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
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
                <TextField
                    label="Correo"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                />

                <button type="submit" className="btn btn-primary w-full mt-2">
                    Iniciar sesión
                </button>
            </form>
        </AuthCard>
    );
}