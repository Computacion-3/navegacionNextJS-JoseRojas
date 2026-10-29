/**
 * Errores por campo: { email: 'Ingresa tu correo.', password: '...' }
 */
export type FieldErrors = Record<string, string>;

/**
 * Error estándar de validación (core compartido entre features).
 * Lo lanzan los casos de uso cuando la entrada no cumple las reglas,
 * indicando qué campo falló para que la vista lo pinte con `input-error`.
 */
export class ValidationError extends Error {
    readonly fieldErrors: FieldErrors;

    constructor(fieldErrors: FieldErrors, message = 'Revisa los campos marcados.') {
        super(message);
        this.name = 'ValidationError';
        this.fieldErrors = fieldErrors;
    }
}