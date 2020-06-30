import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@models/auth/user';
import * as fromAuth from './auth.actions';

export const FEATURE_KEY = 'auth';

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  authenticated: false,
  user: null,
  loading: false,
  error: null,
};
const authReducer = createReducer(
  initialState,
  on(fromAuth.getUser, (state: AuthState) => ({
    ...state,
    loading: true,
  })),
  on(fromAuth.authenticated, (state: AuthState, {user}) => ({
    ...state,
    user,
    loading: false,
  })),
  on(fromAuth.notAuthenticated, (state: AuthState) => ({
    ...state,
    user: null,
    loading: false,
  })),
  on(fromAuth.authError, (state: AuthState, {error}) => ({
    ...state,
    error,
    loading: false,
  })),
);
