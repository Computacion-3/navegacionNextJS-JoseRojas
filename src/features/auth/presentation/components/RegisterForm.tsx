'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TextField } from '@/src/core/components/ui/TextField';
import { AuthCard } from './AuthCard';

interface RegisterValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const INITIAL_VALUES: RegisterValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

// Validación visual: campos obligatorios y contraseñas iguales
const validate = (values: RegisterValues): RegisterErrors => {
    const errors: RegisterErrors = {};
    if (!values.name.trim()) errors.name = 'Ingresa tu nombre.';
    if (!values.email.trim()) errors.email = 'Ingresa tu correo.';
    if (!values.password) errors.password = 'Ingresa una contraseña.';
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña.';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return errors;
};

export function RegisterForm() {
    // Estado local del formulario (no hay backend ni registro real)
    const [values, setValues] = useState<RegisterValues>(INITIAL_VALUES);
    const [errors, setErrors] = useState<RegisterErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);

    // Un solo handler para todos los inputs: usa el atributo `name` de cada uno
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextValues = { ...values, [e.target.name]: e.target.value };
        setValues(nextValues);
        setSuccess(false);
        // Después del primer intento, los errores se actualizan mientras escribe
        if (submitted) setErrors(validate(nextValues));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            setSuccess(true);
            setValues(INITIAL_VALUES);
            setSubmitted(false);
        }
    };

    // Aviso inmediato si la confirmación no coincide, aun antes de enviar
    const passwordsMismatch =
        values.confirmPassword !== '' && values.confirmPassword !== values.password;
    const confirmError =
        errors.confirmPassword ?? (passwordsMismatch ? 'Las contraseñas no coinciden.' : undefined);

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

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
                <TextField
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <TextField
                    label="Correo"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <TextField
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repite la contraseña"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={confirmError}
                />

                <button type="submit" className="btn btn-primary w-full mt-2">
                    Crear cuenta
                </button>
            </form>
        </AuthCard>
    );
}