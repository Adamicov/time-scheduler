import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import * as fromAuth from '../core-state/auth.actions';
import { AngularFireAuth } from 'angularfire2/auth';
import { catchError, exhaustMap, map, pluck } from 'rxjs/operators';
import { UserRegisterCredentials } from '@models/auth/user-register-credentials';
import { User } from '@models/auth/user';
import { fromPromise } from 'rxjs/internal-compatibility';
import { of } from 'rxjs';
import { UserLoginCredentials } from '@models/auth/user-login-credentials';

@Injectable()
export class AuthEffects {
  @Effect()
  getUser = this.actions$.pipe(
    ofType(fromAuth.getUser),
    exhaustMap((_) => this.afAuth.authState),
    map((authData) => {
      if (authData) {
        const user: User = { uid: authData.uid, email: authData.email };
        return fromAuth.authenticated({ user });
      } else {
        return fromAuth.notAuthenticated;
      }
    })
  );

  @Effect()
  loginEmail = this.actions$.pipe(
    ofType(fromAuth.loginEmail),
    pluck('userCredentials'),
    exhaustMap((credentials: UserLoginCredentials) =>
      this.afAuth.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ),
    map((response) => fromAuth.getUser),
    catchError((error) => of(fromAuth.authError({ error })))
  );

  @Effect()
  register = this.actions$.pipe(
    ofType(fromAuth.registerEmail),
    pluck('registerCredentials'),
    exhaustMap((credentials: UserRegisterCredentials) =>
      fromPromise(
        this.afAuth.auth.createUserWithEmailAndPassword(
          credentials.email,
          credentials.password
        )
      )
    ),
    map(() => fromAuth.registerSuccess),
    catchError((error) => of(fromAuth.registerFail({ error })))
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth
  ) {}
}
