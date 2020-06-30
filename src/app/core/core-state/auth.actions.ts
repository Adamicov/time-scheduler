import { createAction, props } from '@ngrx/store';
import { UserRegisterCredentials } from '@models/auth/user-register-credentials';
import { UserLoginCredentials } from '@models/auth/user-login-credentials';
import { User } from '@models/auth/user';

const GET_USER = '[Auth] Get User';

const REGISTER_EMAIL = '[Auth] Register Email';
const REGISTER_SUCCESS = '[Auth] Register Email Success';
const REGISTER_FAIL = '[Auth] Register Email Fail';

const LOGIN_EMAIL = '[Auth] Login Email';
const LOGIN_FACEBOOK = '[Auth] Login Facebook'; // TODO
const LOGIN_GOOGLE = '[Auth] Login Google'; // TODO

const AUTHENTICATED = '[Auth Status] Authenticated';
const NOT_AUTHENTICATED = '[Auth Status] Not Authenticated';
const AUTH_ERROR = '[Auth Status] Error';

export const getUser = createAction(GET_USER);

export const registerEmail = createAction(
  REGISTER_EMAIL,
  props<{ registerCredentials: UserRegisterCredentials }>()
);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFail = createAction(
  REGISTER_FAIL,
  props<{ error: string | null }>()
);

export const loginEmail = createAction(
  LOGIN_EMAIL,
  props<{ loginCredentials: UserLoginCredentials }>()
);

export const authenticated = createAction(
  AUTHENTICATED,
  props<{ user: User }>()
);
export const notAuthenticated = createAction(NOT_AUTHENTICATED);
export const authError = createAction(
  AUTH_ERROR,
  props<{ error: string | null }>()
);
