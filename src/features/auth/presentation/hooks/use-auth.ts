'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
    clearAuthErrors,
    clearFieldError as clearFieldErrorAction,
    loginMutation,
    logout as logoutAction,
    registerMutation,
} from '../store/auth.slice';
import { LoginParams } from '../../domain/repositories/auth.repository';
import { RegisterInput } from '../../domain/usecases/register.usecase';

/**
 * Hook fachada (Presentation Layer).
 *
 * Adaptador entre los componentes de React y el Store de Redux:
 * las páginas y componentes nunca ven Redux ni el contenedor DI.
 */
export function useAuth() {
    const dispatch = useAppDispatch();

    // 1. Lectura del estado global de autenticación
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const errorMessage = useAppSelector((state) => state.auth.errorMessage);
    const fieldErrors = useAppSelector((state) => state.auth.fieldErrors);

    // 2. Inicio de sesión: delega al thunk y responde true/false a la vista
    const login = useCallback(async (params: LoginParams): Promise<boolean> => {
        const resultAction = await dispatch(loginMutation(params));
        return loginMutation.fulfilled.match(resultAction);
    }, [dispatch]);

    // 3. Registro: delega al thunk y responde true/false a la vista
    const register = useCallback(async (input: RegisterInput): Promise<boolean> => {
        const resultAction = await dispatch(registerMutation(input));
        return registerMutation.fulfilled.match(resultAction);
    }, [dispatch]);

    // 4. Cerrar sesión
    const logout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    // 5. Limpiar errores (al entrar a la pantalla)
    const clearErrors = useCallback(() => {
        dispatch(clearAuthErrors());
    }, [dispatch]);

    // 6. Limpiar el error de un campo (cuando el usuario lo corrige)
    const clearFieldError = useCallback((field: string) => {
        dispatch(clearFieldErrorAction(field));
    }, [dispatch]);

    return {
        user,
        isLoading,
        errorMessage,
        fieldErrors,
        login,
        register,
        logout,
        clearErrors,
        clearFieldError,
    };
}