import * as fromAuth from './auth.reducers';
import { AuthState } from './auth.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectAuthState = createFeatureSelector<AuthState>(fromAuth.FEATURE_KEY);

export const selectUserAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.authenticated
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
