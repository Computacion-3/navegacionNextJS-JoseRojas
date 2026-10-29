import { ComponentProps } from 'react';

interface TextFieldProps extends ComponentProps<'input'> {
    label: string;
    error?: string;
}

/**
 * Input reutilizable (lo usan Login y Registro).
 * Si recibe `error`, marca el input con `input-error` y muestra el mensaje debajo.
 */
export function TextField({ label, error, id, className = '', ...props }: TextFieldProps) {
    const inputId = id ?? props.name;

    return (
        <fieldset className="fieldset">
            <label htmlFor={inputId} className="fieldset-legend">
                {label}
            </label>
            <input
                id={inputId}
                aria-invalid={Boolean(error)}
                className={`input w-full ${error ? 'input-error' : ''} ${className}`}
                {...props}
            />
            {error && <p className="label text-error">{error}</p>}
        </fieldset>
    );
}