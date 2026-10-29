'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TextField } from '@/src/core/components/ui/TextField';
import { FieldErrors } from '@/src/core/errors/validation.error';
import { RegisterInput } from '../../domain/usecases/register.usecase';
import { AuthCard } from './AuthCard';

interface RegisterFormProps {
    onSubmit: (input: RegisterInput) => Promise<boolean>;
    onFieldChange: (field: string) => void;
    isLoading: boolean;
    fieldErrors: FieldErrors;
    errorMessage: string | null;
}

const INITIAL_VALUES: RegisterInput = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export function RegisterForm({
    onSubmit,
    onFieldChange,
    isLoading,
    fieldErrors,
    errorMessage,
}: RegisterFormProps) {
    // Estado local: solo lo que el usuario va escribiendo
    const [values, setValues] = useState<RegisterInput>(INITIAL_VALUES);
    const [success, setSuccess] = useState(false);

    // Un solo handler para todos los inputs: usa el atributo `name` de cada uno
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setSuccess(false);
        onFieldChange(name); // el error de ese campo desaparece mientras lo corrige
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Sin validaciones aquí: las reglas viven en RegisterUseCase
        const created = await onSubmit(values);
        if (created) {
            setValues(INITIAL_VALUES);
            setSuccess(true);
        }
    };

    return (
        <AuthCard
            title="Crear cuenta"
            subtitle="Regístrate para guardar tus rutinas de entrenamiento."
            footer={
                <>
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login" className="link link-primary">
                        Inicia sesión
                    </Link>
                </>
            }
        >
            {success && (
                <div role="alert" className="alert alert-success alert-soft text-sm">
                    <span>
                        ¡Cuenta creada!{' '}
                        <Link href="/login" className="link font-semibold">
                            Ir a iniciar sesión
                        </Link>
                    </span>
                </div>
            )}

            {errorMessage && (
                <div role="alert" className="alert alert-error alert-soft text-sm">
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
                <TextField
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    value={values.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    error={fieldErrors.name}
                />

                <TextField
                    label="Correo"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={values.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    error={fieldErrors.email}
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••"
                    value={values.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    error={fieldErrors.password}
                />

                <TextField
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repite la contraseña"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    error={fieldErrors.confirmPassword}
                />

                <button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-2">
                    {isLoading ? <span className="loading loading-spinner loading-sm"></span> : null}
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
            </form>
        </AuthCard>
    );
}