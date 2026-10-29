import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FieldErrors, ValidationError } from '@/src/core/errors/validation.error';
import { authContainer } from '../../di/auth.container';
import { LoginParams } from '../../domain/repositories/auth.repository';
import { RegisterInput } from '../../domain/usecases/register.usecase';
import { SessionUserViewModel, UserViewModelMapper } from '../viewmodels/user.viewmodel';

interface AuthState {
    user: SessionUserViewModel | null;
    isLoading: boolean;
    errorMessage: string | null;
    fieldErrors: FieldErrors;
}

// Lo que viaja en rejectWithValue debe ser serializable (objeto plano, no una instancia de Error)
interface AuthRejectPayload {
    message: string | null;
    fieldErrors: FieldErrors;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    errorMessage: null,
    fieldErrors: {},
};

const toRejectPayload = (err: unknown, fallback: string): AuthRejectPayload => {
    if (err instanceof ValidationError) {
        return { message: null, fieldErrors: err.fieldErrors };
    }
    return { message: err instanceof Error ? err.message : fallback, fieldErrors: {} };
};

/**
 * 1. Thunk de Mutación: inicio de sesión
 * Invoca LoginUseCase y mapea la entidad User a un ViewModel serializable.
 */
export const loginMutation = createAsyncThunk<
    SessionUserViewModel,
    LoginParams,
    { rejectValue: AuthRejectPayload }
>(
    'auth/login',
    async (params, { rejectWithValue }) => {
        try {
            const user = await authContainer.login.execute(params);
            return UserViewModelMapper.toViewModel(user);
        } catch (err: unknown) {
            return rejectWithValue(toRejectPayload(err, 'No se pudo iniciar sesión'));
        }
    }
);

/**
 * 2. Thunk de Mutación: registro
 * Invoca RegisterUseCase. No inicia sesión: el usuario luego entra por /login.
 */
export const registerMutation = createAsyncThunk<
    SessionUserViewModel,
    RegisterInput,
    { rejectValue: AuthRejectPayload }
>(
    'auth/register',
    async (input, { rejectWithValue }) => {
        try {
            const user = await authContainer.register.execute(input);
            return UserViewModelMapper.toViewModel(user);
        } catch (err: unknown) {
            return rejectWithValue(toRejectPayload(err, 'No se pudo crear la cuenta'));
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthErrors: (state) => {
            state.errorMessage = null;
            state.fieldErrors = {};
        },
        // Quita el error de un solo campo (cuando el usuario lo corrige)
        clearFieldError: (state, action: PayloadAction<string>) => {
            delete state.fieldErrors[action.payload];
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        // --- Ciclo de vida del inicio de sesión (loginMutation) ---
        builder
            .addCase(loginMutation.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
                state.fieldErrors = {};
            })
            .addCase(loginMutation.fulfilled, (state, action: PayloadAction<SessionUserViewModel>) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginMutation.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message ?? null;
                state.fieldErrors = action.payload?.fieldErrors ?? {};
            });

        // --- Ciclo de vida del registro (registerMutation) ---
        builder
            .addCase(registerMutation.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
                state.fieldErrors = {};
            })
            .addCase(registerMutation.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerMutation.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message ?? null;
                state.fieldErrors = action.payload?.fieldErrors ?? {};
            });
    },
});

export const { clearAuthErrors, clearFieldError, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;